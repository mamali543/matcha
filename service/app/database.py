import mysql.connector

# Define your database connection parameters
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'roottoor1!',
    'database': 'matcha'
}

# Function to establish a database connection
def get_db_connection():
    return mysql.connector.connect(**db_config)
