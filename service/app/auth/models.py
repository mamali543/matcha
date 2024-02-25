# app/auth/models.py


from werkzeug.security import generate_password_hash
from app.extentions import db  # Updated import here

#Defines a new class User that inherits from db.Model, making it a model class for SQLAlchemy. This class represents a table in the database.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    hash_password = db.Column(db.String(80), nullable=False)

    def set_password(self, password):
        self.hash_password = generate_password_hash(password)
        
