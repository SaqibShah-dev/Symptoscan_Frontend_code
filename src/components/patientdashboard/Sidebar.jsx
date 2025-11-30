import React from "react";
import { motion } from "framer-motion";
import { Home, User, Bell, Activity, Menu } from "lucide-react";

const Sidebar = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  navigate,
}) => {
  const sidebarItems = [
    { name: "Dashboard", icon: Home, key: "dashboard" },
    { name: "Profile", icon: User, key: "profile" },
    { name: "Alerts", icon: Bell, key: "alerts" },
    { name: "History", icon: Activity, key: "history" },
  ];

  // Get Patient Data
  const patient = JSON.parse(localStorage.getItem("patient")) || {
    name: "Patient",
    email: "unknown@example.com",
  };

  const initials =
    patient?.name
      ?.split(" ")
      ?.map((n) => n[0]?.toUpperCase())
      ?.join("") || "P";

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isSidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed md:relative z-50 bg-[#0A1A2F] 
      bg-opacity-95 backdrop-blur-xl 
      w-64 h-full flex flex-col shadow-2xl 
      border-r border-white/10"
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <h1
          className="text-2xl font-extrabold cursor-pointer text-white tracking-wide"
          onClick={() => navigate("/")}
        >
          SymptoScan <span className="text-cyan-300">AI</span>
        </h1>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg bg-white/10 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center text-center py-6 border-b border-white/10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600
          flex items-center justify-center text-white font-bold text-3xl shadow-lg">
          {initials}
        </div>

        <p className="mt-3 text-white font-semibold text-lg">{patient.name}</p>
        <p className="text-white/60 text-sm">{patient.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-3 overflow-y-auto">
        {sidebarItems.map((item) => (
          <motion.div
            key={item.key}
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(item.key)}
            className={`relative flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200
              ${
                activeTab === item.key
                  ? "bg-white/20 text-white font-semibold shadow-lg"
                  : "text-white/70 hover:bg-white/10"
              }
            `}
          >
            <item.icon size={20} className="mr-3" />
            <span>{item.name}</span>

            {activeTab === item.key && (
              <motion.span
                layoutId="activeIndicator"
                className="absolute left-0 top-0 h-full w-1 bg-cyan-300 rounded-r-lg"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={() => {
            localStorage.removeItem("patient");
            navigate("/patient/login");
          }}
          className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 
          py-3 rounded-xl font-semibold transition flex justify-center items-center gap-2"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
