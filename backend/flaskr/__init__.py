from flask import Flask
from flask_cors import CORS
from flaskr.routes.auth_route import auth_bp
from flaskr.utils.JWT import JWT
from flaskr.utils.db import Database
from flaskr.utils.mail import mail
from flaskr.utils.config import Config


def create_app():
    app = Flask(__name__)

    # Load configuration from the Config class
    app.config.from_object(Config)

    # Configure CORS
    CORS(app,
         origins=[
             "http://localhost:5173",
             "http://127.0.0.1:5173",
             "http://192.168.1.64:5176",
             "http://10.177.73.2:5173"

         ],
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    # Initialize extensions
    mail.init_app(app)
    Database().init_app(app)
    jwt = JWT(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app