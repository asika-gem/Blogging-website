import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://blogging-backend-uy92.onrender.com/api",
  withCredentials: true,
});

apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
