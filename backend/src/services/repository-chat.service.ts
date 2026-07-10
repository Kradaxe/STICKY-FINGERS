import { GoogleGenAI } from "@google/genai";

import type {
  RepositoryIndex,
} from "../types/repository-index.js";

class RepositoryChatService {
  public async ask(
    question: string,
    index: RepositoryIndex
  ): Promise<string> {

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const context = index.files
      .slice(0, 25)
      .map(
        file => `
FILE: ${file.path}

${file.content}
`
      )
      .join("\n\n");

    const prompt = `
You are a senior staff engineer.

Answer questions about this repository.

Repository:

${context}

Question:

${question}

Rules:

- Answer using repository evidence.
- Mention file names.
- Be concise.
- Use markdown.
`;

    const response =
      await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text ??
      "No answer generated.";
  }
}

export default new RepositoryChatService();