import { useEffect, useState } from "react";
import { getBacklog } from "../../api/backlogApi";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";
import Homebtn from "../../layouts/Homebtn";

export default function BacklogPage() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await getBacklog(1);
      setIssues(res.data);
    } catch (err) {
      console.error("Failed to load backlog", err);
    }
  };

  return (
   <>
   <Sidebar/>
    <div className="flex min-h-screen w-full bg-gray-50 pl-72 m-5">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mx-auto max-w-5xl">
          
          {/* Header Section */}
          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Project Backlog
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                A list of all issues currently in the backlog for this project.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => navigate("/issueForm")}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Create Issue
              </button>
            </div>
            <Homebtn/>
          </div>

          {/* Issue List container */}
          <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 sm:rounded-lg">
            <ul role="list" className="divide-y divide-gray-100">
              {issues.length === 0 ? (
                <li className="px-6 py-12 text-center text-sm text-gray-500 italic">
                  No issues found in the backlog.
                </li>
              ) : (
                issues.map((issue) => (
                  <li key={issue.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 transition-colors">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <div className="flex items-center gap-x-2">
                           <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {issue.issueKey}
                            </span>
                          <p className="text-sm font-semibold leading-6 text-indigo-600">
                            {issue.issueTitle}
                          </p>
                        </div>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                           Updated 2 days ago • Priority: <span className="font-medium text-gray-700">{issue.issuePriority || "Medium"}</span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                         Assigned to <span className="font-medium text-gray-600">{issue.assigneeEmail || "Unassigned"}</span>
                      </p>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 mt-1" aria-hidden="true" />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
