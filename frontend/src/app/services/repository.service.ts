import api from "./api";
import { RepositoryResponse } from "../types/repository.js";

export const analyzeRepository = async (
  repoUrl: string
): Promise<RepositoryResponse> => {
  const { data } = await api.post<RepositoryResponse>(
    "/repositories/analyze",
    {
      repoUrl,
    }
  );

  return data;
};