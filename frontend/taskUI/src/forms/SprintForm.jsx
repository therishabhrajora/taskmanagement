import { useState } from "react";
import { createSprint } from "../api/sprintApi"; // Imported this
import { useNavigate } from "react-router-dom";

export default function SprintForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sprintName: "",
    startDate: "",
    endDate: "",
    state: "PLANNED",
    projectId: ""
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : null
      };
      await createSprint(payload);
      navigate("/sprints");
    } catch (err) {
      alert("Error creating sprint: " + err.message);
    }
  };

  // Shared Tailwind class for inputs
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-gray-700";

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl shadow-blue-100 rounded-2xl w-full max-w-lg p-10 border border-gray-100">
        
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Sprint</h2>
          <p className="text-gray-500 mt-2">Plan your team's next iteration</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Sprint Name</label>
            <input
              type="text"
              placeholder="e.g. Q4 Performance Improvements"
              className={inputStyle}
              value={form.sprintName}
              onChange={(e) => handleChange("sprintName", e.target.value)}
              required
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Start Date</label>
              <input
                type="date"
                className={inputStyle}
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">End Date</label>
              <input
                type="date"
                className={inputStyle}
                value={form.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* STATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
              <select
                className={inputStyle}
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
              >
                <option value="PLANNED">Planned</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* PROJECT */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Project ID</label>
              <input
                type="number"
                placeholder="ID"
                className={inputStyle}
                value={form.projectId}
                onChange={(e) => handleChange("projectId", e.target.value)}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98]">
              Create Sprint
            </button>
            <button 
              type="button"
              onClick={() => navigate("/sprints")}
              className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
