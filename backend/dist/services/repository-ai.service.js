import { GoogleGenAI } from "@google/genai";
class RepositoryAIService {
    async summarize(files) {
        const client = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const prompt = `
You are an expert software architect.

Below are the important files from a GitHub repository.

${JSON.stringify(files)}

Generate markdown with exactly these sections.

# Project Overview

# Main Technologies

# Folder Responsibilities

# Application Flow

# Setup Instructions

# Interesting Engineering Decisions

# Potential Improvements
`;
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    }
}
export default new RepositoryAIService();
//# sourceMappingURL=repository-ai.service.js.map