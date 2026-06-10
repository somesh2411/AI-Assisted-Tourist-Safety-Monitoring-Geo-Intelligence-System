Tourist Safety App - Enhanced Panic Button System
This application provides a comprehensive tourist safety monitoring system with real-time panic alerts, location tracking, and admin dashboard.

🚨 Recent Enhancements - Panic Button System
What was Fixed:
Real Location Detection: Panic button now gets actual user GPS location instead of hardcoded coordinates
Digital ID Display: Admin dashboard now properly shows tourist Digital ID (e.g., T-0001) instead of "No details available"
Enhanced Location Info: Added reverse geocoding to show readable addresses alongside coordinates
Improved Alert Display: Enhanced admin interface with better formatting and emergency contact information
Key Features:
For Tourists:
🆔 Digital ID System: Each registered tourist gets a unique ID (T-0001, T-0002, etc.)
📍 Real-time Location: Panic button captures actual GPS coordinates
🚨 Emergency Alerts: One-click panic button sends location and ID to admin dashboard
🔒 Privacy: Location only shared during emergencies
For Admin Dashboard:
🎛️ Real-time Monitoring: Live updates every 5 seconds
🆔 Digital ID Tracking: See exactly which tourist sent the alert
📍 Location Details: Both coordinates and readable addresses
📞 Emergency Contacts: Quick access to tourist's emergency contact
⚠️ Priority Alerts: Panic alerts highlighted in red with "URGENT" badge
🕒 Timestamp: Exact time when alert was sent
How It Works:
Tourist Registration:

Tourist registers with name, ID number, emergency contact
System assigns digital ID (T-0001, T-0002, etc.)
Panic Alert Process:

Tourist presses panic button
App requests location permission
GPS coordinates captured
Alert sent with digital ID + location
Admin dashboard shows alert immediately
Admin Response:

Admin sees: Digital ID, Tourist name, Location, Emergency contact
Can coordinate rescue/help based on exact location
Emergency contact available for immediate call
🛠️ Technical Implementation
Frontend Changes:
Added Geolocation API to TouristDashboard.jsx
Enhanced AdminDashboard.jsx with better alert formatting
Updated AlertsView.tsx to show digital IDs
Added fallback for devices without GPS
Backend Changes:
Enhanced /alerts endpoint with more data
Added reverse geocoding using OpenStreetMap Nominatim API
Improved error handling and logging
Added location formatting utilities
Database:
Existing schema works (tourist_id, lat, lng, alert_type, timestamp)
Enhanced data retrieval with tourist information
Added location address resolution
🚀 Getting Started
Prerequisites:
pip install flask flask-cors haversine requests
npm install
Running the Application:
Start Backend Server:

cd backend
python app.py
Server runs on http://localhost:5000

Start Frontend:

npm run dev
Frontend runs on http://localhost:5173

Test the System:

python test_panic_flow.py
Usage Flow:
Register a Tourist:

Go to frontend
Fill registration form
Get digital ID (e.g., T-0001)
Test Panic Button:

Go to Tourist Dashboard
Click "🚨 Panic" button
Allow location access when prompted
Alert sent with real GPS location
View in Admin Dashboard:

Go to Admin Dashboard
See alert with:
Digital ID: T-0001
Tourist name and contact
Real location address
Timestamp
🎯 Key Improvements Made:
Before:
❌ Hardcoded location (12.9716, 77.5946)
❌ "No details available" in admin
❌ Only coordinates, no address
❌ Poor alert formatting
After:
✅ Real GPS location from user device
✅ Digital ID (T-0001) prominently displayed
✅ Readable addresses + coordinates
✅ Enhanced admin interface with emergency contacts
✅ Better error handling and fallbacks
✅ Real-time updates
🛡️ Security & Privacy:
Location only accessed during panic button press
No continuous tracking
Emergency contacts encrypted in transit
Admin access controls
📱 Browser Compatibility:
Geolocation API supported in all modern browsers
Fallback to default location if GPS unavailable
Responsive design for mobile and desktop
Next Steps for Production:
Add user authentication
Implement push notifications for admins
Add SMS alerts to emergency contacts
Integrate with local emergency services
Add offline panic button capability
Implement geofencing for automatic alerts
React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the TS template for information on how to integrate TypeScript and typescript-eslint in your project.

---

# 👨‍💻 Author and Rights

**Somesh S**

Integrated M.Tech Software Engineering

Vellore Institute of Technology (VIT)

GitHub: https://github.com/somesh2411

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
