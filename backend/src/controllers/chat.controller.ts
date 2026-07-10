import type { Request, Response } from "express";

import repositoryCacheService from "../services/repository-cache.service.js";
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
        message: "repoUrl and question are required.",
      });
      return;
    }

    const cached =
      repositoryCacheService.get(repoUrl);

    if (!cached) {
      res.status(400).json({
        success: false,
        message: "Analyze repository first.",
      });
      return;
    }

    const answer =
      await repositoryChatService.ask(
        question,
        cached.index
      );

    res.json({
      success: true,
      data: answer,
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