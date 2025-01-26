from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

wells = [
    {"name": "Well 1", "lat": -31.989433427894248, "lng": 29.140356990447, "availability": 1000, "quality": 100},
    {"name": "Well 2", "lat": -31.985902708484826, "lng": 29.144433947876596, "availability": 660, "quality": 50},
    {"name": "Well 3", "lat": -31.98091579081912, "lng": 29.147845717515047, "availability": 334, "quality": 20},
    {"name": "Well 4", "lat": -31.978713452581097, "lng": 29.144755812936832, "availability": 545, "quality": 60},
    {"name": "Well 5", "lat": -31.98581170876564, "lng": 29.141043635908826, "availability": 102, "quality": 90},
    {"name": "Well 6", "lat": -31.979168485474815, "lng": 29.14087197454337, "availability": 11, "quality": 10},
]

# wells = [
#     {"name": "Well 1", "lat": -31.989433427894248, "lng": 29.140356990447, "availability": 80, "quality": 80},
#     {"name": "Well 2", "lat": -31.985902708484826, "lng": 29.144433947876596, "availability": 26, "quality": 40},
#     {"name": "Well 3", "lat": -31.98091579081912, "lng": 29.147845717515047, "availability": 13, "quality": 15},
#     {"name": "Well 4", "lat": -31.978713452581097, "lng": 29.144755812936832, "availability": 34, "quality": 50},
#     {"name": "Well 5", "lat": -31.98581170876564, "lng": 29.141043635908826, "availability": 4, "quality": 70},
#     {"name": "Well 6", "lat": -31.979168485474815, "lng": 29.14087197454337, "availability": 0, "quality": 7},
# ]

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
