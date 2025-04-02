from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from flaskr.models import RolesEnum
from flaskr.services import AuthService

auth_bp = Blueprint('auth_bp', __name__)

auth_service = AuthService()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    required_fields = ['nombre_completo','email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    nombre_completo = data['nombre_completo']
    email = data['email']
    password = data['password']
    rol = "voluntario"

    if '@' not in email:
        return jsonify({"error": "Invalid email format"}), 400

    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400
    result, status = auth_service.signup(email, nombre_completo, password, rol)
    return jsonify(result), status


@auth_bp.route('/login', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def login():
    data = request.get_json()

    required_fields = ['email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    email = data['email']
    password = data['password']

    result, status = auth_service.login(email, password)
    return jsonify(result), status