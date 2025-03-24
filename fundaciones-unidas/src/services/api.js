import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Ajusta la URL si tu backend usa otro puerto

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Error al iniciar sesión" };
    }
};

export const signupUser = async (nombre_completo, email, password) => {
    try {
        const response = await api.post("/auth/signup", { nombre_completo, email, password });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Error al registrarse" };
    }
};
