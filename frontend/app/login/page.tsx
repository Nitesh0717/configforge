"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    // ✅ FAKE LOGIN (demo mode)
    localStorage.setItem("token", "demo-token");

    alert("Login successful (demo)");

    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-6 rounded w-[300px] shadow-lg">
        <h1 className="text-xl mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-600 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
