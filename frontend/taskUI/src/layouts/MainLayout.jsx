import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 
          Note: You'll need to pass sidebarOpen/setSidebarOpen 
          to your Sidebar if you want to support mobile toggling 
      */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="lg:pl-72">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* The "children" are your page components */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
