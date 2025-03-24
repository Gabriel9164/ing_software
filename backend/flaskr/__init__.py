from flask import Flask
from flask_cors import CORS

from flaskr.routes.auth_route import auth_bp
from flaskr.utils.JWT import JWT
from flaskr.utils.db import Database


def create_app():

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    Database().init_app(app)

    jwt = JWT(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

