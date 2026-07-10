import api from "./api";

export const askRepository = async (
  repoUrl: string,
  question: string
) => {
  const { data } = await api.post("/chat", {
    repoUrl,
    question,
  });

  return data;
};