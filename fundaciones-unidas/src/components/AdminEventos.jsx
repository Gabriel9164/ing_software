import { useState, useEffect } from "react";
import "./Eventos.css";

const AdminEventos = () => {
    const [eventos, setEventos] = useState(() => {
        const guardados = localStorage.getItem("eventos_admin");
        return guardados ? JSON.parse(guardados) : [];
    });

    const [nuevoEvento, setNuevoEvento] = useState({ title: "", description: "", time: "" });

    const handleAgregar = () => {
        if (!nuevoEvento.title || !nuevoEvento.description || !nuevoEvento.time) return;
        const actualizados = [...eventos, nuevoEvento];
        setEventos(actualizados);
        setNuevoEvento({ title: "", description: "", time: "" });
    };

    const handleEliminar = (idx) => {
        const filtrados = eventos.filter((_, i) => i !== idx);
        setEventos(filtrados);
    };

    useEffect(() => {
        localStorage.setItem("eventos_admin", JSON.stringify(eventos));
    }, [eventos]);

    return (
        <div className="eventos-container">
            <h1 className="eventos-title">Administrador de Eventos</h1>

            <div className="eventos-column">
                <h2>Crear nuevo evento</h2>
                <input
                    type="text"
                    placeholder="Título"
                    value={nuevoEvento.title}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={nuevoEvento.description}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tiempo"
                    value={nuevoEvento.time}
                    onChange={(e) => setNuevoEvento({ ...nuevoEvento, time: e.target.value })}
                />
                <button className="btn-confirmar" onClick={handleAgregar}>Agregar</button>
            </div>

            <div className="eventos-columns">
                {eventos.map((e, idx) => (
                    <div key={idx} className="eventos-card">
                        <h3 className="eventos-card-title">{e.title}</h3>
                        <p className="eventos-card-description">{e.description}</p>
                        <p className="eventos-card-time">{e.time}</p>
                        <button className="btn-cancelar" onClick={() => handleEliminar(idx)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEventos;
