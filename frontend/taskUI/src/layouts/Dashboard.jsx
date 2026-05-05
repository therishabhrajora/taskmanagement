import { useEffect, useState } from "react";
import { getIssues } from "../api/issueApi";
import { getEpics, getSprints } from "../api/issueApi";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [epics, setEpics] = useState([]);
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    fetchIssues();
    fetchEpics();
    fetchSprints();
  }, []);

  const fetchIssues = async () => {
    const res = await getIssues({});
    setIssues(res.data);
  };
  const fetchEpics = async () => {
    const res = await getEpics({});
    setEpics(res.data);
  };
  const fetchSprints = async () => {
    const res = await getSprints({});
    setSprints(res.data);
  };



  // 📊 Stats
  const totalEpics = epics.length;
  const totalSprints = sprints.length;
  const totalIssues = issues.length;
  const open = issues.filter((i) => i.issueStatus === "OPEN").length;
  const inProgress = issues.filter(
    (i) => i.issueStatus === "IN_PROGRESS",
  ).length;
  const done = issues.filter((i) => i.issueStatus === "DONE").length;

  const todo = issues.filter((i) => i.issueStatus === "TODO").length;
  const inReview = issues.filter((i) => i.issueStatus === "IN_REVIEW").length;
  const resolved = issues.filter((i) => i.issueStatus === "RESOLVED").length;
  const closed = issues.filter((i) => i.issueStatus === "CLOSED").length;
  const reopened = issues.filter((i) => i.issueStatus === "REOPENED").length;

  const chartData = [
    { name: "Open", value: open, color: "#3b82f6" },
    { name: "Todo", value: todo, color: "#8b5cf6" },
    { name: "In Progress", value: inProgress, color: "#f59e0b" },
    { name: "In Review", value: inReview, color: "#14b8a6" },
    { name: "Resolved", value: resolved, color: "#0ea5e9" },
    { name: "Closed", value: closed, color: "#64748b" },
    { name: "Reopened", value: reopened, color: "#ef4444" },
    { name: "Done", value: done, color: "#22c55e" },
  ];

  const getPercentage = (value) =>
    totalIssues > 0 ? ((value / totalIssues) * 100).toFixed(0) : 0;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar></Sidebar>

      {/* MAIN CONTENT */}
      <div className="flex-1 pl-72">
        <Navbar />

        {/* HEADER */}
        <div className="m-5">
          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-2xl font-semibold">Welcome back 👋</h1>

            <div className="bg-white px-4 py-2 rounded-lg shadow text-sm">
              {new Date().toDateString()}
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard title="Epics" value={totalEpics} color="blue" />
            <StatCard title="Sprints" value={totalSprints} color="blue" />
            <StatCard title="Issues" value={totalIssues} color="blue" />
            <StatCard title="Open" value={open} color="gray" />
            {/* <StatCard title="In Progress" value={inProgress} color="yellow" />
            <StatCard title="Completed" value={done} color="green" /> */}
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-3 gap-6">
            {/* DONUT CHART */}
            <div className="bg-white p-6 rounded-xl shadow col-span-1">
              <h2 className="font-medium mb-4">Issues by Status</h2>

              <div className="flex flex-col items-center">
                <PieChart width={220} height={220}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip cursor={{ fill: "transparent" }} />
                </PieChart>

                {/* 🏷️ LEGENDS SECTION */}
                <div className="w-full mt-4 space-y-3">
                  {chartData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">
                          {item.value}
                        </span>
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full ring-1 ring-inset ring-gray-200">
                          {getPercentage(item.value)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RECENT ISSUES */}
            <div className="bg-white p-6 rounded-xl shadow col-span-2">
              <div className="flex justify-between mb-4">
                <h2 className="font-medium">Recent Issues</h2>
                <button
                  onClick={() => navigate("/issues")}
                  className="text-blue-500 text-sm hover:text-blue-600 hover:cursor-pointer"
                >
                  View all
                </button>
              </div>

              {issues.slice(0, 5).map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between items-center py-3 border-b"
                >
                  <div>
                    <p className="font-medium">{i.issueTitle}</p>
                    <span className="text-xs text-gray-500">{i.issueType}</span>
                  </div>

                  <span className={statusBadge(i.issueStatus)}>
                    {i.issueStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 📦 STAT CARD */
function StatCard({ title, value, color }) {
  const navigate = useNavigate();
  const colors = {
    blue: "bg-blue-500",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-xl font-bold">{value}</h2>
        </div>

        <div className={`${colors[color]} text-white p-3 rounded-lg`}>📊</div>
      </div>
      <div className="text-blue-500 text-sm hover:text-blue-600 hover:cursor-pointer mt-2">
        {title === "Epics" && (
          <span onClick={() => navigate("/epics")}>View all</span>
        )}
        {title === "Sprints" && (
          <span onClick={() => navigate("/sprints")}>View all</span>
        )}
        {title === "Issues" && (
          <span onClick={() => navigate("/issues")}>View all</span>
        )}
        {title === "Open" && (
          <span onClick={() => navigate("/issues")}>View all</span>
        )}
      </div>
    </div>
  );
}

/* 🎨 STATUS BADGE */
function statusBadge(status) {
  switch (status) {
    case "OPEN":
      return "bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs";
    case "DONE":
      return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs";
    case "TODO":
      return "bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs";
    case "IN_REVIEW":
      return "bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs";
    case "RESOLVED":
      return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs";
    case "CLOSED":
      return "bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs";
    case "REOPENED":
      return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs";
    default:
      return "";
  }
}
