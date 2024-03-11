#source myvenv/bin/activate this means that any python commands u'll run will use the packages installed in the virtual envirenement

#the init.py file in each folder serves as an indicator to python that the directory should be treated as a python package
#it can also contain initialization code that will be executed when the package is imported

#mysql server is the core component that manages the database, processes sql queries and handles client connections, it's responsible for data persistence
#nysql client is a tool or software that's used to interact and connect to the mysql server


from app import create_app

app = create_app()

if __name__ == '__main__':
	app.run(debug=True)
