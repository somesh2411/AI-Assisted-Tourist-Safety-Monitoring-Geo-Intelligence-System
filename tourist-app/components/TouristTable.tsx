import React, { useEffect, useState } from "react";
import axios from "axios";

// -----------------------------
// TypeScript Interface
// -----------------------------
export interface Tourist {
  name: string;
  digital_id: string;
  contact: string;
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
const TouristTable: React.FC = () => {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Tourist>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const API_URL = "http://10.169.7.122:5000/tourists";

  // Fetch tourist data
  const fetchTourists = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Tourist[]>(API_URL);
      setTourists(res.data);
    } catch (err) {
      console.error("Error fetching tourists:", err);
      setError("Failed to fetch tourist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourists();
    const interval = setInterval(fetchTourists, 5000);
    return () => clearInterval(interval);
  }, []);

  // Search filter
  const filteredTourists = tourists.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.digital_id.toLowerCase().includes(search.toLowerCase()) ||
      t.contact.includes(search)
  );

  // Sorting
  const sortedTourists = [...filteredTourists].sort((a, b) => {
    const aField = a[sortField];
    const bField = b[sortField];
    if (typeof aField === "string" && typeof bField === "string") {
      return sortOrder === "asc"
        ? aField.localeCompare(bField)
        : bField.localeCompare(aField);
    }
    return 0;
  });

  // Pagination
  const pagedTourists = paginate(sortedTourists, currentPage, pageSize);
  const totalPages = Math.ceil(sortedTourists.length / pageSize);

  const handleSort = (field: keyof Tourist) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
        Tourist List
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, ID or contact"
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
      {loading && <p>Loading tourists...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
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
              <th
                style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
                onClick={() => handleSort("name")}
              >
                Name {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
                onClick={() => handleSort("digital_id")}
              >
                Digital ID {sortField === "digital_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
                onClick={() => handleSort("contact")}
              >
                Contact {sortField === "contact" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedTourists.length > 0 ? (
              pagedTourists.map((t, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    textAlign: "left",
                  }}
                >
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.digital_id}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "8px" }}>
                  No tourists found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "12px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === page ? "#4CAF50" : "#fff",
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

export default TouristTable;
