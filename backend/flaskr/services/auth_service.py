from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from flaskr.models import RolesEnum
from flaskr.utils.db import db
from flaskr.models.user import User


class AuthService:
    def __init__(self):
        pass

    def signup(self, email, nombre_completo, password, rol):
        if User.query.filter_by(email=email).first():
            return {"error": "Email already registered"}, 400

        hashed_password = generate_password_hash(password)
        if isinstance(rol, str):
            try:
                rol = RolesEnum[rol]  # Convierte el string a Enum
            except KeyError:
                return {"error": "Invalid role"}, 400
        new_user = User(
            email=email,
            nombre_completo=nombre_completo,
            password=hashed_password,
            rol=rol
        )

        try:
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity={"email": email, "rol": rol.value})

            return {"access_token": access_token}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

    def login(self, email, password):
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return {"error": "Invalid email or password"}, 401

        access_token = create_access_token(identity={"email": user.email, "rol": user.rol.value})

        return {"access_token": access_token, "rol":user.rol.value}, 200