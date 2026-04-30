"use client";

import { useState } from "react";

export default function DynamicForm({ setRefresh }: any) {
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

    if (!formData.title || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ LOCAL STORAGE SAVE (NO BACKEND)
      const newTask = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        completed: formData.completed,
      };

      const existingTasks = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );

      const updatedTasks = [...existingTasks, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // ✅ Reset form
      setFormData({
        title: "",
        description: "",
        completed: false,
      });

      // ✅ Refresh UI
      setRefresh((prev: number) => prev + 1);
    } catch (err) {
      console.error(err);
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
