from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

wells = [
    {"name": "Well 1", "lat": -31.9861, "lng": 29.1473, "availability": 100, "quality": 100},
    {"name": "Well 2", "lat": -31.987, "lng": 29.1474, "availability": 66, "quality": 50},
    {"name": "Well 3", "lat": -31.988, "lng": 29.1475, "availability": 33, "quality": 20},
]

# wells = [
#     {"name": "Well 1", "lat": -31.9861, "lng": 29.1473, "availability": 80, "quality": 10},
#     {"name": "Well 2", "lat": -31.987, "lng": 29.1474, "availability": 20, "quality": 90},
#     {"name": "Well 3", "lat": -31.988, "lng": 29.1475, "availability": 74, "quality": 70},
# ]

# wells = [
#     {"name": "Well 1", "lat": -31.987, "lng": 29.146, "availability": 100, "quality": 100},
#     {"name": "Well 2", "lat": -31.979, "lng": 29.15, "availability": 66, "quality": 50},
#     {"name": "Well 3", "lat": -31.988, "lng": 29.14, "availability": 33, "quality": 20},
# ]

@app.route('/get_water_data', methods=['GET'])
def get_water_data():
    return jsonify(wells)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
