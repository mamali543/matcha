from app import create_app



# @app.route('/signup', methods=['POST', 'OPTIONS'])
# @cross_origin(origins="http://localhost:4200")
# def test():
#      print(request.json)
#      return jsonify({"message": "User registered successfully"}), 201

app = create_app()

if __name__ == '__main__':
	app.run(debug=True)
