import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, Bell, Activity, Settings, LogOut, Menu, X } from "lucide-react";

import DashboardTab from "../components/patientdashboard/DashboardTab";
import ProfileTab from "../components/patientdashboard/ProfileTab";
import AlertsTab from "../components/patientdashboard/AlertsTab";
import HistoryTab from "../components/patientdashboard/HistoryTab";

const sidebarItems = [
  { name: "Dashboard", icon: Home, key: "dashboard" },
  { name: "Profile", icon: User, key: "profile" },
  { name: "Alerts", icon: Bell, key: "alerts" },
  { name: "History", icon: Activity, key: "history" },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const patient = {
    username: "John Doe",
    role: "Patient",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  const handleLogout = () => {
    localStorage.removeItem("patient");
    navigate("/patient/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A] text-white flex flex-col z-30 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/20">
          <h1
            className="text-2xl font-extrabold cursor-pointer"
            onClick={() => navigate("/")}
          >
            SymptoScan <span className="text-yellow-300">AI</span>
          </h1>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <motion.div
              key={item.key}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors
                ${activeTab === item.key ? "bg-white/20 font-semibold" : "hover:bg-white/10"}
              `}
              onClick={() => {
                setActiveTab(item.key);
                setIsSidebarOpen(false); // close sidebar on mobile
              }}
            >
              <item.icon size={20} className="mr-3" />
              <span>{item.name}</span>
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">

        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={patient.image}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                alt="patient"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-semibold">{patient.username}</span>
                <span className="text-xs text-gray-500">{patient.role}</span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white w-48 rounded-xl shadow-lg border py-2 z-50">
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100">
                  <User size={16} /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-gray-50">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "alerts" && <AlertsTab />}
          {activeTab === "history" && <HistoryTab />}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;



