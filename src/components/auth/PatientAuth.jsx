import { useState } from "react";
import API from "../../api/API";
import { Mail, Lock, User, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function PatientAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    navigate("/patient/dashboard");

    // try {
    //   if (isLogin) {
    //     const res = await API.post("/patient/login", {
    //       email: form.email,
    //       password: form.password,
    //     });

    //     localStorage.setItem(
    //       "patient",
    //       JSON.stringify({
    //         username: res.data.username,
    //         email: res.data.email,
    //         image: res.data.image,
    //         token: res.data.token,
    //       })
    //     );

    //     toast.success("Logged in successfully!");
    //     navigate("/patient/dashboard");
    //   } else {
    //     const formData = new FormData();
    //     formData.append("username", form.username);
    //     formData.append("email", form.email);
    //     formData.append("password", form.password);
    //     if (form.image) formData.append("image", form.image);

    //     await API.post("/patient/signup", formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });

    //     // Auto login after signup
    //     const res = await API.post("/patient/login", {
    //       email: form.email,
    //       password: form.password,
    //     });

    //     localStorage.setItem(
    //       "patient",
    //       JSON.stringify({
    //         username: res.data.username,
    //         email: res.data.email,
    //         image: res.data.image,
    //         token: res.data.token,
    //       })
    //     );

    //     toast.success("Account created successfully!");
    //     navigate("/patient/dashboard");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error(
    //     err.response?.data?.msg || (isLogin ? "Login failed" : "Signup failed")
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#B3E4FF] via-[#8EBBF3] to-[#1E3A8A] px-6 py-10">
      <Toaster position="top-right" />

      {/* LEFT HERO */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex flex-col justify-center max-w-lg mr-10"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
          Welcome Patient
        </h1>
        <p className="text-white/90 text-lg">
          Track your health, check symptoms, and connect with doctors easily on{" "}
          <span className="font-bold">SymptoScan</span>.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          alt="patient"
          className="w-80 mt-6 drop-shadow-2xl animate-fade-in-up"
        />
      </motion.div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/30 backdrop-blur-xl p-8 md:p-10 border border-white/30 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl text-center font-extrabold mb-6 text-white drop-shadow-md">
          {isLogin ? "Patient Login" : "Patient Signup"}
        </h2>

        {/* PROFILE IMAGE UPLOAD */}
        {!isLogin && (
          <div className="flex justify-center mb-6">
            <label className="relative cursor-pointer group">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white/30 border-2 border-white flex items-center justify-center shadow-lg group-hover:bg-white/50 transition">
                  <Camera size={32} className="text-cyan-400" />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <FloatingInput
              icon={<User size={18} className="text-cyan-300" />}
              name="username"
              value={form.username}
              placeholder="Full Name"
              onChange={handleChange}
            />
          )}

          <FloatingInput
            icon={<Mail size={18} className="text-cyan-300" />}
            name="email"
            type="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
          />

          <FloatingInput
            icon={<Lock size={18} className="text-indigo-300" />}
            name="password"
            type="password"
            value={form.password}
            placeholder={isLogin ? "Your Password" : "Create Password"}
            onChange={handleChange}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className={`w-full py-3 rounded-full text-gray-900 font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
            }`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </motion.button>
        </form>

        {/* SWITCH LOGIN/SIGNUP */}
        <p className="text-center mt-4 text-white/80 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-cyan-300 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {/* BACK */}
        {Role && (
          <p
            onClick={() => {
              localStorage.removeItem("role");
              navigate("/select-role");
            }}
            className="text-center mt-4 text-white/70 hover:underline cursor-pointer"
          >
            ← Back to role selection
          </p>
        )}
      </motion.div>
    </div>
  );
}

/* ---------------- REUSABLE FLOATING INPUT ---------------- */
function FloatingInput({ icon, name, placeholder, value, onChange, type = "text" }) {
  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className="flex items-center border border-white/40 rounded-xl p-3 bg-white/20 backdrop-blur-lg focus-within:ring-2 focus-within:ring-cyan-300 transition shadow hover:shadow-lg"
    >
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full ml-2 bg-transparent outline-none text-white placeholder-white/70"
      />
    </motion.div>
  );
}
