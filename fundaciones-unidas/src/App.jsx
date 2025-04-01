import "./App.css";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
                    <Route path="/login" element={<LogIn isAdmin={isAdmin} />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
                <button onClick={() => setIsAdmin(!isAdmin)} className="toggle-button">
                    Cambiar a {isAdmin ? "Vista Usuario" : "Vista Admin"}
                </button>
            </div>
        </Router>
    );
}

export default App;
