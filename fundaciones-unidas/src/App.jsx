import "./App.css";
import LogIn from "./components/LogIn.jsx";
import { useState } from "react";

function App() {
    const [isAdmin, setIsAdmin] = useState(false); // Estado para alternar vistas

    return (
        <div className="app-container">
            <LogIn isAdmin={isAdmin} />
            <button onClick={() => setIsAdmin(!isAdmin)} className="toggle-button">
                Cambiar a {isAdmin ? "Vista Usuario" : "Vista Admin"}
            </button>
        </div>
    );
}

export default App;
