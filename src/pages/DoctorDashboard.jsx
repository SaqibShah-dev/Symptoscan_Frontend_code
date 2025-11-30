import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  User,
  Stethoscope,
  Brain,
  Activity,
  FileText,
  MessageSquare,
  ArrowLeftCircle,
} from "lucide-react";

import KidneyAnalysis from "../components/disease/KidneyCTAnalysis";
import ChestXrayAnalyzer from "../components/disease/ChestXrayAnalyzer";
import RiskScoring from "../components/disease/RiskScoring";
import PrescriptionOCR from "../components/disease/PrescriptionOCR";
import RAGAssistant from "../components/disease/RAGAssistant";
import Telemedicine from "../telemedicine/Telemedicine";

export default function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const doctor = {
    username: "Dr. Saqib",
    role: "Medical Specialist",
    image: "https://cdn-icons-png.flaticon.com/512/3870/3870822.png",
  };

  const modules = [
    { key: "kidney", title: "Kidney CT", icon: <Activity size={18} /> },
    { key: "lung_diseases", title: "Chest X-Ray", icon: <Brain size={18} /> },
    {
      key: "prescription_ocr",
      title: "Prescription OCR",
      icon: <FileText size={18} />,
    },
    {
      key: "risk_scoring",
      title: "Risk Scoring",
      icon: <Activity size={18} />,
    },
    { key: "rag", title: "Ask MedGPT", icon: <MessageSquare size={18} /> },
    {
      key: "telemedicine",
      title: "Telemedicine",
      icon: <MessageSquare size={18} />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ----- Overlay for mobile ----- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ----- Sidebar ----- */}
      {/* <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-30 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">SymptoScan</h1>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="px-4 py-4 overflow-y-auto">
          <h3 className="text-xs text-gray-400 uppercase mb-3">Modules</h3>

          {modules.map((mod) => (
            <button
              key={mod.key}
              onClick={() => {
                setSelectedModule(mod.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 text-gray-700 rounded-lg transition-all
              hover:bg-blue-50 hover:text-blue-700
              ${selectedModule === mod.key ? "bg-blue-100 font-semibold text-blue-700" : ""}`}
            >
              {mod.icon}
              {mod.title}
            </button>
          ))}
        </nav>

        <div className="px-4 pb-4">
          <button className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside> */}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A] text-white shadow-2xl z-30 transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={() => setSelectedModule("")}
            >
              SymptoScan <span className="text-yellow-300">AI</span>
            </h1>
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/20 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="px-4 py-4 overflow-y-auto space-y-2">
          {modules.map((mod) => (
            <button
              key={mod.key}
              onClick={() => {
                setSelectedModule(mod.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
        ${
          selectedModule === mod.key
            ? "bg-white/30 text-white font-semibold shadow-lg"
            : "text-white/80 hover:bg-white/20"
        }`}
            >
              {mod.icon}
              <span className="text-sm font-medium">{mod.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ----- Main Screen ----- */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* ----- Header ----- */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* MENU button for mobile only */}
            {!selectedModule && (
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src={doctor.image}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                  alt="doctor"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-semibold">
                    {doctor.username}
                  </span>
                  <span className="text-xs text-gray-500">{doctor.role}</span>
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
                  <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 text-red-600">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ----- Back to Dashboard (below header) ----- */}
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white shadow-sm mx-4 mt-4 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedModule("")}
          >
            <ArrowLeftCircle size={22} className="text-blue-600" />
            <span className="font-medium text-blue-700">Back to Dashboard</span>
          </motion.div>
        )}

        {/* ----- Content Area ----- */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Welcome Screen */}
          {!selectedModule ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-10"
            >
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                Welcome to SymptoScan
              </h1>
              <p className="text-gray-600 text-lg max-w-lg mx-auto">
                Choose a module from the left to begin diagnosing or analyzing
                patient data.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModule}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {selectedModule === "kidney" && <KidneyAnalysis />}
                {selectedModule === "lung_diseases" && <ChestXrayAnalyzer />}
                {selectedModule === "prescription_ocr" && <PrescriptionOCR />}
                {selectedModule === "risk_scoring" && <RiskScoring />}
                {selectedModule === "rag" && <RAGAssistant />}
                {selectedModule === "telemedicine" && <Telemedicine />}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
