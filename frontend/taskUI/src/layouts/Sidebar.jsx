import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  BugAntIcon,
  QueueListIcon,
  ViewColumnsIcon,
  ClockIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UsersIcon,
  BellIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", icon: Squares2X2Icon, path: "/dashboard" },
  { name: "Issues", icon: BugAntIcon, path: "/issues" },
  { name: "Backlog", icon: QueueListIcon, path: "/backlog" },
  { name: "Board", icon: ViewColumnsIcon, path: "/board" },
  { name: "Sprints", icon: ClockIcon, path: "/sprints" },
  { name: "Epics", icon: Square3Stack3DIcon, path: "/epics" },
  { name: "Workflow", icon: Cog6ToothIcon, path: "/workflow" },
  { name: "Reports", icon: ChartBarIcon, path: "/reports" },
  { name: "Users", icon: UsersIcon, path: "/users" },
  { name: "Notifications", icon: BellIcon, path: "/notifications" }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4">
        
        {/* LOGO AREA */}
        <div className="flex h-16 shrink-0 items-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Task<span className="text-indigo-400">Flow</span>
          </span>
        </div>

        {/* NAVIGATION LIST */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const active = location.pathname === item.path;
                  
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.path)}
                        className={`
                          group flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors
                          ${active 
                            ? 'bg-slate-800 text-white' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* OPTIONAL: FOOTER SECTION (e.g., Settings or User) */}
            <li className="mt-auto">
              <button
                onClick={() => navigate("/profile")}
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white">
                  AD
                </div>
                <span className="truncate">Admin User</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
