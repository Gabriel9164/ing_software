import "./Login.css"; // You might want to rename this to ForgotPassword.css
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { recoverPassword } from "../services/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await recoverPassword(email);

            if (response.error) {
                Swal.fire({
                    title: "Error",
                    text: response.error || "Failed to send recovery email",
                    icon: "error",
                    draggable: true
                });
            } else {
                Swal.fire({
                    title: "Success",
                    text: "Recovery email sent successfully. Please check your inbox.",
                    icon: "success",
                    draggable: true
                }).then(() => {
                    navigate("/login"); // Redirect to login after success
                });
            }
        } catch (err) {
            console.log(err);
            setError("An unexpected error occurred");
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred",
                icon: "error",
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
                <h2>Recuperar Contraseña</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handlePasswordRecovery}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Enviar enlace de recuperación</button>
                </form>

                <p>
                    ¿Recordaste tu contraseña?{" "}
                    <button onClick={() => navigate("/login")}>
                        Inicia sesión aquí
                    </button>
                </p>
            </div>
            <div className="login-side">
                <h3>Manos unidas, comunidades transformadas.</h3>
            </div>
        </div>
    );
};

export default ForgotPassword;