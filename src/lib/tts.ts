/**
 * Voice for the AI guides.
 *
 * Two engines, tried in order:
 *  1. Groq's hosted Orpheus TTS — a genuinely expressive neural voice. It
 *     needs the model's terms accepted once on the Groq console for the key
 *     in VITE_GROQ_API_KEY; until then the call 400s and we fall through.
 *  2. The browser's own speech synthesis, but with the voice *chosen* rather
 *     than left to the default. We rank Indian-English neural voices first,
 *     which is the difference between "warm guide" and "robot".
 *
 * Rendered clips are cached in-memory by (text, voice) so replaying a greeting
 * is instant and costs nothing.
 */

const GROQ_SPEECH_URL = "https://api.groq.com/openai/v1/audio/speech";
const GROQ_TTS_MODEL = "canopylabs/orpheus-v1-english";

/** Orpheus voice names, mapped to the guide each one plays. */
export const GUIDE_VOICES: Record<string, string> = {
  Rajasthan: "leo",
  Assam: "tara",
  Tripura: "jess",
  default: "leo",
};

export type Engine = "neural" | "browser" | "none";
export type SpeechStatus = "idle" | "loading" | "playing";

const clipCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;

/** True once we know the neural engine is unavailable, so we stop retrying. */
let neuralBlocked = false;
let neuralBlockedReason = "";

export function neuralUnavailableReason() {
  return neuralBlockedReason;
}

async function renderNeural(text: string, voice: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey || neuralBlocked) return null;

  const cacheKey = `${voice}::${text}`;
  const cached = clipCache.get(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(GROQ_SPEECH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_TTS_MODEL,
        voice,
        input: text,
        response_format: "wav",
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      neuralBlocked = true;
      neuralBlockedReason = detail.includes("terms")
        ? "Accept the Orpheus model terms on the Groq console to unlock the studio voice."
        : `Neural voice unavailable (${res.status}).`;
      return null;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    clipCache.set(cacheKey, url);
    return url;
  } catch {
    neuralBlocked = true;
    neuralBlockedReason = "Neural voice could not be reached; using the browser voice.";
    return null;
  }
}

/* --------------------------------------------------------- browser voices */

/**
 * Voice lists load asynchronously in Chrome — the first synchronous call
 * usually returns an empty array, so wait for `voiceschanged` once.
 */
function browserVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return resolve([]);
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) return resolve(existing);
    const timer = setTimeout(() => resolve(window.speechSynthesis.getVoices()), 900);
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        clearTimeout(timer);
        resolve(window.speechSynthesis.getVoices());
      },
      { once: true },
    );
  });
}

/**
 * Ranks the installed voices so we never fall back to the flat default.
 * Indian English neural voices sit at the top, then any "natural"/"online"
 * neural voice, then Google's web voices, then anything English.
 */
function rankVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;
  if (lang.startsWith("en-in")) score += 60;
  else if (lang.startsWith("hi")) score += 40;
  else if (lang.startsWith("en-gb")) score += 25;
  else if (lang.startsWith("en")) score += 15;
  // Microsoft's "(Natural)" and Google's cloud voices are the neural tiers.
  if (name.includes("natural")) score += 45;
  if (name.includes("online")) score += 20;
  if (name.startsWith("google")) score += 30;
  // Named Indian voices shipped by Windows / Chrome.
  if (/neerja|prabhat|kavya|arjun|aarav|ravi|heera|madhur|swara/.test(name)) score += 35;
  if (name.includes("microsoft")) score += 8;
  if (/compact|espeak|novelty|whisper/.test(name)) score -= 40;
  return score;
}

let chosenVoice: SpeechSynthesisVoice | null = null;

export async function preferredBrowserVoice(): Promise<SpeechSynthesisVoice | null> {
  if (chosenVoice) return chosenVoice;
  const voices = await browserVoices();
  if (!voices.length) return null;
  chosenVoice = [...voices].sort((a, b) => rankVoice(b) - rankVoice(a))[0] ?? null;
  return chosenVoice;
}

export async function describeVoice(): Promise<string> {
  if (!neuralBlocked && import.meta.env.VITE_GROQ_API_KEY) return "Studio AI voice";
  const voice = await preferredBrowserVoice();
  return voice ? voice.name.replace(/^Microsoft\s+/, "").replace(/\s*\(.*\)$/, "") : "Browser voice";
}

function speakWithBrowser(
  text: string,
  onEnd: () => void,
  voice: SpeechSynthesisVoice | null,
): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  // Slightly slower and a touch brighter reads as friendly rather than clipped.
  utterance.rate = 0.94;
  utterance.pitch = 1.05;
  utterance.volume = 1;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
  return true;
}

/* -------------------------------------------------------------- public API */

export type SpeakHandle = {
  engine: Engine;
  stop: () => void;
};

export function stopSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speaks `text`, resolving with the engine that actually produced sound.
 * `onEnd` fires when playback finishes (or immediately if nothing could play).
 */
export async function speak(
  text: string,
  options: { voice?: string; onEnd?: () => void } = {},
): Promise<Engine> {
  stopSpeech();
  const onEnd = options.onEnd ?? (() => {});
  const voice = options.voice ?? GUIDE_VOICES.default;

  const url = await renderNeural(text, voice);
  if (url) {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      onEnd();
    };
    audio.onerror = () => {
      currentAudio = null;
      onEnd();
    };
    try {
      await audio.play();
      return "neural";
    } catch {
      currentAudio = null;
      // Autoplay refused — fall through to the browser voice below.
    }
  }

  const browserVoice = await preferredBrowserVoice();
  if (speakWithBrowser(text, onEnd, browserVoice)) return "browser";

  onEnd();
  return "none";
}
