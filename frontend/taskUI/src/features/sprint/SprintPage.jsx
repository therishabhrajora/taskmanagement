import { useEffect, useState } from "react";
import { createSprint, startSprint, closeSprint } from "../../api/sprintApi";
import {
  PlusIcon,
  PlayIcon,
  StopIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import Sidebar from "../../layouts/Sidebar";
import { getSprints } from "../../api/issueApi";
import { useNavigate } from "react-router-dom";

export default function SprintPage() {
  const navigate = useNavigate(); 
  const [sprints, setSprints] = useState([]);
  const [form, setForm] = useState({ sprintName: "", projectId: 1 });

  const fetchSprints = async () => {
    const res = await getSprints();
    setSprints(res.data || []);
  };
  useEffect(() => {
    fetchSprints();
  }, []);

 

  const handleStart = async (id) => {
    await startSprint(id);
    updateState(id, "ACTIVE");
  };

  const handleClose = async (id) => {
    await closeSprint(id);
    updateState(id, "COMPLETED");
  };

  const updateState = (id, newState) => {
    setSprints((prev) =>
      prev.map((s) => (s.id === id ? { ...s, state: newState } : s)),
    );
  };

  const planned = sprints.filter((s) => s.state === "PLANNED");
  const active = sprints.filter((s) => s.state === "ACTIVE");
  const completed = sprints.filter((s) => s.state === "COMPLETED");

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 p-6 lg:p-10 ">
        <div className="mx-auto max-w-6xl pl-72">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Sprint Management
            </h1>
            <div>
              <button
                onClick={() => navigate("/sprintForm")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >
                Create New Sprint
              </button>
            </div>
          </div>

          {/* SECTIONS */}
          <div className="space-y-12">
            <Section
              title="Planned Sprints"
              data={planned}
              action={handleStart}
              actionLabel="Start Sprint"
              icon={<PlayIcon className="h-4 w-4" />}
              accent="border-gray-200"
            />

            <Section
              title="Active Sprint"
              data={active}
              action={handleClose}
              actionLabel="Close Sprint"
              icon={<StopIcon className="h-4 w-4" />}
              accent="border-indigo-500 bg-indigo-50/30"
            />

            <Section
              title="Completed"
              data={completed}
              icon={<CheckBadgeIcon className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  title,
  data,
  action,
  actionLabel,
  icon,
  accent = "border-gray-200",
}) {
  return (
    <div>
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-sm text-gray-400 italic py-2">
            No sprints in this stage.
          </p>
        ) : (
          data.map((s) => (
            <div
              key={s.id}
              className={`flex items-center justify-between rounded-lg border p-4 shadow-sm bg-white transition-all ${accent}`}
            >
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {s.sprintName}
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                      s.state === "ACTIVE"
                        ? "bg-indigo-50 text-indigo-700 ring-indigo-600/20"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10"
                    }`}
                  >
                    {s.state}
                  </span>
                </div>
              </div>

              {action && (
                <button
                  onClick={() => action(s.id)}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {icon}
                  {actionLabel}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
