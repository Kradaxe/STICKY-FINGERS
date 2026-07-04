import { GoogleGenAI } from "@google/genai";

class AIService {
  public async explainFile(
    fileName: string,
    content: string
  ): Promise<string> {
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const prompt = `
You are a senior software engineer performing a code review.

Analyze the following source file.

File Name:
${fileName}

Source Code:
\`\`\`
${content}
\`\`\`

Return your answer in Markdown using exactly this structure:

# Overview

Briefly describe the purpose of the file.

# Responsibilities

What is this file responsible for?

# Important Functions / Classes

List the important functions or classes and explain each.

# Data Flow

Explain how data moves through this file.

# Potential Improvements

Suggest improvements following best software engineering practices.

# Interview Talking Points

If a candidate wrote this file, how should they explain it during an interview?
`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text ?? "No response generated.";
  }
}

export default new AIService();