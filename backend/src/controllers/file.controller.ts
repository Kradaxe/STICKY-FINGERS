import type { Request, Response } from "express";
import fileService from "../services/file.service.js";

export const getFileContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const repositoryPath =
      req.query.repositoryPath as string;

    const filePath =
      req.query.filePath as string;

    if (!repositoryPath || !filePath) {
      res.status(400).json({
        success: false,
        message: "Missing parameters.",
      });

      return;
    }

    const file =
      await fileService.getFileContent(
        repositoryPath,
        filePath
      );

    res.json({
      success: true,
      data: file,
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