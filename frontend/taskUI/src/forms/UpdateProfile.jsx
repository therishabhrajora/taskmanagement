import React, { useState } from "react";
import { User, Mail, Briefcase, Building2, Globe, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../api/userApi";

export default function UserProfile({ initialData, onSubmit }) {
    const navigate = useNavigate(); 
 const profileFromStorage = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null;
  const [formData, setFormData] = useState(initialData || {
    userOfficialEmail: profileFromStorage?.userOfficialEmail || "",
    username: profileFromStorage?.username || "",
    designation: profileFromStorage?.designation || "",
    department: profileFromStorage?.department || "",
    organization: profileFromStorage?.organization || "",
    active: profileFromStorage?.active || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Maps to your backend LocalDateTime requirement if needed
    const payload = { 
      ...formData, 
      createdAt: initialData?.createdAt || new Date().toISOString() 
    };
    
    updateUserProfile(payload);

    navigate("/profile"); // Redirect to profile view after update
  };

  const inputClasses = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-400";
  const labelClasses = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        {/* Form Header */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Edit User Profile</h2>
            <p className="text-sm text-slate-500">Update your official work identity</p>
          </div>
          <div className={`h-3 w-3 rounded-full ${formData.active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></div>
        </div>

        <div className="p-8 space-y-8">
          {/* Section 1: Account Identity */}
          <section className="space-y-5">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              <span className="h-1 w-5 bg-blue-600 rounded-full"></span> Account Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelClasses}>Full Name</label>
                <User className="absolute left-3 top-[38px] text-slate-400" size={18} />
                <input 
                  name="username"
                  type="text" 
                  className={inputClasses}
                  placeholder="e.g. John Doe"
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="relative">
                <label className={labelClasses}>Official Email</label>
                <Mail className="absolute left-3 top-[38px] text-slate-400" size={18} />
                <input 
                  name="userOfficialEmail"
                  type="email" 
                  className={inputClasses}
                  placeholder="name@organization.com"
                  value={formData.userOfficialEmail}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </section>

          {/* Section 2: Professional Details */}
          <section className="space-y-5">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              <span className="h-1 w-5 bg-blue-600 rounded-full"></span> Professional Details
            </h3>

            <div className="space-y-6">
              <div className="relative">
                <label className={labelClasses}>Designation</label>
                <Briefcase className="absolute left-3 top-[38px] text-slate-400" size={18} />
                <input 
                  name="designation"
                  type="text" 
                  className={inputClasses}
                  placeholder="e.g. Senior Project Manager"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={labelClasses}>Department</label>
                  <Building2 className="absolute left-3 top-[38px] text-slate-400" size={18} />
                  <input 
                    name="department"
                    type="text" 
                    className={inputClasses}
                    placeholder="e.g. Engineering"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <label className={labelClasses}>Organization</label>
                  <Globe className="absolute left-3 top-[38px] text-slate-400" size={18} />
                  <input 
                    name="organization"
                    type="text" 
                    className={inputClasses}
                    placeholder="e.g. TechCorp Solutions"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Status */}
          <div className="pt-4 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <input 
              name="active"
              type="checkbox" 
              id="active-status"
              className="h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              checked={formData.active}
              onChange={handleChange}
            />
            <label htmlFor="active-status" className="text-sm font-semibold text-slate-700 cursor-pointer">
              Set account as Active
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            type="submit" 
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
          >
            <Save size={18} /> Save Profile
          </button>
          <button 
            type="button" 
            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
