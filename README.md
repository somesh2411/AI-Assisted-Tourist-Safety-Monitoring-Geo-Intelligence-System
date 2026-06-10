# 🛡️ Tourist Safety App – Enhanced Panic Button System

A comprehensive tourist safety monitoring platform that provides real-time panic alerts, GPS-based location tracking, emergency contact management, and an admin monitoring dashboard to improve traveler safety.

---

## 📌 Overview

The Tourist Safety App is designed to help tourists quickly request assistance during emergencies. With a single panic button press, the system captures the user's real-time GPS location and instantly notifies administrators through a live dashboard.

The platform combines emergency alert management, digital tourist identification, and location intelligence to ensure faster response and better coordination during critical situations.

---

# 🚨 Recent Enhancements – Panic Button System

## ✅ Issues Fixed

### Real Location Detection

* Replaced hardcoded coordinates with actual GPS location retrieval.
* Captures real-time latitude and longitude using the browser Geolocation API.

### Digital ID Integration

* Admin dashboard now displays tourist Digital IDs.
* Example IDs:

  * T-0001
  * T-0002
  * T-0003

### Enhanced Location Information

* Added reverse geocoding support.
* Converts GPS coordinates into readable addresses.

### Improved Alert Display

* Better alert formatting.
* Emergency contacts shown directly in alert cards.
* Priority indicators for urgent alerts.

---

# ✨ Features

## 👤 Tourist Features

### 🆔 Digital ID System

Each registered tourist receives a unique Digital ID.

Examples:

* T-0001
* T-0002
* T-0003

### 📍 Real-Time GPS Tracking

* Captures actual user location during emergencies.
* No manual location input required.

### 🚨 Emergency Panic Button

* One-click emergency activation.
* Sends location and tourist details instantly.

### 🔒 Privacy Protection

* Location is accessed only when the panic button is pressed.
* No continuous tracking.

---

## 👨‍💼 Admin Dashboard Features

### 🎛️ Real-Time Monitoring

* Dashboard refreshes automatically every 5 seconds.
* Live visibility of incoming emergency alerts.

### 🆔 Digital ID Tracking

Administrators can identify exactly which tourist generated an alert.

### 📍 Detailed Location Information

Displays:

* GPS Coordinates
* Human-readable address

### 📞 Emergency Contact Access

Quick access to registered emergency contacts.

### ⚠️ Priority-Based Alerting

* Panic alerts highlighted in red.
* URGENT badge for critical situations.

### 🕒 Timestamp Tracking

Displays the exact time each alert was generated.

---

# 🔄 System Workflow

## 1. Tourist Registration

The tourist registers with:

* Full Name
* ID Number
* Emergency Contact Information

The system automatically generates a unique Digital ID.

Example:

```text
T-0001
```

---

## 2. Panic Alert Activation

When the tourist presses the Panic Button:

1. Location permission is requested.
2. GPS coordinates are captured.
3. Alert is generated.
4. Digital ID is attached.
5. Alert is sent to the admin dashboard.

---

## 3. Admin Response

The administrator receives:

* Tourist Digital ID
* Tourist Name
* Emergency Contact
* GPS Coordinates
* Physical Address
* Alert Timestamp

This information can be used to coordinate emergency assistance and rescue operations.

---

# 🏗️ Technical Implementation

## Frontend Enhancements

### Tourist Dashboard

* Integrated Browser Geolocation API
* Real-time GPS capture
* Improved emergency alert flow

### Admin Dashboard

* Enhanced alert display
* Digital ID visibility
* Address rendering
* Emergency contact information

### Alerts View

* Digital ID support
* Improved formatting
* Better status indicators

### Fallback Mechanism

* Handles GPS failures gracefully
* Uses fallback location if necessary

---

## Backend Enhancements

### Alert Processing API

Enhanced `/alerts` endpoint to include:

* Tourist details
* Digital ID
* Address information
* GPS coordinates

### Reverse Geocoding

Uses:

* OpenStreetMap Nominatim API

Features:

* Coordinate-to-address conversion
* Human-readable locations

### Error Handling

* Improved logging
* Better API response management
* GPS failure recovery

---

## Database Structure

Existing schema supports:

```text
tourist_id
latitude
longitude
alert_type
timestamp
```

Enhanced retrieval includes:

* Tourist information
* Emergency contacts
* Resolved addresses

---

# 🖥️ Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* CSS

## Backend

* Flask
* Flask-CORS

## APIs & Services

* Geolocation API
* OpenStreetMap Nominatim API

## Database

* SQLite / Database Layer

## Utilities

* Haversine
* Requests

---

# 🚀 Installation & Setup

## Prerequisites

Install Python dependencies:

```bash
pip install flask flask-cors haversine requests
```

Install frontend dependencies:

```bash
npm install
```

---

## Running the Backend

```bash
cd backend
python app.py
```

Backend URL:

```text
http://localhost:5000
```

---

## Running the Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Testing the Panic Alert Flow

```bash
python test_panic_flow.py
```

---

# 📲 Usage Guide

## Step 1: Register a Tourist

* Open the application
* Fill out the registration form
* Receive a Digital ID

Example:

```text
T-0001
```

---

## Step 2: Trigger a Panic Alert

* Open Tourist Dashboard
* Click:

```text
🚨 Panic Button
```

* Grant location access
* Alert is transmitted

---

## Step 3: Monitor via Admin Dashboard

The admin can view:

```text
Digital ID: T-0001
Name: Tourist Name
Location: Current Address
Emergency Contact: +91XXXXXXXXXX
Timestamp: YYYY-MM-DD HH:MM:SS
```

---

# 🎯 Improvements Summary

## Before

❌ Hardcoded location coordinates

❌ No Digital ID visibility

❌ Coordinates only

❌ Poor alert presentation

❌ Limited emergency information

---

## After

✅ Real GPS location detection

✅ Unique Digital ID display

✅ Readable address conversion

✅ Emergency contact visibility

✅ Enhanced alert UI

✅ Better error handling

✅ Real-time monitoring updates

---

# 🔐 Security & Privacy

* Location accessed only during emergencies.
* No continuous tracking.
* Secure transmission of emergency information.
* Role-based admin access.
* Privacy-focused architecture.

---

# 🌐 Browser Compatibility

Supported on all modern browsers:

* Google Chrome
* Microsoft Edge
* Firefox
* Safari

Includes fallback handling for devices where GPS is unavailable.

---

# 🔮 Future Enhancements

## Authentication & Authorization

* Secure user login
* Admin role management

## Push Notifications

* Instant admin notifications
* Browser push support

## SMS Alerts

* Notify emergency contacts automatically

## Emergency Services Integration

* Connect with local authorities
* Emergency dispatch support

## Offline Panic Mode

* Queue emergency alerts offline
* Sync when connectivity returns

## Geofencing

* Automatic alerts for unsafe zones
* Restricted area monitoring

---

# ⚡ React + Vite

This project uses React with Vite for fast development and optimized performance.

### Included Plugins

* @vitejs/plugin-react
* @vitejs/plugin-react-swc

### Development Features

* Fast Refresh
* Hot Module Replacement (HMR)
* ESLint Integration

For production applications, TypeScript support can be added using the official Vite TypeScript template.

---

# 👨‍💻 Author

**Somesh S**

Integrated M.Tech Software Engineering

Vellore Institute of Technology (VIT)

GitHub:
https://github.com/somesh2411

---

# 📜 License

This project is intended for educational, research, and demonstration purposes.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Your support helps improve and expand the project.
