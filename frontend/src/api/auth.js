import api from "./axios";

export const login = async (username, password) => {
  const response = await api.get("/login", {
    auth: {
      username,
      password,
    },
  });

  return {
    username,
    role: response.data.role,
    message: response.data.message,
    username,
    password,
  };
};

export const signupStudent = async (data) => {
  const response = await api.post("/signup/student", data);
  return response.data;
};

export const signupTeacher = async (data) => {
  const response = await api.post("/signup/teacher", data);
  return response.data;
};