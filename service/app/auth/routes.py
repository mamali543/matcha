# app/auth/routes.py

from . import auth
from flask import jsonify, request
from .models import User
from ..extensions import db
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash
from ..database import get_db_connection



@auth.route('/signup', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:4200")
def signup():
    # Implement signup logic
    # print('request: '+request)
    print('request:', request.json)

    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing data"}), 400
    
    # Establish a connection to the database
    conn = get_db_connection()

    # Use the connection to create a cursor
    cursor = conn.cursor()


    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Username already exists"}), 400

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    #create new user
    new_user = User(username=username, email=email, hash_password=hashed_password)
    # new_user.set_password(password)

    #save new user
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "user registred succefully"})
