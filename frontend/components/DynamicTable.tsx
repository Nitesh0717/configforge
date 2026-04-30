"use client";

import { useEffect, useState } from "react";

export default function DynamicTable({ model, refresh }: any) {
  const [data, setData] = useState<any[]>([]);

  // ✅ Fetch from localStorage
  const fetchData = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setData(tasks);
  };

  // ✅ Delete
  const handleDelete = (id: number) => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updated = tasks.filter((item: any) => item.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updated));
    fetchData();
  };

  // ✅ Edit
  const handleEdit = (item: any) => {
    const newTitle = prompt("Enter new title", item.title);
    const newDescription = prompt("Enter new description", item.description);

    if (!newTitle || !newDescription) return;

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const updated = tasks.map((t: any) =>
      t.id === item.id
        ? {
            ...t,
            title: newTitle,
            description: newDescription,
          }
        : t
    );

    localStorage.setItem("tasks", JSON.stringify(updated));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="p-4 border mt-4 rounded bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-3 capitalize">
        {model} Table
      </h2>

      {data.length === 0 ? (
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
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mb-2">
                {item.description}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.completed
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {item.completed ? "Done" : "Pending"}
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
