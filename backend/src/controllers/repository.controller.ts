import type { Request, Response } from "express";
import githubService from "../services/github.service.js";
import repositoryProcessor from "../services/repository.processor.js";
import technologyAnalyzer from "../services/technology-analyzer.service";

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

    const analysis =
      await technologyAnalyzer.analyze(
        snapshot.repositoryPath
      );

    res.status(200).json({
      success: true,
      data: {
        repository,
        structure: snapshot.structure,
        analysis,
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