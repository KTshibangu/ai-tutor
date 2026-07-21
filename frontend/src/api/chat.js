import api from "./axios";

export const askQuestion = async (query) => {
    const response = await api.post("/chat", {
        query
    });

    return response.data;
};