import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const registroUsuario = (data) => api.post("/auth/registro", data);
export const loginUsuario = (data) => api.post("/auth/login", data);

export default api;