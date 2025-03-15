import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_SERVER_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default api;