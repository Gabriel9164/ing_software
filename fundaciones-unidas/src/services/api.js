import axios from "axios";

const API_URL = "http://127.0.0.1:5000"

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


export const recoverPassword = async (email) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/auth/recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to send recovery email');
        }

        return data;
    } catch (error) {
        return { error: error.message };
    }
};
