import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

// Fix Leaflet default marker issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


// ✅ Define Tourist type
interface Tourist {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "safe" | "panic";
  lastSeen?: string;
}

export default function MapView() {
  const [tourists, setTourists] = useState<Tourist[]>([]); // ✅ typed state
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

  if (loading) return <p>Loading map...</p>;

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {tourists.map((t) => (
          <Marker
            key={t.id}
            position={[t.lat, t.lng]}
            icon={L.icon({
              iconUrl:
                t.status === "panic"
                  ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>{t.name}</strong>
              <br />
              Status:{" "}
              <span style={{ color: t.status === "panic" ? "red" : "green" }}>
                {t.status.toUpperCase()}
              </span>
              <br />
              Last Seen: {t.lastSeen ? new Date(t.lastSeen).toLocaleString() : "N/A"}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
