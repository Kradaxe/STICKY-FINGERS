import { GoogleGenAI } from "@google/genai";
import type{ IndexedFile } from "../types/repository-index.js";

class RepositoryChatService {
  private client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  public async ask(
    question: string,
    files: IndexedFile[]
  ): Promise<string> {
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

Answer the user's question using ONLY the repository context below.

Repository Context:

${context}

Question:

${question}

Return Markdown.

If the answer is not present, say that you couldn't find enough evidence.
`;

    const response =
      await this.client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text ?? "No response generated.";
  }
}

export default new RepositoryChatService();