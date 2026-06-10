#!/usr/bin/env python3
"""
Check what coordinates are actually stored in the database
"""
import sqlite3
from datetime import datetime

DB_FILE = "tourist_alerts.db"

def check_database():
    try:
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        
        print("🔍 CHECKING STORED COORDINATES IN DATABASE:")
        print("=" * 50)
        
        c.execute("SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 5")
        rows = c.fetchall()
        
        if not rows:
            print("❌ No alerts found in database")
            return
            
        for i, row in enumerate(rows, 1):
            print(f"\n📍 Alert #{i}:")
            print(f"   ID: {row['id']}")
            print(f"   Tourist ID: {row['tourist_id']}")
            print(f"   Latitude: {row['lat']} (should be ~12.9165 for Vellore)")
            print(f"   Longitude: {row['lng']} (should be ~79.1325 for Vellore)")
            print(f"   Alert Type: {row['alert_type']}")
            print(f"   Timestamp: {row['timestamp']}")
            
            # Check if it's Chennai coordinates
            lat, lng = float(row['lat']), float(row['lng'])
            
            # Chennai center: 13.0827, 80.2707
            chennai_distance = ((lat - 13.0827)**2 + (lng - 80.2707)**2)**0.5
            # Vellore center: 12.9165, 79.1325  
            vellore_distance = ((lat - 12.9165)**2 + (lng - 79.1325)**2)**0.5
            
            if chennai_distance < 0.1:  # Within ~11km of Chennai
                print(f"   ⚠️  WARNING: These are Chennai coordinates!")
            elif vellore_distance < 0.1:  # Within ~11km of Vellore
                print(f"   ✅ These look like Vellore coordinates")
            else:
                print(f"   🤔 These are somewhere else")
                
            print(f"   Distance from Chennai center: ~{chennai_distance*111:.1f} km")
            print(f"   Distance from Vellore center: ~{vellore_distance*111:.1f} km")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Database error: {e}")

if __name__ == "__main__":
    check_database()