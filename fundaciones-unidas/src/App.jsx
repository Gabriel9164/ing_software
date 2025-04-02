import "./App.css";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/forgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} /> {}
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/reset-password/:token" element={<ResetPassword />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
