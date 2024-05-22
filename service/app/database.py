#mysql.connector is a Python library that provides a connection interface to MySQL databases.
#It allows you to interact with MySQL databases from your Python code, executing queries, fetching results, and managing connections.
import mysql.connector
from mysql.connector import Error


# Define your database connection parameters without defining the database
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'roottoor1!'
}

# Database name to create and use
database_name = 'matcha'

def create_database(connection, database_name):
    cursor = connection.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database_name}")
    connection.database = database_name  # Specify the database to use
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(80) UNIQUE NOT NULL,
        email VARCHAR(80) UNIQUE NOT NULL,
        hash_password VARCHAR(255) NOT NULL,
        
        reset_token VARCHAR(255),  
        reset_token_expiry DATETIME   
        )
    """)
    cursor.close()

# Function to establish a database connection
# This function returns a connection object that you can use to interact with the database.
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected() and database_name:
            # Create database if it does not exist
            create_database(connection, database_name)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

