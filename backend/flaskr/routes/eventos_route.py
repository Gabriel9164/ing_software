from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flaskr.services.eventos_service import crear_evento

eventos_bp = Blueprint('eventos', __name__)

# Ruta para crear un evento
@eventos_bp.route('/crear', methods=['POST'])
@jwt_required()  # Verifica que el usuario esté autenticado
def crear_evento_route():
    # Obtener los datos del evento desde la solicitud
    data = request.get_json()

    titulo = data.get('titulo')
    descripcion = data.get('descripcion')
    fecha = data.get('fecha')
    hora = data.get('hora')

    if not titulo or not descripcion or not fecha or not hora:
        return jsonify({'message': 'Faltan datos en la solicitud'}), 400

    # Obtener el usuario autenticado (email del usuario desde JWT)
    usuario_email = get_jwt_identity()

    # Llamar al servicio para crear el evento
    evento, error = crear_evento(titulo, descripcion, fecha, hora, usuario_email)

    if evento:
        return jsonify({
            'message': 'Evento creado exitosamente',
            'evento_id': evento.id,
            'pin': evento.pin
        }), 201
    else:
        return jsonify({'message': error}), 400
