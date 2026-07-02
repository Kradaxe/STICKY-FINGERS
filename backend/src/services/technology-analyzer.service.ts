import fs from "fs/promises";
import path from "path";
import type { RepositoryAnalysis } from "../types/analysis.types.js";
interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

class TechnologyAnalyzer {
  public async analyze(
    repositoryPath: string
  ): Promise<RepositoryAnalysis> {
    const analysis: RepositoryAnalysis = {
      database: [],
      languages: [],
      styling: [],
      testing: [],
      deployment: [],
      authentication: [],
      tools: [],
    };

    const packageJson = await this.readPackageJson(repositoryPath);

    if (!packageJson) {
      return analysis;
    }

    this.analyzeDependencies(packageJson, analysis);

    return analysis;
  }

  private async readPackageJson(repositoryPath: string) {
    try {
      const packageJsonPath = path.join(repositoryPath, "package.json");

      const file = await fs.readFile(packageJsonPath, "utf-8");

      return JSON.parse(file);
    } catch {
      return null;
    }
  }

  private analyzeDependencies(
    packageJson: PackageJson,
    analysis: RepositoryAnalysis
  ) {
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const packages = Object.keys(dependencies);

    for (const pkg of packages) {
      switch (pkg) {
        case "next":
          analysis.frontend = "Next.js";
          break;

        case "react":
          if (!analysis.frontend)
            analysis.frontend = "React";
          break;

        case "express":
          analysis.backend = "Express";
          break;

        case "mongoose":
        case "mongodb":
          analysis.database.push("MongoDB");
          break;

        case "postgres":
        case "pg":
          analysis.database.push("PostgreSQL");
          break;

        case "prisma":
          analysis.tools.push("Prisma");
          break;

        case "tailwindcss":
          analysis.styling.push("Tailwind CSS");
          break;

        case "jest":
          analysis.testing.push("Jest");
          break;

        case "vitest":
          analysis.testing.push("Vitest");
          break;

        case "jsonwebtoken":
          analysis.authentication.push("JWT");
          break;

        case "passport":
          analysis.authentication.push("Passport");
          break;

        case "socket.io":
          analysis.tools.push("Socket.IO");
          break;

        case "docker":
          analysis.deployment.push("Docker");
          break;
      }
    }
  }
}

export default new TechnologyAnalyzer();