import api from "./axios";

export const uploadDocument = async (file, topic) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("topic", topic);

  const response = await api.post(
    "/upload_docs",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get("/documents");

  return response.data.documents;
};