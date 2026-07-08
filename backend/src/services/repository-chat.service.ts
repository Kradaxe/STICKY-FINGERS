import { GoogleGenAI } from "@google/genai";
import type{ IndexedFile } from "../types/repository-index.js";

class RepositoryChatService {
  public async ask(
    question: string,
    files: IndexedFile[]
  ): Promise<string> {

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const context = files
      .map(
        (file) => `
FILE: ${file.path}

${file.content}
`
      )
      .join("\n\n");

    const prompt = `
You are an expert software engineer.

Answer ONLY using the repository context below.

Repository Context:

${context}

Question:
${question}

Respond in Markdown.

If the answer cannot be found, clearly state that.
`;

    const response =
      await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text ?? "No response generated.";
  }
}

export default new RepositoryChatService();