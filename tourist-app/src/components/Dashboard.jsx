import { useState } from "react";
import axios from "axios";

export default function Dashboard({ digitalId }) {
  const [status, setStatus] = useState("");

  // Panic Button
  const sendPanic = async () => {
    try {
      await axios.post("http://localhost:5000/panic", {
        digitalId,
        lat: 12.9716,  // Bangalore Railway Station
        lng: 77.5946,
      });
      setStatus("🚨 Panic Alert Sent!");
    } catch (err) {
      setStatus("❌ Panic Failed");
    }
  };

  // GeoFence Button
  const shareLocation = async () => {
    try {
      const res = await axios.post("http://localhost:5000/geofence", {
        lat: 12.9982,  // Bangalore Palace (danger zone)
        lng: 77.5920,
      });
      if (res.data.safe) {
        setStatus(`✅ Safe Zone — ${res.data.distance_km.toFixed(2)} km away from danger`);
      } else {
        setStatus(`⚠️ Danger Zone! Only ${res.data.distance_km.toFixed(2)} km away`);
      }
    } catch (err) {
      setStatus("❌ Geofence Failed");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2>Tourist Dashboard</h2>
      <p><b>Digital ID:</b> {digitalId}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px" }}>
        <button onClick={sendPanic} style={btnDangerStyle}>
          🚨 Panic
        </button>
        <button onClick={shareLocation} style={btnSuccessStyle}>
          📍 Share Location
        </button>
      </div>

      {status && (
        <div style={{
          marginTop: "20px",
          fontSize: "18px",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: status.includes("Safe") ? "#d4edda" : status.includes("Danger") ? "#f8d7da" : "#f8f9fa",
          color: status.includes("Safe") ? "#155724" : status.includes("Danger") ? "#721c24" : "#6c757d",
          border: "1px solid",
          borderColor: status.includes("Safe") ? "#c3e6cb" : status.includes("Danger") ? "#f5c6cb" : "#e9ecef"
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

const btnDangerStyle = {
  padding: "12px 24px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

const btnSuccessStyle = {
  padding: "12px 24px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};