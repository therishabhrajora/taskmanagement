import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/userApi";

export default function UserProfile({ profileData }) {
  const navigate = useNavigate();
  const profileFromStorage = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null;

  const fetchProfile = async () => {
    const res = await getAllUsers();
    const CurrUser = res.filter(
      (u) => u.userOfficialEmail === profileFromStorage?.userOfficialEmail,
    );
    setProfile(CurrUser[0]);
  };

  

  useEffect(() => {
    fetchProfile();
  }, []);
  const uiavtar = `https://ui-avatars.com/api/?name=${profileFromStorage?.username}&background=0D8ABC&color=fff&size=128`;

  const [profile, setProfile] = useState(
    profileData || {
      username: profileFromStorage?.username,
      userOfficialEmail: profileFromStorage?.userOfficialEmail,
      designation: profileFromStorage?.designation || "",
      department: profileFromStorage?.department || "",
      organization: profileFromStorage?.organization || "",
      createdAt: profileFromStorage?.createdAt || new Date().toISOString(),
      active: true,
    },
  );
  console.log("Profile data from props:", profile);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-8 pb-10">
            <div className="relative flex flex-col md:flex-row md:items-end -mt-16 gap-6">
              {/* Avatar */}
              <div className="h-32 w-32 rounded-3xl border-8 border-white bg-slate-100 shadow-xl overflow-hidden">
                <img
                  src={uiavtar}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold capitalize text-slate-900">
                    {profile.username}
                  </h1>
                  {profile.active && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <ShieldCheck size={12} /> Active
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-medium text-lg">
                  {profile.designation}
                </p>
              </div>

              <div
                className="flex gap-3 mb-2"
                onClick={() => navigate("/update-profile")}
              >
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact & Basics */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  Account Details
                </h3>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Official Email
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {profile.userOfficialEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Member Since
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                  Work Information
                </h3>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Organization
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {profile.organization}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Department
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {profile.department}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats / History Placeholder */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatMini label="Tasks Completed" value="24" color="blue" />
          <StatMini label="Active Projects" value="3" color="indigo" />
          <StatMini label="Productivity" value="92%" color="emerald" />
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
      <span className="text-xs font-bold text-slate-400 uppercase mb-1">
        {label}
      </span>
      <span className={`text-2xl font-black ${colors[color].split(" ")[0]}`}>
        {value}
      </span>
    </div>
  );
}
