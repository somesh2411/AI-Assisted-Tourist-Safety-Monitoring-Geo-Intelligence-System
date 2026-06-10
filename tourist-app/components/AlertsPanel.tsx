import React, { useEffect, useState } from "react";
import axios from "axios";

// -----------------------------
// TypeScript Interface
// -----------------------------
export interface Alert {
  id: string;
  touristName: string;
  lat: number;
  lng: number;
  timestamp: string;
  status: "safe" | "alert" | "panic";
}

// -----------------------------
// Pagination Utility
// -----------------------------
const paginate = <T,>(items: T[], currentPage: number, pageSize: number): T[] => {
  const startIndex = (currentPage - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

// -----------------------------
// Component
// -----------------------------
const AlertsView: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ⚡ Backend API for alerts
  const API_URL = "http://10.169.7.122:5000/alerts";

  // -----------------------------
  // Fetch alerts (Step 3 requirement)
  // -----------------------------
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Alert[]>(API_URL);
      // latest first
      setAlerts(
        res.data.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to fetch alerts.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Auto-refresh every 5s
  // -----------------------------
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Filtering + Pagination
  // -----------------------------
  const filteredAlerts = alerts.filter(
    (a) =>
      a.touristName.toLowerCase().includes(search.toLowerCase()) ||
      a.status.toLowerCase().includes(search.toLowerCase())
  );

  const pagedAlerts = paginate(filteredAlerts, currentPage, pageSize);
  const totalPages = Math.ceil(filteredAlerts.length / pageSize);

  return (
    <div style={{ padding: "16px" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "12px",
        }}
      >
        🚨 Active Alerts
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or status"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "12px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {/* Loading & Error */}
      {loading && <p>Loading alerts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Alerts Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "500px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Tourist Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Location
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedAlerts.length > 0 ? (
              pagedAlerts.map((a, index) => (
                <tr
                  key={a.id}
                  style={{
                    backgroundColor:
                      a.status === "panic"
                        ? "#ffe6e6" // light red for panic
                        : index % 2 === 0
                        ? "#fff"
                        : "#f9f9f9",
                    textAlign: "left",
                  }}
                >
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {a.touristName}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      fontWeight: a.status === "panic" ? "bold" : "normal",
                      color: a.status === "panic" ? "red" : "green",
                    }}
                  >
                    {a.status.toUpperCase()}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    📍 ({a.lat.toFixed(3)}, {a.lng.toFixed(3)})
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    🕒 {new Date(a.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  No alerts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === page ? "#f44336" : "#fff",
                color: currentPage === page ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsView;
