import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scan, Activity, Stethoscope } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#B3E4FF] via-[#8EBBF3] to-[#1E3A8A]">

      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-5 bg-white/20 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-50">
        
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold text-white tracking-wide"
        >
          <span className="text-yellow-300">Sympto</span>Scan
        </motion.h1>

        {/* Get Started */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => navigate("/select-role")}
          className="bg-yellow-400 hover:bg-yellow-300 text-[#1E3A8A] font-semibold px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          Get Started
        </motion.button>
      </nav>



      {/* HERO SECTION */}
      <div className="flex flex-col items-center text-center px-6 md:px-20 mt-32">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight"
        >
          AI Disease Prediction for
          <span className="text-yellow-300"> Rural & Remote Areas</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-100 mt-6 max-w-2xl text-base md:text-xl leading-relaxed"
        >
          SymptoScan predicts diseases from X-rays and CT scans. It detects 
          <span className="font-semibold text-yellow-300"> lung infections, kidney stones</span>, and more — built specifically
          for rural clinics with limited specialist access.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => navigate("/select-role")}
          className="mt-8 bg-white text-[#1E3A8A] font-bold px-8 py-3 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        >
          Create an Account
        </motion.button>
      </div>




      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 px-8 md:px-20 pb-20">

        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="bg-white/80 p-8 rounded-3xl shadow-xl text-center backdrop-blur-lg cursor-pointer"
        >
          <Scan className="w-20 h-20 mx-auto mb-4 text-[#1E3A8A] animate-bounce" />
          <h3 className="text-2xl font-bold text-[#1E3A8A]">X-Ray & CT-Scan AI</h3>
          <p className="text-gray-700 mt-3">
            Upload scans and get instant AI-based diagnosis.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="bg-white/80 p-8 rounded-3xl shadow-xl text-center backdrop-blur-lg cursor-pointer"
        >
          <Activity className="w-20 h-20 mx-auto mb-4 text-[#1E3A8A] animate-pulse" />
          <h3 className="text-2xl font-bold text-[#1E3A8A]">Lungs & Stones Detection</h3>
          <p className="text-gray-700 mt-3">
            Detect pneumonia, TB, kidney & gallbladder stones.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="bg-white/80 p-8 rounded-3xl shadow-xl text-center backdrop-blur-lg cursor-pointer"
        >
          <Stethoscope className="w-20 h-20 mx-auto mb-4 text-[#1E3A8A] animate-[float_3s_ease-in-out_infinite]" />
          <h3 className="text-2xl font-bold text-[#1E3A8A]">Doctor Chatbot</h3>
          <p className="text-gray-700 mt-3">
            Chat with doctors remotely and get instant advice.
          </p>
        </motion.div>
      </div>



      {/* FOOTER */}
      <footer className="bg-[#0F274A] text-gray-300 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h4 className="text-xl font-bold text-yellow-300">SymptoScan</h4>
            <p className="text-gray-400 mt-3">
              Providing AI-powered diagnostic support to rural and remote areas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-yellow-300 cursor-pointer">Features</li>
              <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
              <li
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => navigate("/select-role")}
              >
                Login
              </li>
              <li
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">© {new Date().getFullYear()} SymptoScan</p>
            <p className="text-gray-500">All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
