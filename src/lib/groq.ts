import type { StateInfo } from "../data/states";
import type { Language } from "../data/translations";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

export type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

function buildSystemPrompt(state: StateInfo, language: Language): string {
  return [
    `You are ${state.guide}, a warm and knowledgeable local cultural guide for ${state.name}, India. ${state.role}.`,
    `Your traditional greeting is "${state.greeting}".`,
    `Background you can draw on when answering:`,
    `- Culture: ${state.culture}`,
    `- Food: ${state.food}`,
    `- Traditions: ${state.traditions}`,
    `- Festivals: ${state.festivals}`,
    `- Folklore: ${state.folklore}`,
    `- Must-visit places: ${state.places.join(", ")}`,
    `- Best time to visit: ${state.bestTime} (recommended stay ${state.duration})`,
    `- Weather: ${state.weather}`,
    `- Getting around: ${state.transport}`,
    `- Local etiquette: ${state.etiquette}`,
    `- Languages spoken locally: ${state.languages}`,
    `Speak warmly and personally as ${state.guide}, in first person, like a proud local friend — never a generic assistant, and never mention that you are an AI or a language model. Keep replies conversational and concise (2-5 sentences) unless the traveller explicitly asks for a detailed plan or list. Stay grounded in the facts above; don't invent specific prices, hotel names or booking links beyond what's given.`,
    language === "English"
      ? "Reply in English."
      : `Always reply in the ${language} language, written in its natural script, regardless of what language the traveller writes in.`,
  ].join("\n");
}

export async function askGuide(
  state: StateInfo,
  language: Language,
  history: GroqMessage[],
  apiKey: string,
): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: buildSystemPrompt(state, language) }, ...history],
      temperature: 0.7,
      max_tokens: 400,
      reasoning_effort: "low",
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq request failed: ${res.status}`);
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Groq returned an empty reply");
  return reply;
}
