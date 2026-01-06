from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)  


potholes_data = []   



dummies = [
    {'lat': 11.916064, 'lng': 79.812325, 'severity': 0.85, 'timestamp': '2026-01-04T10:00:00'},
    {'lat': 11.917000, 'lng': 79.813000, 'severity': 0.45, 'timestamp': '2026-01-04T10:05:00'},  # ~100m north
    {'lat': 11.915000, 'lng': 79.811000, 'severity': 0.92, 'timestamp': '2026-01-04T10:10:00'}   # ~100m south
]
potholes_data.extend(dummies)

@app.route('/detect', methods=['POST'])
def receive_detection():
    data = request.json   
    if not all(key in data for key in ['lat', 'lng', 'severity']):
        return jsonify({'error': 'Missing required fields'}), 400
    
     
    detection = {
        'lat': data['lat'],
        'lng': data['lng'],
        'severity': data['severity'],
        'timestamp': datetime.now().isoformat()
    }
    potholes_data.append(detection)
    
    
    if len(potholes_data) > 100:
        potholes_data[:] = potholes_data[-100:]
    
    return jsonify({'status': 'saved', 'detection': detection})

@app.route('/potholes', methods=['GET'])
def get_potholes():
     
    recent_data = potholes_data[-100:]
    return jsonify(recent_data)

if __name__ == '__main__':
    app.run(debug=True)