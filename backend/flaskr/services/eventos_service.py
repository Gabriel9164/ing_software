from flaskr.models.eventos import Eventos
from flaskr.models.user import User
from flaskr.utils.db import db
import random
import string

# Función para generar el pin
def generar_pin():
    return ''.join(random.choices(string.ascii_lowercase, k=9))

# Función para crear un evento
def crear_evento(titulo, descripcion, fecha, hora, usuario_email):
    # Buscar al usuario por su email
    usuario = User.query.filter_by(email=usuario_email).first()

    if not usuario:
        return None, "Usuario no encontrado"

    # Crear el evento
    evento = Eventos(
        titulo=titulo,
        descripcion=descripcion,
        fecha=fecha,
        hora=hora,
        usuario_email=usuario_email,
        pin=generar_pin()
    )

    try:
        db.session.add(evento)
        db.session.commit()
        return evento, None  # Retorna el evento creado y sin errores
    except Exception as e:
        db.session.rollback()
        return None, f"Error al crear el evento: {str(e)}"
