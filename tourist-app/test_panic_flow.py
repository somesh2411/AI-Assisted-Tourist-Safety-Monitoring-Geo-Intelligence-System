#!/usr/bin/env python3
"""
Test script to verify the panic button functionality
"""
import requests
import json
import time

BASE_URL = "http://localhost:5000"

def test_registration():
    """Test tourist registration"""
    print("🔹 Testing tourist registration...")
    data = {
        "name": "Test Tourist",
        "idNumber": "ID123456",
        "emergencyContact": "+1-555-0123"
    }
    
    response = requests.post(f"{BASE_URL}/register", json=data)
    print(f"Registration Status: {response.status_code}")
    
    if response.status_code == 201:
        result = response.json()
        print(f"✅ Registration successful! Digital ID: {result['digitalId']}")
        return result['digitalId']
    else:
        print(f"❌ Registration failed: {response.text}")
        return None

def test_panic_alert(digital_id):
    """Test panic alert submission"""
    print(f"\n🔹 Testing panic alert for {digital_id}...")
    data = {
        "digitalId": digital_id,
        "lat": 12.9716,  # Test coordinates (Bangalore)
        "lng": 77.5946
    }
    
    response = requests.post(f"{BASE_URL}/panic", json=data)
    print(f"Panic Alert Status: {response.status_code}")
    
    if response.status_code == 201:
        result = response.json()
        print(f"✅ Panic alert sent successfully: {result['status']}")
        return True
    else:
        print(f"❌ Panic alert failed: {response.text}")
        return False

def test_get_alerts():
    """Test retrieving alerts"""
    print(f"\n🔹 Testing alerts retrieval...")
    response = requests.get(f"{BASE_URL}/alerts")
    print(f"Get Alerts Status: {response.status_code}")
    
    if response.status_code == 200:
        alerts = response.json()
        print(f"✅ Retrieved {len(alerts)} alerts")
        
        for alert in alerts:
            print(f"   Alert ID: {alert.get('id')}")
            print(f"   Digital ID: {alert.get('digitalId')}")
            print(f"   Tourist: {alert.get('touristName')}")
            print(f"   Status: {alert.get('status')}")
            print(f"   Location: {alert.get('location')}")
            print(f"   Emergency Contact: {alert.get('emergencyContact')}")
            print(f"   Timestamp: {alert.get('timestamp')}")
            print("   ---")
        return alerts
    else:
        print(f"❌ Failed to retrieve alerts: {response.text}")
        return []

def test_server_status():
    """Test if server is running"""
    print("🔹 Testing server status...")
    try:
        response = requests.get(BASE_URL, timeout=5)
        print(f"Server Status: {response.status_code}")
        if response.status_code == 200:
            print(f"✅ Server is running: {response.text}")
            return True
        else:
            print(f"❌ Server returned error: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to server: {e}")
        print("Make sure to run: python backend/app.py")
        return False

if __name__ == "__main__":
    print("🚨 Tourist Safety App - Panic Button Test")
    print("=" * 50)
    
    # Test server connectivity
    if not test_server_status():
        exit(1)
    
    # Test registration
    digital_id = test_registration()
    if not digital_id:
        exit(1)
    
    # Wait a moment
    time.sleep(1)
    
    # Test panic alert
    if not test_panic_alert(digital_id):
        exit(1)
    
    # Wait a moment for database write
    time.sleep(1)
    
    # Test alerts retrieval
    alerts = test_get_alerts()
    
    print("\n" + "=" * 50)
    print("🎉 All tests completed!")
    
    if alerts:
        print(f"✅ Found {len(alerts)} alerts in the system")
        print("Admin dashboard should now display the panic alert with:")
        print(f"   - Digital ID: {digital_id}")
        print("   - Tourist name: Test Tourist")
        print("   - Location coordinates and address")
        print("   - Emergency contact information")
    else:
        print("⚠️  No alerts found - check the database connection")