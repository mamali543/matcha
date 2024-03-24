# app/auth/routes.py
import datetime
import re

import jwt
from . import auth
from flask import jsonify, request
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash
from ..database import get_db_connection
from mysql.connector import Error
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
from flask import current_app

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import resend
import os
from dotenv import load_dotenv
load_dotenv()



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
@jwt_required()
def protected():
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

################################################################ Reset PaSSword ##########################################################

def find_user_by_email(email, cursor):
    cursor.execute("SELECT * FROM user WHERE email = %s", (email,))

    user = cursor.fetchone()
    if user:
        print("ana hnaaa knafetchi user b email")
    if user is not None:
        print("ana hnaaa knafetchi user b email")
        return user
    return None



def send_reset_email(email, token):
    print(token)
    resend.api_key = os.getenv('RESEND_API_KEY')
    r = resend.Emails.send({
    "from": os.getenv('RESEND_EMAIL'),
    "to": email,
    "subject": "Reset Password",
    "html": f'<p>Click on the link to reset password <a href="http://loclahost:4200?token={token}">Reset</a> </p>'
    })
    print("r: ", r)

    
    # print(f'Password reset link sent to {email}: {reset_link}')

@auth.route('/reset', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def forgot_password():
    cursor = conn.cursor(dictionary=True)
    email = request.json.get('email')
    user = find_user_by_email(email, cursor)
    cursor.close()

    if not user:
        return jsonify({"error":"User not found!"}), 404
    
    payload = {
        'user_id': user['id'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')
    
    # Send the reset email
    send_reset_email(email, token)

    return jsonify({"success": "Password reset email has been sent."})

