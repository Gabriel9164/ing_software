from flaskr.utils.db import db

class User(db.Model):
    __tablename__ = "user"
    email = db.Column(db.String(50), unique=True, nullable=False, primary_key=True)
    nombre_completo = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"