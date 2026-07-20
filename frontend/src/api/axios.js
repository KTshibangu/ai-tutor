import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.auth) {
        return config;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.username && user?.password) {
        config.auth = {
            username: user.username,
            password: user.password,
        };
    }

    return config;
});

export default api;