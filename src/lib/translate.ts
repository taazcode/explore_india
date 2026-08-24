import type { Language } from "../data/translations";

// Google Translate's public web endpoint — no API key, CORS-enabled, and the
// highest quality free machine translation available for these languages.
const GOOGLE_LANG_CODE: Partial<Record<Language, string>> = {
  Hindi: "hi",
  Bengali: "bn",
  Assamese: "as",
  // Google Translate has no Rajasthani code; Hindi is the closest supported
  // language and a reasonable machine-translation stand-in.
  Rajasthani: "hi",
};

const CACHE_PREFIX = "bharat-translate-cache:v1:";
const MAX_CONCURRENT = 4;

let snapshot: Record<string, string> = loadPersistedCache();
let pending = 0;
const listeners = new Set<() => void>();
const inflight = new Set<string>();
const queue: Array<() => void> = [];
let activeRequests = 0;

function loadPersistedCache(): Record<string, string> {
  const result: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey?.startsWith(CACHE_PREFIX)) {
        const value = localStorage.getItem(storageKey);
        if (value !== null) result[storageKey.slice(CACHE_PREFIX.length)] = value;
      }
    }
  } catch {
    // localStorage unavailable (private browsing, etc.) — start with an empty cache
  }
  return result;
}

// requestTranslation() can run during a component's render (a cache-miss
// read from t() kicks off a fetch inline). Notifying subscribers must never
// happen synchronously in that case — React forbids updating one component
// while another is mid-render — so every notification is deferred to a
// microtask, safely after the current render has finished.
let notifyScheduled = false;
function notify() {
  if (notifyScheduled) return;
  notifyScheduled = true;
  queueMicrotask(() => {
    notifyScheduled = false;
    listeners.forEach((listener) => listener());
  });
}

export function subscribeTranslations(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTranslationsSnapshot() {
  return snapshot;
}

export function getPendingCount() {
  return pending;
}

function setTranslation(key: string, value: string) {
  snapshot = { ...snapshot, [key]: value };
  try {
    localStorage.setItem(CACHE_PREFIX + key, value);
  } catch {
    // storage full or unavailable — the in-memory snapshot still serves this session
  }
  notify();
}

function runQueue() {
  while (activeRequests < MAX_CONCURRENT && queue.length) {
    const job = queue.shift();
    job?.();
  }
}

async function fetchTranslation(text: string, googleCode: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleCode}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`translate request failed: ${res.status}`);
  const data = await res.json();
  const segments = (data?.[0] ?? []) as Array<[string]>;
  return segments.map((segment) => segment[0]).join("");
}


export function requestTranslation(text: string, language: Language) {
  const googleCode = GOOGLE_LANG_CODE[language];
  const key = `${language}::${text}`;
  if (!googleCode || !text.trim() || snapshot[key] !== undefined || inflight.has(key)) return;

  inflight.add(key);
  pending++;
  notify();
  queue.push(() => {
    activeRequests++;
    fetchTranslation(text, googleCode)
      .then((result) => setTranslation(key, result || text))
      .catch(() => {
        // leave untranslated — falls back to English and will retry on next request
      })
      .finally(() => {
        inflight.delete(key);
        activeRequests--;
        pending--;
        notify();
        runQueue();
      });
  });
  runQueue();
}
