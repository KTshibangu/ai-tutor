import api from "./axios";

export const generateQuiz = async (topic, numQuestions = 3) => {
  const response = await api.post(
    "/quiz",
    {
      topic,
      num_questions: numQuestions,
    }
  );

  return response.data;
};

export const checkQuiz = async (quizId, answers) => {
  const response = await api.post(
    "/quiz/check",
    {
      quiz_id: quizId,
      answers,
    }
  );

  return response.data;
};

export const getQuizHistory = async (page = 1, limit = 10) => {
  const response = await api.get("/quiz/history", {
    params: {
      page,
      limit
    }
  });

  return response.data;
};

export const getTopics = async () => {
  const response = await api.get("/documents/topics");
  return response.data;
};