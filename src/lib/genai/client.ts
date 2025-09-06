import { GoogleGenAI } from "@google/genai";

let singleton: GoogleGenAI | null = null;

export function getGenAIClient() {
  if (singleton) return singleton;
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  singleton = new GoogleGenAI({ apiKey });
  return singleton;
}


