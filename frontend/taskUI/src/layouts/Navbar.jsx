import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  BellIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/outline";

export default function Navbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* MOBILE MENU TOGGLE (Optional but recommended for sidebar layouts) */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen?.(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* LEFT SIDE: Brand & Search */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4">
          <span 
            className="text-xl font-bold tracking-tight text-indigo-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            TaskFlow
          </span>
          
          {/* <form className="relative flex flex-1 ml-4" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">Search</label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 outline-1  sm:text-sm bg-gray-50"
              placeholder="Search issues..."
              type="search"
              name="search"
            />
          </form> */}
        </div>

        {/* RIGHT SIDE: Actions & Profile */}
        <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
          
          {/* QUICK CREATE */}
          <button
            onClick={() => navigate("/issueForm")} // Navigates to your URL
            className="hidden sm:flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Create
          </button>

          {/* NOTIFICATIONS */}
          <button type="button" className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>

          {/* SEPARATOR */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="-m-1.5 flex items-center p-1.5 focus:outline-none"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Your Profile
                </button>
                <button
                  onClick={() => navigate("/workflow")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Workflow
                </button>
                <button
                  onClick={() => navigate("/reports")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Reports
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
