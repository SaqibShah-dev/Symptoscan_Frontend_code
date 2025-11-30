// components/patientdashboard/HistoryTab.jsx
import React from "react";
import { motion } from "framer-motion";

const HistoryTab = () => {
  const history = [
    { date: "2025-11-01", type: "Appointment", details: "General checkup" },
    { date: "2025-11-10", type: "Lab Test", details: "Blood test" },
    { date: "2025-11-20", type: "Prescription", details: "Medication updated" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">History</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 font-medium text-gray-700">Type</th>
              <th className="px-6 py-3 font-medium text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map((h, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">{h.date}</td>
                <td className="px-6 py-3">{h.type}</td>
                <td className="px-6 py-3">{h.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default HistoryTab;
