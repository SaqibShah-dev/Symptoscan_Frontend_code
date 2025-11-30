import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import RiskScoring from "../disease/RiskScoring";

const DashboardTab = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 w-full">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome Back!</h2>
        <p className="text-gray-600">
          Here’s a quick overview of your health and recent activity.
        </p>
      </motion.div>

      {/* Doctor Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800">Find a Doctor</h3>

        <div className="relative">
          <input
            type="text"
            placeholder="Search specialists, doctors, hospitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 bg-gray-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={20} className="absolute left-4 top-4 text-gray-500" />
        </div>
      </motion.div>

      {/* Risk Scoring Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 transform transition hover:shadow-xl hover:scale-[1.02]"
      >
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
          Health Risk Assessment
        </h3>
        <RiskScoring />
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Appointments", value: 5 },
          { title: "Alerts", value: 2 },
          { title: "Completed Tests", value: 12 },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * index }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border border-gray-200 text-center"
          >
            <p className="text-gray-400">{stat.title}</p>
            <p className="text-3xl font-bold mt-2 text-gray-800">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTab;
