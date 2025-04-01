import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-container">
            <h2>Registro</h2>
            <p>Formulario de registro aquí...</p>

            {/* Button to navigate back to login */}
            <button onClick={() => navigate("/login")}>Volver al inicio de sesión</button>
        </div>
    );
};

export default SignUp;
