import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
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