from flask import Flask, jsonify
from flask_cors import cross_origin
app = Flask(__name__)

@app.route('/api/ader', methods=['GET'])
@cross_origin(origin='http:localhost:4200')
def get_ader():
	return jsonify({"ader": "mohammed reda amali!"})

if __name__ == '__main__':
	app.run(debug=True)

