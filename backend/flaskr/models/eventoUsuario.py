from flaskr.utils.db import db

class EventoUsuario(db.Model):
    __tablename__ = 'eventos_usuarios'
    id = db.Column(db.Integer, primary_key=True)
    id_evento = db.Column(db.Integer, db.ForeignKey('eventos.id'), nullable=False)
    email_usuario = db.Column(db.String(50), db.ForeignKey('user.email'), nullable=False)
    asistio = db.Column(db.Boolean, default=False)
    pin = db.Column(db.String(11), unique=True, nullable=False)

    evento = db.relationship("Eventos", backref="participaciones")
    usuario = db.relationship("User", backref="inscripciones")

    def __repr__(self):
        return f"<EventoUsuario evento={self.id_evento}, usuario={self.email_usuario}>"