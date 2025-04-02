import "./Login.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../services/api";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            Swal.fire({
                title: "La contraseña debe tener al menos 8 caracteres",
                icon: "warning",
                draggable: true
            });
            return;
        }

        const response = await resetPassword(token, password);

        if (response.error) {
            Swal.fire({
                title: "Error al restablecer la contraseña",
                text: response.message,
                icon: "error",
                draggable: true
            });
        } else {
            Swal.fire({
                title: "Contraseña restablecida con éxito",
                text: "Redirigiendo al inicio de sesión...",
                icon: "success",
                draggable: true
            });

            setTimeout(() => navigate("/login"), 2000);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleReset}>
                    <label>Nueva Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Restablecer</button>
                </form>
            </div>
            <div className="login-side">
                <h3>Protege tu cuenta con una nueva contraseña.</h3>
            </div>
        </div>
    );
};

export default ResetPassword;
