from app import create_app
from app.auth.blueprint import auth


app = create_app()

app.register_blueprint(blueprint=auth)

if __name__ == '__main__':
	app.run(debug=True)

