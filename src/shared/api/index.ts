import axios from "axios";
import { TOKEN_KEY } from "../constants";

export const $api = axios.create({
  baseURL: __BASE_URL__,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
