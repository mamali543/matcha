from flask import Flask
from .auth import auth as auth_blueprint
from .extentions import db  # Changed import here



def create_app():
    app = Flask(__name__)
    #configure the app
    app.config['SECRET_KEY'] = 'a1b2c3d4e5f6g7h8i9j0'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db' 
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://matcha_user:roottoor1!@localhost/matcha'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    #initialize db with the app configuration
    db.init_app(app)

    # Register blueprints
    #For the routes defined with @auth.route to be recognized by your Flask application, the auth Blueprint must be registered with the Flask app instance. 
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
