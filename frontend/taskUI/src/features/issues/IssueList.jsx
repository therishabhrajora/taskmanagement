import { useEffect, useState } from "react";
import { getAllIssues, getIssues } from "../../api/issueApi";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Homebtn from "../../layouts/Homebtn";
import Sidebar from "../../layouts/Sidebar";

export default function IssueList() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllIssues();
   
    setIssues(res.data || []);
  };

  const filtered = issues.filter((i) =>
    i.issueTitle.toLowerCase().includes(search.toLowerCase()),
  );

  const viewTask = (id) => {
    
    navigate(`/issue/${id}`);
  }

  return (
    <>
    <Sidebar/>
    <div className="min-h-screen bg-gray-50 pl-76 pr-5 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Issues</h1>

          {/* SEARCH BAR */}
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Search issues..."
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/issueForm")} // Navigates to your URL
            className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Create Issue
          </button>
          <Homebtn />
        </div>

        {/* ISSUE GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <div
              key={i.id}
              onClick={() => viewTask(i.id)}
              className="group relative flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-indigo-300 transition-all cursor-pointer"
            >
              <div>
               
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-medium text-gray-500 uppercase">
                    {i.issueKey}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getPriorityStyles(i.issuePriority)}`}
                  >
                    {i.issuePriority}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {i.issueTitle}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-2">
                  {i.issueDescription || "No description available."}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(i.issueStatus)}`}
                >
                  {i.issueStatus}
                </span>

                <div className="flex items-center gap-2">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-500 truncate max-w-[100px]">
                    {i.assigneeEmail?.split("@")[0] || "Unassigned"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

/* 🎨 STYLE HELPERS */
function getPriorityStyles(priority) {
  switch (priority) {
    case "HIGH":
      return "bg-red-50 text-red-700 ring-red-600/10";
    case "MEDIUM":
      return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
    case "LOW":
      return "bg-green-50 text-green-700 ring-green-600/10";
    default:
      return "bg-gray-50 text-gray-600 ring-gray-500/10";
  }
}

function getStatusStyles(status) {
  switch (status) {
    case "OPEN":
      return "bg-gray-100 text-gray-700";
    case "IN_PROGRESS":
      return "bg-indigo-100 text-indigo-700";
    case "DONE":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
