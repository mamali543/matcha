#In many database systems, including MySQL, the process of executing SQL queries involves using a cursor.
#A cursor is essentially a pointer to a specific row within a set of query results. When you execute a SQL query,
#the database system returns a result set, and you use a cursor to navigate through this result set row by row.

# In summary, while you can establish a connection to the database without explicitly creating a cursor, 
#you'll need to use a cursor to execute SQL queries and interact with the database effectively, especially when dealing with SELECT queries that return result sets.

from flask import Flask
from .auth import auth as auth_blueprint
from flask_cors import CORS
from .database import get_db_connection
from flask_jwt_extended import  JWTManager

def create_app():
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = 'jwt_secret_key'
    JWTManager(app)
    get_db_connection()

    #Cors stands for Cross origin resources sharing, it's a mechanisme used by web servers to specify the domains that can access their resources
    CORS(app)

    # Create a connection to the database

    #configure the app
    # app.config['SECRET_KEY'] = 'a1b2c3d4e5f6g7h8i9j0'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db' 
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://matcha_user:roottoor1!@localhost/matcha'
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # migrate = Migrate(app, db)
    #initialize db with the app configuration
    # db.init_app(app)

    # Register blueprints
    #For the routes defined with @auth.route to be recognized by your Flask application, the auth Blueprint must be registered with the Flask app instance. 
    # app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    return app

