import React, { useState } from "react";

const EpicForm = ({ onEpicCreated }) => {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add your API call here: await createEpic(form);
    if (onEpicCreated) onEpicCreated(form);
    
    // Reset form after submission
    setForm({ title: "", summary: "", startDate: "", endDate: "" });
    navigate("/epics"); 
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Create New Epic</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Epic Title</label>
          <input
            placeholder="e.g. User Authentication Phase 1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
          <textarea
            placeholder="Briefly describe the goal of this epic..."
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg active:transform active:scale-[0.98]"
        >
          Create Epic
        </button>
      </form>
    </div>
  );
};

export default EpicForm;
