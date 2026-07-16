import api from "./axios";

export const askQuestion = async (query) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await api.post(
    "/chat",
    { query },
    {
      auth: {
        username: user.username,
        password: user.password,
      },
    }
  );

  return response.data;
};