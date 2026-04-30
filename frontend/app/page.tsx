"use client";

import { useState } from "react";
import Renderer from "../components/Renderer";
import { appConfig } from "../config/appConfig";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your tasks with dynamic configuration
        </p>
      </div>

      {appConfig.ui.pages.map((page: any, index: number) => (
        <Renderer
          key={index}
          page={page}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
}
