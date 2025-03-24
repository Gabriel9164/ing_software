import "./Login.css"
import { useState } from "react";
import { loginUser } from "../services/api";
import Swal from "sweetalert2";

const LogIn = ({ isAdmin = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Datos enviados:", { email, password });
        setError(null);

        const response = await loginUser(email, password);
        console.log("Respuesta del backend:", response);

        if (response.error) {
            //setError(response.error);
            Swal.fire({
                title: "Failed Login!",
                icon: "error",
                draggable: true
            });
        } else {
            localStorage.setItem("token", response.access_token); // Cambia "token" por "access_token"
            localStorage.setItem("rol", response.rol);
            //alert("Inicio de sesión exitoso");
            Swal.fire({
                title: `Inicio de sesión exitoso como ${response.rol}`,
                icon: "success",
                draggable: true
            });
            
        }
    };

    return (
        <div className={`login-container ${isAdmin ? "admin-view" : ""}`}>
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

            </div>
            <div className="login-side">
                <h3>
                    {isAdmin
                        ? "Coordina, actúa y transforma. ¡Juntos por un mundo más verde!"
                        : "Manos unidas, comunidades transformadas."}
                </h3>
            </div>
        </div>
    );
};

export default LogIn;
