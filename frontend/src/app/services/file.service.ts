import api from "./api";

export const getFileContent = async (
  repositoryPath: string,
  filePath: string
) => {
  const { data } =
    await api.get("/repositories/file", {
      params: {
        repositoryPath,
        filePath,
      },
    });

  return data;
};