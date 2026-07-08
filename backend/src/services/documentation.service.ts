import { GoogleGenAI } from "@google/genai";
import type{ RepositoryIndex } from "../types/repository-index.js";

class DocumentationService {
  public async generate(index: RepositoryIndex) {
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const repositoryContext = index.files
      .slice(0, 40) // Prevent massive prompts
      .map(
        (file) => `
FILE: ${file.path}

${file.content}
`
      )
      .join("\n\n");

    const prompt = `
You are a senior software architect.

Generate project documentation.

Repository:

${repositoryContext}

Return VALID JSON ONLY.

{
  "readme": "...markdown...",
  "setup": "...markdown...",
  "architecture": "...markdown...",
  "api": "...markdown..."
}

Do not wrap the JSON in markdown fences.
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  }
}

export default new DocumentationService();