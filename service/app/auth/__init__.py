# app/auth/__init__.py

#define a Blueprint object named auth
#Blueprints in Flask are a way to organize your application into distinct components or modules, each potentially handling a different aspect of the application
#Each Blueprint can define its own routes, error handlers, and templates, which are then registered with the main Flask application instance.
from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import routes
