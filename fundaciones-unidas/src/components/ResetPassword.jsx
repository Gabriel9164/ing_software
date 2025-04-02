import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {  // <-- Corrected URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error("Failed to reset password");
            }

            const result = await response.json();
            //setMessage(result.message);

            if (result.success) {
                Swal.fire({
                    title: "Password reset successfully!",
                    icon: "success",
                    draggable: true
                });
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Reset Password
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default ResetPassword;
