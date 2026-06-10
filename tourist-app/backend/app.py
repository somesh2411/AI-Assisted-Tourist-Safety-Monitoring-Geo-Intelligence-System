from flask import Flask, request, jsonify
from flask_cors import CORS
from haversine import haversine
import sqlite3
import os
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_FILE = "tourist_alerts.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tourist_id TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL,
            alert_type TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

registered_users = []

# ------------------ Location Helper Functions ------------------
def get_location_address(lat, lng):
    """Convert coordinates to readable address using OpenStreetMap Nominatim API"""
    
    print(f"📍 Starting geocoding for: {lat}, {lng}")
    
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lng}&zoom=14&addressdetails=1"
        headers = {'User-Agent': 'TouristSafetyApp/1.0'}
        
        print(f"🌐 Making request to: {url}")
        response = requests.get(url, headers=headers, timeout=10)
        
        print(f"📞 Response status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"📎 Raw geocoding response: {data}")
            
            if 'display_name' in data:
                # Extract meaningful parts of the address
                address = data['display_name']
                print(f"✅ Full address: {address}")
                
                # Shorten address for display
                parts = address.split(',')
                if len(parts) >= 4:
                    # Take first few meaningful parts
                    short_address = f"{parts[0].strip()}, {parts[1].strip()}, {parts[-2].strip()}"
                    print(f"✅ Shortened address: {short_address}")
                    return short_address
                elif len(parts) >= 3:
                    short_address = f"{parts[0].strip()}, {parts[1].strip()}, {parts[2].strip()}"
                    print(f"✅ Short address: {short_address}")
                    return short_address
                else:
                    # Return full address if short, but limit length
                    limited_address = address[:100] + "..." if len(address) > 100 else address
                    print(f"✅ Limited address: {limited_address}")
                    return limited_address
            else:
                print("⚠️  No display_name in geocoding response")
        else:
            print(f"❌ Geocoding API returned status {response.status_code}: {response.text}")
            
    except requests.exceptions.Timeout:
        print("❌ Geocoding request timed out")
    except requests.exceptions.RequestException as e:
        print(f"❌ Geocoding network error: {e}")
    except Exception as e:
        print(f"❌ Geocoding error: {e}")
    
    # Fallback to coordinates
    fallback = f"Lat: {lat:.6f}, Lng: {lng:.6f}"
    print(f"ℹ️ Falling back to coordinates: {fallback}")
    return fallback

@app.route('/')
def home():
    return "✅ Tourist Safety API is running!"

# ------------------ Registration ------------------
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data.get("name")
        id_number = data.get("idNumber")
        emergency_contact = data.get("emergencyContact")

        if not all([name, id_number, emergency_contact]):
            return jsonify({"error": "Missing fields"}), 400

        digital_id = f"T-{len(registered_users) + 1:04d}"

        user = {
            "digitalId": digital_id,
            "name": name,
            "idNumber": id_number,
            "emergencyContact": emergency_contact
        }
        registered_users.append(user)

        return jsonify({
            "message": "Registration successful!",
            "digitalId": digital_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ Panic Alert ------------------
@app.route("/panic", methods=["POST"])
def panic():
    try:
        data = request.get_json()
        digital_id = data.get("digitalId")
        user_id = data.get("userId")
        user_name = data.get("userName")
        user_email = data.get("userEmail")
        emergency_contact = data.get("emergencyContact")
        lat = data.get("lat")
        lng = data.get("lng")
        note = data.get("note", "")
        
        # Enhanced logging for debugging
        print(f"\n🚨 EMERGENCY ALERT RECEIVED:")
        print(f"   Digital ID: {digital_id}")
        print(f"   User ID: {user_id}")
        print(f"   User Name: {user_name}")
        print(f"   Email: {user_email}")
        print(f"   Emergency Contact: {emergency_contact}")
        print(f"   Latitude: {lat} (type: {type(lat)})")
        print(f"   Longitude: {lng} (type: {type(lng)})")
        print(f"   Note: {note}")
        print(f"   Timestamp: {datetime.now().isoformat()}")

        if not digital_id:
            print(f"❌ Missing digital ID: {digital_id}")
            return jsonify({"error": "Missing digital ID"}), 400
        
        # Handle coordinates (can be null for location-unavailable alerts)
        if lat is not None and lng is not None:
            try:
                lat = float(lat)
                lng = float(lng)
                print(f"✅ Coordinates validated: {lat}, {lng}")
                
                # Check if coordinates are reasonable
                if abs(lat - 13.0827) < 0.01 and abs(lng - 80.2707) < 0.01:
                    print(f"⚠️  WARNING: Received Chennai coordinates - might be fallback location")
                elif abs(lat - 12.9716) < 0.01 and abs(lng - 77.5946) < 0.01:
                    print(f"⚠️  WARNING: Received Bangalore coordinates - might be fallback location")
                else:
                    print(f"✅ Received real user coordinates")
            except (ValueError, TypeError) as e:
                print(f"❌ Invalid coordinates, setting to null: {e}")
                lat, lng = None, None
        else:
            print(f"⚠️  Alert without location coordinates")

        # Update database schema to include user data
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        
        # Create enhanced alerts table if needed
        c.execute('''
            CREATE TABLE IF NOT EXISTS enhanced_alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tourist_id TEXT NOT NULL,
                user_id TEXT,
                user_name TEXT,
                user_email TEXT,
                emergency_contact TEXT,
                lat REAL,
                lng REAL,
                alert_type TEXT NOT NULL,
                note TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Insert enhanced alert data
        c.execute("""INSERT INTO enhanced_alerts 
                     (tourist_id, user_id, user_name, user_email, emergency_contact, lat, lng, alert_type, note) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                  (digital_id, user_id, user_name, user_email, emergency_contact, lat, lng, "PANIC", note))
        
        # Also insert into old table for compatibility
        if lat is not None and lng is not None:
            c.execute("INSERT INTO alerts (tourist_id, lat, lng, alert_type) VALUES (?, ?, ?, ?)",
                      (digital_id, lat, lng, "PANIC"))
        
        alert_id = c.lastrowid
        conn.commit()
        conn.close()
        
        print(f"✅ Panic alert stored in database with ID: {alert_id}")
        print(f"📍 Will be geocoded to address when retrieved\n")

        return jsonify({
            "status": "Panic alert stored",
            "alert_id": alert_id,
            "coordinates": {"lat": lat, "lng": lng},
            "timestamp": datetime.now().isoformat()
        }), 201

    except Exception as e:
        print(f"❌ Panic alert error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# ------------------ Geofence Check ------------------
@app.route("/geofence", methods=["POST"])
def geofence():
    try:
        data = request.get_json()
        lat = data.get("lat")
        lng = data.get("lng")

        if lat is None or lng is None:
            return jsonify({"error": "Latitude and longitude required"}), 400

        danger_lat, danger_lng = 12.9982, 77.5920
        distance = haversine((lat, lng), (danger_lat, danger_lng))

        if distance < 1.0:
            return jsonify({"safe": False, "distance_km": distance})
        return jsonify({"safe": True, "distance_km": distance})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ Get All Alerts (ENHANCED FORMAT) ------------------
@app.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        c.execute("SELECT * FROM alerts ORDER BY timestamp DESC")
        rows = c.fetchall()
        conn.close()

        # Transform to match frontend Alert interface with enhanced data
        alerts = []
        for row in rows:
            # Find tourist details from registered_users
            tourist = next((u for u in registered_users if u["digitalId"] == row["tourist_id"]), None)
            
            # Get location address using geocoding
            location_str = get_location_address(row['lat'], row['lng'])
            
            alerts.append({
                "id": str(row["id"]),
                "digitalId": row["tourist_id"],  # Include digital ID
                "touristName": tourist["name"] if tourist else "Unknown Tourist",
                "lat": row["lat"],
                "lng": row["lng"],
                "location": location_str,  # Formatted location string
                "timestamp": row["timestamp"],
                "status": "panic" if row["alert_type"] == "PANIC" else "safe",
                "alertType": row["alert_type"],
                "emergencyContact": tourist["emergencyContact"] if tourist else "N/A"
            })

        return jsonify(alerts)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ Get All Tourists (NEW ENDPOINT) ------------------
@app.route('/tourists', methods=['GET'])
def get_tourists():
    try:
        # Format for TouristTable & MapView
        tourists = [
            {
                "id": u["digitalId"],
                "name": u["name"],
                "lat": 12.9716,  # Mock for demo — in real app, store last known location
                "lng": 77.5946,
                "status": "safe",  # Mock — in real app, derive from last alert
                "lastSeen": "2025-09-16T12:00:00",
                "contact": u["emergencyContact"]
            }
            for u in registered_users
        ]
        return jsonify(tourists)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ Dashboard (Users) ------------------
@app.route('/dashboard', methods=['GET'])
def dashboard():
    return jsonify({"users": registered_users})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)