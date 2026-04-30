"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* Sidebar */}
      <div className="w-60 bg-gray-900 p-4 border-r border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-blue-500">
          ⚙️ ConfigForge 
        </h2>

        
        <nav className="space-y-2">
          <Link href="/" className="block">
            <div
              className={`p-2 rounded cursor-pointer ${
                pathname === "/"
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-6 relative">

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
