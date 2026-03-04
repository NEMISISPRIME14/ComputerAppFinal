import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function LocationMap() {
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState({ lat: 30.0444, lng: 31.2357 }); // Cairo default
  const [label, setLabel] = useState("Cairo");

  const search = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );

    const data = await res.json();
    if (!data.length) return alert("Location not found");

    const result = data[0];

    setPos({
      lat: Number(result.lat),
      lng: Number(result.lon),
    });

    setLabel(result.display_name);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter location..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={search}>Search</button>
      </div>

      <div style={{ height: "500px" }}>
        <MapContainer center={[pos.lat, pos.lng]} zoom={13} style={{ height: "100%" }}>
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[pos.lat, pos.lng]}>
            <Popup>{label}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}