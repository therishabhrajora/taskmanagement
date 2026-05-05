import { useEffect, useState } from "react";
import { getEpics } from "../../api/issueApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";

export default function EpicPage() {
  const navigate = useNavigate();
  const [epics, setEpics] = useState([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getEpics();
    setEpics(res.data);
  };

  return (
    <>
      <Sidebar />
      <div className="p-6 bg-gray-100 min-h-screen pl-76">
        <div className="flex justify-between max-w-5xl mx-auto mb-6 ">
          <h1 className="text-2xl font-semibold mb-4">Epics</h1>
          <div>
            <button
              onClick={() => navigate("/epicForm")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Create New Epic
            </button>
          </div>
        </div>

        {/* FORM */}

        {/* EPIC LIST */}
        <div className="grid grid-cols-3 gap-4">
          {epics.map((e) => (
            <div key={e.id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold">{e.title}</h2>
              <p className="text-sm text-gray-500">{e.summary}</p>

              <div className="text-xs mt-2 text-gray-400">
                {formatDate(e.startDate)} → {formatDate(e.endDate)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
