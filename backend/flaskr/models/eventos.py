from flaskr.utils.db import db
from datetime import datetime

class Eventos(db.Model):
    __tablename__ = 'eventos'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    fecha_inicio = db.Column(db.DateTime, nullable=False)
    fecha_expiracion = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Evento {self.titulo}>"
