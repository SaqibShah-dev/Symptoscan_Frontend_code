import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function AlertMessage({ type, message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // wait for fade-out before removing
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium
      transform transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {/* Icon */}
      {type === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      <span>{message}</span>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-white/60 rounded-full"
        style={{
          width: "100%",
          animation: "progress 4s linear forwards",
        }}
      ></div>

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
