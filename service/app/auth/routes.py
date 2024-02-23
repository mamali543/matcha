# app/auth/routes.py

from . import auth
from flask import jsonify, request
from .models import User
from .. import db

@auth.route('/signup', methods=['POST'])
def signup():
    # Implement signup logic
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing data"}), 400

    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Username already exists"}), 400

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"error": "Email already exists"}), 400

    #create new user
    new_user = User(username, email)
    new_user.set_password(password)

    #save new user
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "user registred succefully"})
