import type { Request, Response } from "express";
import githubService from "../services/github.service.js";
import repositoryProcessor from "../services/repository.processor.js";
import technologyAnalyzer from "../services/technology-analyzer.service.js";
import repositorySummaryService from "../services/repository-summary.service.js";
import repositoryAIService from "../services/repository-ai.service.js";
import repositoryIndexService from "../services/repository-index.service.js";
import repositoryCacheService from "../services/repository-cache.service.js";

export const analyzeRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      res.status(400).json({
        success: false,
        message: "Repository URL is required.",
      });
      return;
    }

    const repository = await githubService.getRepository(repoUrl);
    const snapshot =
      await repositoryProcessor.processRepository(repoUrl);

console.time("index");

const repositoryIndex =
  await repositoryIndexService.build(
    snapshot.repositoryPath
  );

console.timeEnd("index");

console.time("important-files");

const importantFiles =
  await repositorySummaryService.collect(
    snapshot.repositoryPath
  );

console.timeEnd("important-files");

console.time("summary");

const repositorySummary =
  await repositoryAIService.summarize(
    importantFiles
  );

console.timeEnd("summary");

    res.status(200).json({
      success: true,
      data: {
        repository: {
          ...repository,
          path: snapshot.repositoryPath,
        },
        structure: snapshot.structure,
        analysis,
        summary: repositorySummary,
        index: repositoryIndex,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    res.status(500).json({
      success: false,
      message,
    });
  }
};