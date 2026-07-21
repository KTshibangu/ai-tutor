import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("/login", {
      username,
      password,
  });

  return response.data
};

export const signupStudent = async (data) => {
  const response = await api.post("/signup/student", data);
  return response.data;
};

export const signupTeacher = async (data) => {
  const response = await api.post("/signup/teacher", data);
  return response.data;
};