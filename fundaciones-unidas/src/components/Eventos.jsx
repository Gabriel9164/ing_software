import { useState } from "react";
import EventCard from "../components/EventCard.jsx";
import "./Eventos.css";

const Eventos = () => {
    const [eventos, setEventos] = useState({
        disponibles: [
            {
                title: "Reforestación Urbana",
                description: "Plantación de árboles en zonas urbanas para mejorar la calidad del aire.",
                time: "Comienza en 7 días",
                code: "ACT1",
                people: ["/user1.png", "/user2.png"],
            },
            {
                title: "Limpieza de Playas",
                description: "Recolección de residuos en costas para proteger la vida marina.",
                time: "Comienza en 7 días",
                code: "ACT2",
                people: ["/user3.png", "/user4.png"],
            },
            {
                title: "Reciclaje Comunitario",
                description: "Promoción de separación y reutilización de residuos para reducir contaminación.",
                time: "Próximamente",
                code: "ACT3",
                people: ["/user1.png", "/user5.png"],
            },
        ],
        pendientes: [],
        hechos: [],
    });

    const [modal, setModal] = useState({ visible: false, tipo: null, index: null });
    const [codigo, setCodigo] = useState("");

    const handleConfirmarDisponible = (idx) => {
        const seleccionado = eventos.disponibles[idx];
        const nuevosDisponibles = [...eventos.disponibles];
        nuevosDisponibles.splice(idx, 1);
        const nuevosPendientes = [...eventos.pendientes, seleccionado];
        setEventos({
            ...eventos,
            disponibles: nuevosDisponibles,
            pendientes: nuevosPendientes,
        });
        setModal({ visible: false, tipo: null, index: null });
    };

    const handleConfirmarCodigo = () => {
        const evento = eventos.pendientes[modal.index];
        if (codigo.toUpperCase() === evento.code) {
            const nuevosPendientes = [...eventos.pendientes];
            const hecho = nuevosPendientes.splice(modal.index, 1)[0];
            const nuevosHechos = [...eventos.hechos, hecho];
            setEventos({
                ...eventos,
                pendientes: nuevosPendientes,
                hechos: nuevosHechos,
            });
        } else {
            alert("Código incorrecto");
        }
        setCodigo("");
        setModal({ visible: false, tipo: null, index: null });
    };

    const renderColumn = (title, items, status) => (
        <div className="eventos-column">
            <div className="eventos-column-header">
                <span className={`estado-indicador ${status}`} />
                <h2>{title}</h2>
                <span className="eventos-count">({items.length})</span>
            </div>
            {items.map((event, idx) => (
                <div
                    key={idx}
                    onClick={() =>
                        status === "disponibles"
                            ? setModal({ visible: true, tipo: "disponibles", index: idx })
                            : status === "pendientes"
                                ? setModal({ visible: true, tipo: "pendientes", index: idx })
                                : null
                    }
                >
                    <EventCard {...event} status={status} />
                </div>
            ))}
        </div>
    );

    return (
        <div className="eventos-container">
            <h1 className="eventos-title">Eventos</h1>
            <div className="eventos-columns">
                {renderColumn("Disponibles", eventos.disponibles, "disponibles")}
                {renderColumn("Pendientes", eventos.pendientes, "pendientes")}
                {renderColumn("Hechos", eventos.hechos, "hechos")}
            </div>

            {modal.visible && (
                <div className="modal-overlay">
                    <div className="modal">
                        {modal.tipo === "disponibles" && (
                            <>
                                <p>¿Deseas confirmar tu asistencia a este evento?</p>
                                <button onClick={() => handleConfirmarDisponible(modal.index)} className="btn-confirmar">
                                    Confirmar asistencia
                                </button>
                                <button onClick={() => setModal({ visible: false, tipo: null, index: null })} className="btn-cancelar">
                                    Cancelar
                                </button>
                            </>
                        )}
                        {modal.tipo === "pendientes" && (
                            <>
                                <p>Ingresa el código para confirmar que asististe al evento:</p>
                                <input
                                    type="text"
                                    placeholder="Código de confirmación"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    className="codigo-input"
                                />
                                <button onClick={handleConfirmarCodigo} className="btn-confirmar">
                                    Confirmar código
                                </button>
                                <button onClick={() => setModal({ visible: false, tipo: null, index: null })} className="btn-cancelar">
                                    Cancelar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Eventos;
