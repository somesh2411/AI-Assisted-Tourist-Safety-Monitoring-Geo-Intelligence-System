import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Define Alert type
interface Alert {
  id: string;
  digitalId: string;
  touristName: string;
  status: "safe" | "panic";
  lat: number;
  lng: number;
  location: string;
  timestamp: string;
  alertType: string;
  emergencyContact: string;
}

export default function AlertsView() {
  const [alerts, setAlerts] = useState<Alert[]>([]); // ✅ Typed state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get<Alert[]>("http://localhost:5000/alerts");

        // ✅ Sort by latest timestamp
        const sorted = res.data.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setAlerts(sorted);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading alerts...</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle}>Digital ID</th>
              <th style={thStyle}>Tourist</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Time</th>
            </tr>
          </thead>
        <tbody>
          {alerts.map((a) => (
            <tr
              key={a.id}
              style={{ backgroundColor: a.status === "panic" ? "#ffe6e6" : "#fff" }}
            >
              <td style={{ ...tdStyle, fontWeight: "bold", color: "#2d3436" }}>
                {a.digitalId}
              </td>
              <td style={tdStyle}>{a.touristName}</td>
              <td
                style={{
                  ...tdStyle,
                  color: a.status === "panic" ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {a.status.toUpperCase()}
              </td>
              <td style={tdStyle}>
                📍 {a.location || `(${a.lat.toFixed(3)}, ${a.lng.toFixed(3)})`}
              </td>
              <td style={tdStyle}>
                🕒 {new Date(a.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { border: "1px solid #ddd", padding: "8px" };
const tdStyle = { border: "1px solid #ddd", padding: "8px" };
