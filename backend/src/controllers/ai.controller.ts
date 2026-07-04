import type { Request, Response } from "express";
import aiService from "../services/ai.service.js";

export const explainFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
      res.status(400).json({
        success: false,
        message: "Missing fileName or content.",
      });
      return;
    }

    if (content.length > 30000) {
      res.status(400).json({
        success: false,
        message: "File is too large to explain.",
      });
      return;
    }

    const explanation =
      await aiService.explainFile(
        fileName,
        content
      );

    res.json({
      success: true,
      data: {
        explanation,
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