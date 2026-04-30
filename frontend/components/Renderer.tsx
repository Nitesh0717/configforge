"use client";

import DynamicForm from "./DynamicForm";
import DynamicTable from "./DynamicTable";

export default function Renderer({ page, refresh, setRefresh }: any) {
  if (!page || !page.model) {
    return (
      <div className="text-red-500">Invalid page configuration</div>
    );
  }

  const { model, title } = page;

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg mb-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 capitalize text-blue-400">
        {title || model}
      </h2>

      {/* Form */}
      <div className="mb-6">
        <DynamicForm model={model} setRefresh={setRefresh} />
      </div>

      {/* Table */}
      <DynamicTable model={model} refresh={refresh} />
    </div>
  );
}
