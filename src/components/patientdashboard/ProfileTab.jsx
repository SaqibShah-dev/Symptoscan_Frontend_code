import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProfileTab = () => {
  const storedPatient = JSON.parse(localStorage.getItem("patient")) || {
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    age: 28,
  };

  const [profile] = useState(storedPatient);

  const initials =
    profile?.name
      ?.split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("") || "P";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-800">Profile</h2>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-xl shadow-lg rounded-3xl p-6 md:p-10 
        border border-gray-200 space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600
            flex items-center justify-center text-white font-bold text-4xl shadow-xl">
            {initials}
          </div>

          {/* Name + Email */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
            <p className="text-gray-500 text-sm">{profile.email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Detail label="Name" value={profile.name} />
          <Detail label="Email" value={profile.email} />
          <Detail label="Age" value={profile.age} />
          <Detail label="Gender" value={profile.gender} />
        </div>

        {/* Edit Button */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 text-white font-semibold 
            py-3 px-6 rounded-xl w-full md:w-auto shadow-md"
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Reusable Detail Component
const Detail = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <p className="text-gray-800 font-semibold mt-1">{value}</p>
  </div>
);

export default ProfileTab;
