// Sidebar.jsx
import { useState } from "react";
import { Activity, Heart, Droplet, Zap, MessageSquare } from "lucide-react"; // Added MessageSquare for telemedicine

export default function Sidebar({ onSelect }) {
  const diseases = [
    { key: "lung_diseases", label: "Lung Diseases", icon: Activity },
    { key: "kidney", label: "Kidney Diseases", icon: Droplet },
    { key: "risk_scoring", label: "Risk-Scoring", icon: Zap }, // Added diabetes
    { key: "telemedicine", label: "Telemedicine", icon: MessageSquare },
  ];

  const [active, setActive] = useState("");

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-lg min-h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">Disease Predictions</h2>
        <ul className="space-y-2">
          {diseases.map(({ key, label, icon: Icon }) => (
            <li
              key={key}
              onClick={() => {
                setActive(key);
                onSelect(key);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                active === key
                  ? "bg-white text-indigo-600 font-semibold shadow-md"
                  : "hover:bg-indigo-500 hover:bg-opacity-50"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-6 text-sm text-indigo-100">
        <p>© 2025 SymptoScan</p>
      </div>
    </aside>
  );
}
