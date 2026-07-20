import api from "./axios";

const getAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    auth: {
      username: user.username,
      password: user.password,
    },
  };
};

export const uploadDocument = async (file, topic) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("topic", topic);

  const response = await api.post(
    "/upload_docs",
    formData,
    {
      ...getAuth(),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get(
    "/documents",
    getAuth()
  );

  return response.data.documents;
};

