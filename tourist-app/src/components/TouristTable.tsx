import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tourist {
  id: string;
  name: string;
  contact: string;
}

export default function TouristTable() {
  const [tourists, setTourists] = useState<Tourist[]>([]); // ✅ typed array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const res = await axios.get<Tourist[]>("http://localhost:5000/tourists");
        setTourists(res.data);
      } catch (err) {
        console.error("Failed to fetch tourists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourists();
    const interval = setInterval(fetchTourists, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading tourists...</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Digital ID</th>
            <th style={thStyle}>Contact</th>
          </tr>
        </thead>
        <tbody>
          {tourists.map((t, i) => (
            <tr key={t.id || i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
              <td style={tdStyle}>{t.name}</td>
              <td style={tdStyle}>{t.id}</td>
              <td style={tdStyle}>{t.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { border: "1px solid #ddd", padding: "8px" };
const tdStyle = { border: "1px solid #ddd", padding: "8px" };
