import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // These endpoints may not exist yet, so we'll handle errors gracefully
      try {
        const alertsRes = await axios.get("http://localhost:5000/alerts");
        setAlerts(alertsRes.data || []);
      } catch (err) {
        console.warn("Alerts endpoint not available:", err.message);
        setAlerts([]);
      }
      
      try {
        const touristsRes = await axios.get("http://localhost:5000/tourists");
        setTourists(touristsRes.data || []);
      } catch (err) {
        console.warn("Tourists endpoint not available:", err.message);
        setTourists([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h2>⏳ Loading Admin Dashboard...</h2>
          <p>Fetching tourist data and alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#f5f7fa", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", marginBottom: "30px", padding: "20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", borderRadius: "10px" }}>
        <h1>🚨 Tourist Safety Monitoring Dashboard</h1>
        <p>Real-time alerts, tourist tracking, and geofence monitoring</p>
        <button 
          onClick={fetchData}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          🔄 Refresh Data
        </button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2>⚠️ Recent Alerts ({alerts.length})</h2>
          {error ? (
            <div style={{ color: "red", padding: "10px", background: "#ffeaea", borderRadius: "5px" }}>
              ❌ Error: {error}
            </div>
          ) : alerts.length > 0 ? (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {alerts.map((alert, index) => (
                <div key={alert.id || index} style={{ 
                  padding: "15px", 
                  margin: "10px 0", 
                  background: alert.status === 'panic' ? "#ffe6e6" : "#fff3cd", 
                  borderRadius: "8px", 
                  border: alert.status === 'panic' ? "2px solid #ff6b6b" : "1px solid #ffeaa7",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: alert.status === 'panic' ? '#d63031' : '#e17055' }}>
                        🚨 {alert.status?.toUpperCase() || "ALERT"}
                      </strong>
                      <br />
                      <div style={{ margin: "8px 0" }}>
                        <strong>Digital ID:</strong> {alert.digitalId || "N/A"}
                        <br />
                        <strong>Tourist:</strong> {alert.touristName || "Unknown"}
                        <br />
                        <strong>📍 Location:</strong> {alert.location || "No location data"}
                        <br />
                        {alert.emergencyContact && (
                          <>
                            <strong>📞 Emergency Contact:</strong> {alert.emergencyContact}
                            <br />
                          </>
                        )}
                      </div>
                      <small style={{ color: "#666", fontSize: "12px" }}>
                        🕒 {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : "Unknown time"}
                      </small>
                    </div>
                    {alert.status === 'panic' && (
                      <div style={{ 
                        backgroundColor: '#ff6b6b', 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        URGENT
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#666", background: "#f8f9fa", borderRadius: "5px" }}>
              ✅ No alerts at this time
            </div>
          )}
        </section>

        <section style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2>👥 Registered Tourists ({tourists.length})</h2>
          {tourists.length > 0 ? (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {tourists.map((tourist, index) => (
                <div key={index} style={{ padding: "10px", margin: "5px 0", background: "#e7f3ff", borderRadius: "5px", border: "1px solid #b3d9ff" }}>
                  <strong>👤 {tourist.name || "Unknown"}</strong>
                  <br />
                  <small>ID: {tourist.digitalId || tourist.idNumber || "N/A"}</small>
                  <br />
                  <small>📞 {tourist.emergencyContact || "No contact"}</small>
                  {tourist.lastSeen && (
                    <>
                      <br />
                      <small style={{ color: "#666" }}>Last seen: {tourist.lastSeen}</small>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#666", background: "#f8f9fa", borderRadius: "5px" }}>
              📝 No tourists registered yet
            </div>
          )}
        </section>
      </div>

      <section style={{ marginTop: "20px", background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <h2>🗺️ Map Placeholder</h2>
        <div style={{ 
          height: "300px", 
          background: "linear-gradient(45deg, #e3f2fd 25%, transparent 25%), linear-gradient(-45deg, #e3f2fd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e3f2fd 75%), linear-gradient(-45deg, transparent 75%, #e3f2fd 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: "18px",
          border: "2px dashed #ccc"
        }}>
          🗺️ Interactive Map Component<br />
          <small>(To be implemented)</small>
        </div>
      </section>
    </div>
  );
}
