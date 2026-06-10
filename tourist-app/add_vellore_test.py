#!/usr/bin/env python3
"""
Add a test alert with Vellore coordinates to see correct address
"""
import sqlite3
from datetime import datetime

DB_FILE = "tourist_alerts.db"

def add_vellore_test():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        
        # Vellore coordinates
        vellore_lat = 12.9165
        vellore_lng = 79.1325
        
        # Add test alert
        c.execute("INSERT INTO alerts (tourist_id, lat, lng, alert_type) VALUES (?, ?, ?, ?)",
                  ("T-0001", vellore_lat, vellore_lng, "PANIC"))
        
        alert_id = c.lastrowid
        conn.commit()
        conn.close()
        
        print(f"✅ Added test Vellore alert with ID: {alert_id}")
        print(f"📍 Coordinates: {vellore_lat}, {vellore_lng}")
        print("🎯 This should show a Vellore address in the admin dashboard!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    add_vellore_test()