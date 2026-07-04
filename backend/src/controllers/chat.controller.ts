import type{ Request, Response } from "express";

import repositoryProcessor from "../services/repository.processor.js";
import repositoryIndexService from "../services/repository-index.service.js";
import repositorySearchService from "../services/repository-search.service.js";
import repositoryChatService from "../services/repository-chat.service.js";

export const askRepository = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { repoUrl, question } = req.body;

    if (!repoUrl || !question) {
      res.status(400).json({
        success: false,
        message: "Repository URL and question are required.",
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
      repositorySearchService.search(
        index,
        question
      );

    const answer =
      await repositoryChatService.ask(
        question,
        results.slice(0, 10)
      );

    res.json({
      success: true,
      data: {
        answer,
      },
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