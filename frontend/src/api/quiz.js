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

export const generateQuiz = async (topic, numQuestions = 3) => {
  const response = await api.post(
    "/quiz",
    {
      topic,
      num_questions: numQuestions,
    },
    getAuth()
  );

  return response.data;
};

export const checkQuiz = async (quizId, answers) => {
  const response = await api.post(
    "/quiz/check",
    {
      quiz_id: quizId,
      answers,
    },
    getAuth()
  );

  return response.data;
};

export const getQuizHistory = async () => {
  const response = await api.get("/quiz/history", getAuth());

  return response.data.history;
};