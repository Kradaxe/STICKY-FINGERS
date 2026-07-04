import fs from "fs/promises";
import path from "path";

class RepositorySummaryService {
  private importantFiles = [
    "README.md",
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "next.config.ts",
    "next.config.js",
    "docker-compose.yml",
    "Dockerfile",
    ".env.example",
  ];

  public async collect(repositoryPath: string) {
    const collected: Record<string, string> = {};

    for (const file of this.importantFiles) {
      try {
        const filePath = path.join(repositoryPath, file);

        const content = await fs.readFile(filePath, "utf8");

        collected[file] = content.slice(0, 5000);
      } catch {
        continue;
      }
    }

    return collected;
  }
}

export default new RepositorySummaryService();