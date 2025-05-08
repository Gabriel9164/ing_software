from flask import Flask
from flask_cors import CORS
from flaskr.routes.auth_route import auth_bp
from flaskr.routes.eventos_route import eventos_bp
from flaskr.utils.config import Config
from flaskr.utils.JWT import JWT
from flaskr.utils.db import Database
from flaskr.utils.mail import mail
from flaskr.utils.config import Config
from flask_migrate import Migrate
from flaskr.utils.db import db

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": Config.ROUTE}}, supports_credentials=True)
    app.config['MAIL_SERVER'] = Config.MAIL_SERVER
    app.config['MAIL_PORT'] = Config.MAIL_PORT
    app.config['MAIL_USE_TLS'] = Config.MAIL_USE_TLS
    app.config['MAIL_USERNAME'] = Config.MAIL_USERNAME
    app.config['MAIL_PASSWORD'] = Config.MAIL_PASSWORD
    app.config['MAIL_DEFAULT_SENDER'] = Config.MAIL_DEFAULT_SENDER
    app.config['SECRET_KEY'] = Config.SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{Config.USER_DB}:{Config.PASSWORD_DB}@{Config.HOST_DB}:{Config.PORT_DB}/{Config.BD_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    mail.init_app(app)
    Database().init_app(app)
    migrate.init_app(app, db)
    jwt = JWT(app)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(eventos_bp, url_prefix='/eventos')  # Registramos el blueprint de eventos

    return app