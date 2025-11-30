import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Stethoscope, UserRound } from "lucide-react";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role); // save role
    navigate(role === "doctor" ? "/doctor/auth" : "/patient/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B3E4FF] via-[#8EBBF3] to-[#1E3A8A] flex flex-col items-center justify-center px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl text-center mb-8"
      >
        Select Your Role
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Doctor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.12, rotateX: 8, rotateY: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          onClick={() => selectRole("doctor")}
          className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl text-center flex flex-col items-center"
        >
          <div className="bg-yellow-400/20 p-6 rounded-full border border-yellow-300/40 shadow-lg">
            <Stethoscope className="w-16 h-16 text-yellow-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mt-6">Doctor</h2>
          <p className="text-white/80 mt-2">Login or create a doctor account</p>
        </motion.div>

        {/* Patient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.12, rotateX: 8, rotateY: 8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          onClick={() => selectRole("patient")}
          className="cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl text-center flex flex-col items-center"
        >
          <div className="bg-cyan-400/20 p-6 rounded-full border border-cyan-300/40 shadow-lg">
            <UserRound className="w-16 h-16 text-cyan-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mt-6">Patient</h2>
          <p className="text-white/80 mt-2">Login or create a patient account</p>
        </motion.div>
      </div>
    </div>
  );
}
