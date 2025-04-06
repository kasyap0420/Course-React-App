import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/register", {
        username,
        password,
        roles: [{ authority: "ROLE_USER" }]  // Default role
      });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
               placeholder="Username" className="w-full border p-2 rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
               placeholder="Password" className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
