"use client";

import { useState } from "react";
import axios from "axios";

export default function DynamicForm({ model, setRefresh }: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "completed") {
      setFormData({
        ...formData,
        completed: value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.title || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Not authenticated");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/${model}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Reset form
      setFormData({
        title: "",
        description: "",
        completed: false,
      });

      // ✅ Refresh table
      setRefresh((prev: number) => prev + 1);
    } catch (err: any) {
      console.error("Create error:", err?.response?.data || err.message);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 flex-wrap items-center"
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
       
       className="p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Description */}
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
      />

      {/* Status */}
      <select
        name="completed"
        value={formData.completed ? "true" : "false"}
        onChange={handleChange}
        className="p-2 bg-gray-800 border border-gray-600 rounded text-white"
      >
        <option value="false">Pending</option>
        <option value="true">Done</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
