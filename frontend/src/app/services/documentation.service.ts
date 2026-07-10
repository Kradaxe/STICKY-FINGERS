import api from "./api";

export const generateDocumentation = async (
  repoUrl: string
) => {
  const { data } = await api.post("/documentation", {
    repoUrl,
  });

  return data;
};