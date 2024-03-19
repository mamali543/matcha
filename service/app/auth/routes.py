# app/auth/routes.py
import re
from . import auth
from flask import jsonify, request
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash
from ..database import get_db_connection
from mysql.connector import Error
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required




# Regular Expression for Validating an Email
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

 # Establish a connection to the database
conn = get_db_connection()

def is_email_valid(email):
    if re.match(email_regex, email):
        return True
    return False

def check_email_exists(email, cursor):
    try:
        cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
        if cursor.fetchone() is not None:
            return True
    except Error as e:
            print(f"Database error: {e}")
    return False

def check_user_exists(username, cursor):
    try:
        cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
        if cursor.fetchone() is not None:
            return True
    except Error as e:
        print(f"Database error: {e}")
    return False

@auth.route('/signup', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:4200")
def signup():
    data = request.json

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing data"}), 400
    

    # Use the connection to create a cursor
    cursor = conn.cursor()

    # Check if username exists
    if check_user_exists(username, cursor):
        return jsonify({"error": "Username already exists!"}), 400
    #check if email format valid
    if not is_email_valid(email):
        return ({"error": "invalid email format"}), 400
    #check if email exist
    if check_email_exists(email, cursor):
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)

    # Insert user into the database
    cursor.execute("INSERT INTO user (username, email, hash_password) VALUES (%s, %s, %s)", (username, email, hashed_password))
    
    # Commit changes and close cursor/connection
    conn.commit()
    cursor.close()

    return jsonify({"message": "User registered successfully"})


################################################################ Login endpoint ##########################################################

def check_user_credentials(username, password):
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        if user and check_password_hash(user['hash_password'], password):
            return True, user['id']
    except Error as e:
        print(f"Error Connecting to Mysql: {e}")
        return False, None


@auth.route('/login', methods=['POST', 'GET'])
@cross_origin(origins="http://localhost:4200")
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(data)
    valid_credentails, user_id = check_user_credentials(username, password)
    if valid_credentails:
        #procces in generating the JWT Token
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"status": "error", "message": "Invalid Cridentials"}), 401

@auth.route('/protected', methods=['GET'])
@cross_origin(origins="http://localhost:4200")
@jwt_required
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(data)
    valid_credentails, user_id = check_user_credentials(username, password)
    if valid_credentails:
        #procces in generating the JWT Token
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"status": "error", "message": "Invalid Cridentials"}), 401
