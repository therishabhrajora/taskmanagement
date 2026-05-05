import { useEffect, useState } from "react";
import { createIssue, getEpics, getSprints} from "../api/issueApi";

import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, BoltIcon, CalendarIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function IssueForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    issueTitle: "",
    issueDescription: "",
    issueType: "TASK",
    issuePriority: "MEDIUM",
    issueStatus: "OPEN",
    assigneeEmail: "",
    reporterEmail: "",
    dueDate: "",
    sprintId: "",
    epicId: "",
    projectId: "",
   
  });

  const [epics, setEpics] = useState([]);
  const [sprints, setSprints] = useState([]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const fetchepics= async ()=>{
    const res=await getEpics();
    setEpics(res.data || []);
    
  }
  const fetchSprints= async ()=>{
    const res=await getSprints();
    setSprints(res.data || []);
    
  }
  useEffect(() => {
    fetchepics();
    fetchSprints();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        // Convert string IDs to numbers for the backend
        projectId: form.projectId ? Number(form.projectId) : null,
        sprintId: form.sprintId ? Number(form.sprintId) : null,
        epicId: form.epicId ? Number(form.epicId) : null,
        workFlowId: form.workFlowId ? Number(form.workFlowId) : null,
      };

      await createIssue(payload);
      navigate("/issues");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const inputClass = "block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 transition-all";
  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button 
              onClick={() => navigate("/issues")}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Issues
            </button>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Create New Issue</h2>
          </div>
          <BoltIcon className="h-10 w-10 text-indigo-600 opacity-20" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-gray-200">
          
          {/* TITLE */}
          <div>
            <label className={labelClass}>Issue Title</label>
            <input
              type="text"
              placeholder="e.g., Fix login page styling"
              className={inputClass}
              value={form.issueTitle}
              onChange={(e) => handleChange("issueTitle", e.target.value)}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              placeholder="Provide context and details..."
              rows="4"
              className={inputClass}
              value={form.issueDescription}
              onChange={(e) => handleChange("issueDescription", e.target.value)}
              required
            />
          </div>

          {/* ATTRIBUTES GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Type</label>
              <select className={inputClass} value={form.issueType} onChange={(e) => handleChange("issueType", e.target.value)}>
               
                <option value="TASK">TASK</option>
                <option value="BUG">BUG</option>
                <option value="SUBTASKS">SUBTASKS</option>
                <option value="STORY">STORY</option>
                <option value="EPICS">EPICS</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Priority</label>
              <select className={inputClass} value={form.issuePriority} onChange={(e) => handleChange("issuePriority", e.target.value)}>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.issueStatus} onChange={(e) => handleChange("issueStatus", e.target.value)}>
               
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="REOPENED">REOPENED</option>
                <option value="TODO">TODO</option>
                
                
              </select>
            </div>
          </div>

          {/* EMAILS */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Assignee</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="assignee@company.com"
                  className={`${inputClass} pl-10`}
                  value={form.assigneeEmail}
                  onChange={(e) => handleChange("assigneeEmail", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Reporter</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="reporter@company.com"
                  className={`${inputClass} pl-10`}
                  value={form.reporterEmail}
                  onChange={(e) => handleChange("reporterEmail", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

             {/* DUE DATE */}
            <div>
              <label className={labelClass}>Due Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className={`${inputClass} pl-10`}
                  value={form.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </div>
            </div>
            {/* WORKFLOW
            <div>
              <label className={labelClass}>Workflow ID</label>
              <input
                type="number"
                placeholder="0"
                className={inputClass}
                value={form.workFlowId}
                onChange={(e) => handleChange("workFlowId", e.target.value)}
              />
            </div> */}
          </div>

          {/* METADATA / IDS */}
          <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-gray-200">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Project Context</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Project ID</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-b border-gray-300 bg-transparent py-1 text-sm outline-none focus:border-indigo-600"
                  value={form.projectId}
                  onChange={(e) => handleChange("projectId", e.target.value)}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Sprint ID</label>
                <select className={inputClass} value={form.id} onChange={(e) => handleChange("sprintId", e.target.value)}>
                  <option value="">Select Sprint</option>
                  {sprints.map((sprint) => (
                    <option key={sprint.id} value={sprint.id}>
                     {sprint.id}
                    </option>
                  ))}
                </select>
              </div>
             
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase">Epic ID</label>
                <select className={inputClass} value={form.id} onChange={(e) => handleChange("epicId", e.target.value)}>
               <option value="">Select Epic</option>
                {epics.map((epic) => (
                  <option key={epic.id} value={epic.id}>
                    {epic.id}
                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/issues")}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
