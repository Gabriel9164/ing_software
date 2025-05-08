import EventCard from "../components/EventCard.jsx";
import "./Eventos.css";

const Eventos = () => {
    const eventos = {
        disponibles: [
            {
                title: "Reforestación Urbana",
                description: "Plantación de árboles en zonas urbanas para mejorar la calidad del aire.",
                time: "Comienza en 7 días",
                people: ["/user1.png", "/user2.png"],
            },
            {
                title: "Limpieza de Playas",
                description: "Recolección de residuos en costas para proteger la vida marina.",
                time: "Comienza en 7 días",
                people: ["/user3.png", "/user4.png"],
            },
            {
                title: "Reciclaje Comunitario",
                description: "Promoción de separación y reutilización de residuos para reducir contaminación.",
                time: "Próximamente",
                people: ["/user1.png", "/user5.png"],
            },
        ],
        pendientes: [
            {
                title: "Huertos Ecológicos",
                description: "Implementación de huertos comunitarios para autosuficiencia.",
                time: "En curso",
                people: ["/user1.png"],
            },
            {
                title: "Protección de Especies",
                description: "Actividades de conservación para proteger animales en peligro.",
                time: "Comienza en 7 días",
                people: ["/user2.png", "/user3.png"],
            },
            {
                title: "Movilidad Sostenible",
                description: "Fomento del uso de transporte público para reducir la huella de carbono.",
                time: "Próximamente",
                people: ["/user4.png"],
            },
        ],
        hechos: [
            {
                title: "Ahorro de Agua",
                description: "Campañas para fomentar el uso responsable del agua.",
                time: "Completado",
                people: ["/user1.png", "/user2.png"],
            },
            {
                title: "Energía Renovable en Casa",
                description: "Promoción de tecnologías limpias como paneles solares.",
                time: "Completado",
                people: ["/user3.png"],
            },
        ],
    };

    const renderColumn = (title, items, status) => (
        <div className="eventos-column">
            <div className="eventos-column-header">
                <span className={`estado-indicador ${status}`} />
                <h2>{title}</h2>
                <span className="eventos-count">({items.length})</span>
            </div>
            {items.map((event, idx) => (
                <EventCard key={idx} {...event} status={status} />
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
        </div>
    );
};

export default Eventos;
