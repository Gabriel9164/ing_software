import "../components/EventCard.css";

const EventCard = ({ title, description, time, people, status }) => {
    return (
        <div className="eventos-card">
            <h3 className="eventos-card-title">{title}</h3>
            <p className="eventos-card-description">{description}</p>
            <p className="eventos-card-time">{time}</p>
            <div className="avatar-group">
                {people.map((src, idx) => (
                    <img key={idx} src={src} alt={`avatar-${idx}`} className="avatar" />
                ))}
            </div>
        </div>
    );
};

export default EventCard;