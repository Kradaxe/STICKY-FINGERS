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

    const packageJsons = await this.readPackageJsons(repositoryPath);

    if (packageJsons.length === 0) {
      return analysis;
    }

    for (const packageJson of packageJsons) {
      this.analyzeDependencies(packageJson, analysis);
    }

    return analysis;
  }

private async readPackageJsons(repositoryPath: string) {
  const packageFiles =
    await this.findPackageJsonFiles(repositoryPath);

  const packages = [];

  for (const file of packageFiles) {
    try {
      const content = await fs.readFile(file, "utf-8");

      packages.push(JSON.parse(content));
    } catch {
      continue;
    }
  }

  return packages;
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

  private async findPackageJsonFiles(
  directory: string
): Promise<string[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const packageFiles: string[] = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      packageFiles.push(
        ...(await this.findPackageJsonFiles(fullPath))
      );
    } else if (entry.name === "package.json") {
      packageFiles.push(fullPath);
    }
  }

  return packageFiles;
}
}

export default new TechnologyAnalyzer();