import api from "./api";

export const explainFile = async (
  fileName: string,
  content: string
) => {
  const { data } = await api.post(
    "/ai/explain-file",
    {
      fileName,
      content,
    }
  );

  return data;
};