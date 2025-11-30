import { useState } from "react";
import API from "../../api/API";
import { Mail, Lock, User, Phone, Briefcase, Building2, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function DoctorAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    hospital: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    navigate("/doctor/dashboard");

    // try {
    //   if (isLogin) {
    //     const res = await API.post("/doctor/login", {
    //       email: form.email,
    //       password: form.password,
    //     });

    //     localStorage.setItem("doctor", JSON.stringify({ token: res.data.token }));
    //     toast.success("Logged in successfully!");
    //     navigate("/doctor/dashboard");

    //   } else {
    //     const formData = new FormData();
    //     Object.keys(form).forEach((key) => formData.append(key, form[key]));
    //     if (profilePic) formData.append("profilePic", profilePic);

    //     await API.post("/doctor/signup", formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });

    //     const res = await API.post("/doctor/login", {
    //       email: form.email,
    //       password: form.password,
    //     });

    //     localStorage.setItem("doctor", JSON.stringify({ token: res.data.token }));
    //     toast.success("Account created successfully!");
    //     navigate("/doctor/dashboard");
    //   }

    // } catch (err) {
    //   toast.error(err.response?.data?.msg || "Something went wrong!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-800">
      <Toaster />

      {/* LEFT HERO SECTION */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex flex-col max-w-lg mr-12"
      >
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
          Welcome Doctor
        </h1>

        <p className="text-white/90 text-lg mb-4">
          Manage patients, track symptoms, and offer consultations seamlessly with
          <span className="font-bold"> SymptoScan</span>.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="doctor"
          className="w-80 mt-6 drop-shadow-2xl animate-fade-in-up"
        />
      </motion.div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/30 backdrop-blur-xl p-8 md:p-10 border border-white/40 rounded-3xl shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl text-center font-extrabold mb-6 text-white drop-shadow-md">
          {isLogin ? "Doctor Login" : "Doctor Signup"}
        </h2>

        {/* PROFILE PICTURE */}
        {!isLogin && (
          <div className="flex justify-center mb-6">
            <label className="relative cursor-pointer group">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white/40 border-2 border-white flex items-center justify-center shadow-xl group-hover:bg-white/60 transition">
                  <Camera size={32} className="text-yellow-400" />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <FloatingInput
              icon={<User size={18} className="text-yellow-300" />}
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

          {!isLogin && (
            <>
              <FloatingInput
                icon={<Phone size={18} className="text-green-300" />}
                name="phone"
                value={form.phone}
                placeholder="Phone Number"
                onChange={handleChange}
              />

              <FloatingInput
                icon={<Briefcase size={18} className="text-purple-300" />}
                name="specialization"
                value={form.specialization}
                placeholder="Specialization (Cardiology, ENT, etc.)"
                onChange={handleChange}
              />

              <FloatingInput
                icon={<User size={18} className="text-pink-300" />}
                name="experience"
                value={form.experience}
                placeholder="Experience (Years)"
                onChange={handleChange}
              />

              <FloatingInput
                icon={<Building2 size={18} className="text-orange-300" />}
                name="hospital"
                value={form.hospital}
                placeholder="Hospital / Clinic Name"
                onChange={handleChange}
              />
            </>
          )}

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className={`w-full py-3 rounded-full text-gray-900 font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:brightness-110"
            }`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating Account..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </motion.button>
        </form>

        {/* SWITCH LOGIN/SIGNUP */}
        <p className="text-center mt-4 text-white/90 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {/* BACK ROLE */}
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

/* ---------------- REUSABLE FLOATING INPUT COMPONENT ---------------- */
function FloatingInput({ icon, name, placeholder, value, onChange, type = "text" }) {
  return (
    <motion.div
      whileFocus={{ scale: 1.02 }}
      className="flex items-center border border-white/40 rounded-xl p-3 bg-white/20 backdrop-blur-lg focus-within:ring-2 focus-within:ring-yellow-300 transition shadow hover:shadow-lg"
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






