import type{ Request, Response } from "express";

import repositoryCacheService from "../services/repository-cache.service.js";
import documentationService from "../services/documentation.service.js";

export const generateDocumentation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { repoUrl } = req.body;

    const cached = repositoryCacheService.get(repoUrl);

    if (!cached) {
      res.status(400).json({
        success: false,
        message: "Analyze repository first.",
      });
      return;
    }

    const docs = await documentationService.generate(
      cached.index
    );

    res.json({
      success: true,
      data: docs,
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