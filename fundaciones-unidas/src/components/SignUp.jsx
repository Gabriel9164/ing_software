import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { signupUser } from "../services/api";  // Import the signupUser function
import "./SignUp.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");  // Added state for nombre_completo
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const response = await signupUser(nombreCompleto, email, password);  // Use signupUser here

        if (response && !response.error) {
            Swal.fire({
                title: "Registro exitoso",
                text: "Ahora puedes iniciar sesión",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => navigate("/login"));
        } else {
            Swal.fire({
                title: "Error al registrarse",
                text: response.error || "Inténtalo de nuevo",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-content">
                <div className="logo-container">
                    <img src="/vite.svg" alt="Logo" className="logo" />
                </div>
                <h2>Crea una nueva cuenta</h2>
                <form onSubmit={handleSignUp}>
                    <label>Nombre completo</label>  {/* Added input for nombre_completo */}
                    <input
                        type="text"
                        placeholder="Juan Pérez"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        required
                    />
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="mail@abc.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Crear cuenta</button>
                </form>
                <p>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
            <div className="signup-side">
                <h3>Manos unidas, comunidades transformadas.</h3>
            </div>
        </div>
    );
};

export default SignUp;
