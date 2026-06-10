import { useState } from "react";
import axios from "axios";

export default function RegistrationForm({ onRegister }) {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name: name.trim(),
        idNumber: idNumber.trim(),
        emergencyContact: emergencyContact.trim(),
      });
      onRegister(res.data.digitalId);
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "450px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Register as Tourist</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input placeholder="ID (Passport/Aadhaar)" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required style={inputStyle} />
        <input placeholder="Emergency Contact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnPrimaryStyle}>Register</button>
      </form>
    </div>
  );
}

const inputStyle = { padding: "12px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px" };
const btnPrimaryStyle = { padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" };