"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Renderer from "../components/Renderer";
import { appConfig } from "../config/appConfig";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Checking authentication...
      </div>
    );
  }

  return (
    <div>
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
