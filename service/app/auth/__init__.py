# app/auth/__init__.py

#define a Blueprint object named auth
#Blueprints in Flask are a way to organize your application into distinct components or modules, each potentially handling a different aspect of the application
#Each Blueprint can define its own routes, error handlers, and templates, which are then registered with the main Flask application instance.
from flask import Blueprint
from flask_cors import CORS

auth = Blueprint('auth', __name__)
# CORS(auth)  # Apply CORS to the auth blueprint specifically
CORS(auth, resources={r"/*": {"origins": "*"}})

from . import routes
