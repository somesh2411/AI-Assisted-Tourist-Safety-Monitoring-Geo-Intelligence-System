import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // ✅ Heatmap support
import MarkerClusterGroup from "react-leaflet-cluster"; // ✅ Marker clustering

// -----------------------------
// Tourist Type
// -----------------------------
export interface Tourist {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: "safe" | "panic";
  lastSeen?: string;
}

// -----------------------------
// Leaflet Icons
// -----------------------------
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// -----------------------------
// MapCenter Component
// -----------------------------
interface MapCenterProps {
  lat: number;
  lng: number;
}
const MapCenter: React.FC<MapCenterProps> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 16, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
};

// -----------------------------
// Heatmap Layer Component
// -----------------------------
interface HeatmapLayerProps {
  points: { lat: number; lng: number; intensity?: number }[];
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatLayer = (L as any).heatLayer(
      points.map((p) => [p.lat, p.lng, p.intensity || 1]),
      { radius: 25, blur: 20, maxZoom: 17 }
    );

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

// -----------------------------
// Main MapView Component
// -----------------------------
interface MapViewProps {
  highlightTourist?: Tourist | null;
}

const MapView: React.FC<MapViewProps> = ({ highlightTourist }) => {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);

  const API_URL = "http://10.169.7.122:5000/tourists";

  const fetchTourists = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get<Tourist[]>(API_URL);
      setTourists(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tourist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourists();
    const interval = setInterval(fetchTourists, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (highlightTourist) {
      setSelectedTourist(highlightTourist);
    }
  }, [highlightTourist]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {loading && (
        <div style={{ position: "absolute", zIndex: 1000, padding: 10 }}>
          Loading map...
        </div>
      )}
      {error && (
        <div style={{ color: "red", position: "absolute", zIndex: 1000, padding: 10 }}>
          {error}
        </div>
      )}

      <MapContainer
        center={[26.1445, 91.7362]} // Default center
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* ✅ Heatmap Layer */}
        <HeatmapLayer
          points={tourists.map((t) => ({
            lat: t.lat,
            lng: t.lng,
            intensity: t.status === "panic" ? 2 : 1,
          }))}
        />

        {/* ✅ Marker Clustering */}
        <MarkerClusterGroup chunkedLoading>
          {tourists.map((t) => (
            <Marker
              key={t.id}
              position={[t.lat, t.lng]}
              icon={t.status === "panic" ? redIcon : greenIcon}
              eventHandlers={{
                click: () => setSelectedTourist(t),
              }}
            >
              <Popup>
                <div>
                  <strong>{t.name}</strong> <br />
                  Status:{" "}
                  <span style={{ color: t.status === "panic" ? "red" : "green" }}>
                    {t.status.toUpperCase()}
                  </span>{" "}
                  <br />
                  Last Seen:{" "}
                  {t.lastSeen ? new Date(t.lastSeen).toLocaleString() : "N/A"}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* ✅ Center on selected tourist */}
        {selectedTourist && (
          <MapCenter lat={selectedTourist.lat} lng={selectedTourist.lng} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
