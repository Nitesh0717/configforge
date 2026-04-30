"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DynamicTable({ model, refresh }: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Auth skipped (demo)");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/${model}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (err: any) {
      console.error("Fetch error:", err?.response?.data || err.message);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/${model}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEdit = async (item: any) => {
    const newTitle = prompt("Enter new title", item.data.title);
    const newDescription = prompt(
      "Enter new description",
      item.data.description
    );

    if (!newTitle || !newDescription) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/${model}/${item.id}`,
        {
          title: newTitle,
          description: newDescription,
          completed: item.data.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="p-4 border mt-4 rounded bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-3 capitalize">
        {model} Table
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-lg">🚫 No tasks yet</p>
          <p className="text-sm mt-1">
            Create your first task to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {data.map((item) => (
            <div
  key={item.id}
  className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-xl border border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
>
             <h3 className="text-lg font-semibold text-white mb-1">
  {item.data.title}
</h3>

<p className="text-gray-400 text-sm mb-2">
  {item.data.description}
</p>

<span
  className={`text-xs px-2 py-1 rounded ${
    item.data.completed
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white"
  }`}
>
  {item.data.completed ? "Done" : "Pending"}
</span>

              <div className="mt-4 flex gap-2">
  <button
    onClick={() => handleEdit(item)}
    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-medium"
  >
    ✏️ Edit
  </button>

  <button
    onClick={() => handleDelete(item.id)}
    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium"
  >
    🗑 Delete
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
