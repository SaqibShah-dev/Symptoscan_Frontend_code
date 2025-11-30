// components/patientdashboard/AlertsTab.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";

const AlertsTab = () => {
  const [alerts, setAlerts] = useState([
    { message: "High blood pressure detected", type: "warning" },
    { message: "Lab results ready", type: "info" },
    { message: "Upcoming appointment tomorrow", type: "success" },
  ]);

  const typeStyles = {
    warning: {
      icon: <AlertTriangle size={24} />,
      bg: "bg-yellow-50 border-yellow-300 text-yellow-800",
    },
    info: {
      icon: <Info size={24} />,
      bg: "bg-blue-50 border-blue-300 text-blue-800",
    },
    success: {
      icon: <CheckCircle size={24} />,
      bg: "bg-green-50 border-green-300 text-green-800",
    },
  };

  const dismissAlert = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Alerts</h2>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, type: "spring" }}
            className={`flex items-center justify-between p-4 md:p-5 rounded-2xl shadow-md border ${typeStyles[alert.type].bg}`}
          >
            {/* Left section */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-inner">
                {typeStyles[alert.type].icon}
              </div>
              <p className="font-medium text-sm md:text-base">{alert.message}</p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => dismissAlert(index)}
              className="p-2 bg-white rounded-full shadow hover:shadow-lg transition active:scale-90"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </motion.div>
        ))}

        {/* No alerts message */}
        {alerts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-4"
          >
            No new alerts 🎉
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default AlertsTab;
