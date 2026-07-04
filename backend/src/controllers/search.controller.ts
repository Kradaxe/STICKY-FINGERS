import type{ Request, Response } from "express";
import repositoryProcessor from "../services/repository.processor.js";
import repositoryIndexService from "../services/repository-index.service.js";
import repositorySearchService from "../services/repository-search.service.js";

export const searchRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { repoUrl, query } = req.body;

    if (!repoUrl || !query) {
      res.status(400).json({
        success: false,
        message: "Repository URL and query are required.",
      });
      return;
    }

    const snapshot =
      await repositoryProcessor.processRepository(repoUrl);

    const index =
      await repositoryIndexService.build(
        snapshot.repositoryPath
      );

    const results =
      repositorySearchService.search(index, query);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
};