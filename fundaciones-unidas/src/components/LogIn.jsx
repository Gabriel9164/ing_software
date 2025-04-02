import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../services/api";
import Swal from "sweetalert2";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // React Router navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await loginUser(email, password);

        if (response.error) {
            Swal.fire({
                title: "Failed Login!",
                icon: "error",
                draggable: true
            });
        } else {
            localStorage.setItem("token", response.access_token);
            localStorage.setItem("rol", response.rol);
            Swal.fire({
                title: `Inicio de sesión exitoso como ${response.rol}`,
                icon: "success",
                draggable: true
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="logo-container">
                    <img src="/vite.svg" alt="Logo" />
                </div>
                <h2>Inicia sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Iniciar sesión</button>
                </form>

                {/* Navigate to signup page */}
                <p>¿No tienes una cuenta? <button onClick={() => navigate("/signup")}>Regístrate aquí</button></p>
                <p>¿Olvidaste tu contraseña? <button onClick={() => navigate("/forgot-password")}>Clic aqui</button></p>

            </div>
            <div className="login-side">
                <h3>Manos unidas, comunidades transformadas.</h3>
            </div>
        </div>
    );
};

export default LogIn;
