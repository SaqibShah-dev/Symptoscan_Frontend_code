// import React, { useState } from "react";
// import API from "../../api/API";
// import AlertMessage from "./AlertMessage";
// import { HeartPulse } from "lucide-react";

// export default function HeartRisk() {
//   const [formData, setFormData] = useState({
//     age: "",
//     chol: "",
//     bp: "",
//     smoking: "",
//     diabetes: "",
//     familyHistory: "",
//   });

//   const [risk, setRisk] = useState(null);
//   const [level, setLevel] = useState("");
//   const [interpretation, setInterpretation] = useState("");
//   const [progressColor, setProgressColor] = useState("");
//   const [showResults, setShowResults] = useState(false);
//   const [alert, setAlert] = useState({ type: "", message: "" });

//   const gradient = "from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A]";

//   const showAlert = (type, message) => setAlert({ type, message });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const calculateRisk = async (e) => {
//     e.preventDefault();
//     try {
//       const age = parseInt(formData.age);
//       const chol = parseInt(formData.chol);
//       const bp = parseInt(formData.bp);

//       if (
//         isNaN(age) ||
//         isNaN(chol) ||
//         isNaN(bp) ||
//         !formData.smoking ||
//         !formData.diabetes ||
//         !formData.familyHistory
//       ) {
//         showAlert("error", "Please fill in all fields correctly.");
//         return;
//       }

//       const payload = {
//         age,
//         chol,
//         bp,
//         smoking: formData.smoking === "yes" ? 1 : 0,
//         diabetes: formData.diabetes === "yes" ? 1 : 0,
//         familyHistory: formData.familyHistory === "yes" ? 1 : 0,
//       };

//       setShowResults(false);
//       const res = await API.post("/heart/predict", payload);

//       if (res.data.error) {
//         showAlert("error", res.data.error);
//         return;
//       }

//       const { risk, level, interpretation } = res.data;

//       setRisk(risk);
//       setLevel(level);
//       setInterpretation(interpretation);

//       if (risk < 30) setProgressColor("text-green-500");
//       else if (risk < 60) setProgressColor("text-yellow-500");
//       else setProgressColor("text-red-500");

//       setShowResults(true);
//     } catch (err) {
//       console.error(err);
//       showAlert("error", "Failed to calculate risk. Check server or network.");
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       age: "",
//       chol: "",
//       bp: "",
//       smoking: "",
//       diabetes: "",
//       familyHistory: "",
//     });
//     setRisk(null);
//     setLevel("");
//     setInterpretation("");
//     setProgressColor("");
//     setShowResults(false);
//     setAlert({ type: "", message: "" });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200">
//       {/* Alert Message */}
//       {alert.message && (
//         <AlertMessage
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert({ type: "", message: "" })}
//         />
//       )}

//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md mb-3 bg-gradient-to-r ${gradient} text-white`}>
//           <HeartPulse size={28} />
//         </div>
//         <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
//           Heart Risk Assessment
//         </h1>
//         <p className="text-gray-600 text-sm">
//           Evaluate your heart health using AI-powered predictions.
//         </p>
//       </div>

//       {/* Form Section */}
//       {!showResults ? (
//         <form onSubmit={calculateRisk} className="space-y-6">
//           <div className="grid sm:grid-cols-2 gap-6">
//             {[
//               { name: "age", label: "Age (years)", type: "number", min: 18, max: 100 },
//               { name: "chol", label: "Cholesterol (mg/dL)", type: "number", min: 100, max: 400 },
//               { name: "bp", label: "Blood Pressure (mmHg)", type: "number", min: 70, max: 200 },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label className="font-semibold text-gray-700 block mb-1">{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   min={field.min}
//                   max={field.max}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B3E4FF]"
//                   placeholder={`Enter ${field.label.toLowerCase()}`}
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Yes/No Questions */}
//           <div className="space-y-4">
//             {[
//               { name: "smoking", label: "Do you smoke?" },
//               { name: "diabetes", label: "Do you have diabetes?" },
//               { name: "familyHistory", label: "Family history of heart disease?" },
//             ].map((q) => (
//               <div key={q.name}>
//                 <label className="font-semibold text-gray-700 block mb-2">{q.label}</label>
//                 <div className="flex gap-6 text-gray-700">
//                   {["yes", "no"].map((opt) => (
//                     <label key={opt} className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name={q.name}
//                         value={opt}
//                         onChange={handleChange}
//                         checked={formData[q.name] === opt}
//                         className="accent-[#B3E4FF]"
//                       />
//                       {opt.charAt(0).toUpperCase() + opt.slice(1)}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r ${gradient} hover:scale-105 transition-transform shadow-md`}
//           >
//             Calculate Risk →
//           </button>
//         </form>
//       ) : (
//         <div className="mt-6 space-y-6">
//           {/* Results Section */}
//           <div className="flex flex-col items-center">
//             <div className="relative w-32 h-32 flex items-center justify-center">
//               <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
//                 <circle
//                   cx="50%"
//                   cy="50%"
//                   r="45"
//                   stroke="#e5e7eb"
//                   strokeWidth="10"
//                   fill="transparent"
//                 />
//                 <circle
//                   cx="50%"
//                   cy="50%"
//                   r="45"
//                   stroke="currentColor"
//                   strokeWidth="10"
//                   fill="transparent"
//                   className={progressColor}
//                   strokeDasharray={`${risk * 2.83} 283`}
//                 />
//               </svg>
//               <div className={`text-3xl font-bold ${progressColor}`}>{risk}%</div>
//             </div>
//             <p className="text-gray-700 mt-2 font-semibold">{level}</p>
//           </div>

//           {/* Interpretation Box */}
//           <div
//             className={`p-4 rounded-lg mb-6 border-l-4 ${
//               level.includes("Low")
//                 ? "bg-green-50 border-green-500"
//                 : level.includes("Moderate")
//                 ? "bg-yellow-50 border-yellow-400"
//                 : "bg-red-50 border-red-500"
//             }`}
//           >
//             <p className="text-gray-700">
//               <strong>{level} Risk:</strong> {interpretation}
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 flex-wrap">
//             <button
//               onClick={resetForm}
//               className="flex-1 bg-gray-500 text-white py-2.5 rounded-lg hover:bg-gray-600 transition"
//             >
//               Start Over
//             </button>
//             <button
//               onClick={() => window.print()}
//               className={`flex-1 py-2.5 rounded-lg text-white bg-gradient-to-r ${gradient} hover:scale-105 transition-transform`}
//             >
//               Print Results
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import API from "../../api/API";
import AlertMessage from "./AlertMessage";
import { HeartPulse, Activity, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function HeartRisk() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "1", // 1 = male, 2 = female
    height: "",
    weight: "",
    ap_hi: "", // Systolic BP
    ap_lo: "", // Diastolic BP
    cholesterol: "1", // 1=normal,2=above,3=well above
    gluc: "1", // 1=normal,2=above,3=well above
    smoke: "0", // 0=no,1=yes
    alco: "0", // 0=no,1=yes
    active: "1", // 0=no,1=yes
  });

  const [risk, setRisk] = useState(null);
  const [level, setLevel] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [progressColor, setProgressColor] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert = (type, message) => setAlert({ type, message });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateRisk = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      const requiredFields = ['age', 'height', 'weight', 'ap_hi', 'ap_lo'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        showAlert("error", "Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // Convert to proper data types
      const payload = {
        age: parseInt(formData.age),
        gender: parseInt(formData.gender),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        ap_hi: parseInt(formData.ap_hi),
        ap_lo: parseInt(formData.ap_lo),
        cholesterol: parseInt(formData.cholesterol),
        gluc: parseInt(formData.gluc),
        smoke: parseInt(formData.smoke),
        alco: parseInt(formData.alco),
        active: parseInt(formData.active)
      };

      console.log("Sending heart risk assessment request:", payload);
      
      // Use the correct API endpoint
      const res = await API.post("/api/heart_riskscoring/predict", payload);
      console.log("Heart risk response:", res.data);

      if (res.data.error) {
        showAlert("error", res.data.error);
        return;
      }

      const { risk_probability, risk_label } = res.data;
      
      setRisk(risk_probability);
      setLevel(risk_label);
      
      // Set interpretation based on risk level
      if (risk_label === "Low Risk") {
        setInterpretation("Your heart health appears to be in good condition. Continue maintaining a healthy lifestyle with regular exercise and a balanced diet.");
        setProgressColor("text-green-500");
      } else if (risk_label === "Medium Risk") {
        setInterpretation("You have some risk factors for heart disease. Consider making lifestyle changes and consult with a healthcare provider for further evaluation.");
        setProgressColor("text-yellow-500");
      } else {
        setInterpretation("You have significant risk factors for heart disease. It's important to consult with a healthcare provider as soon as possible to discuss prevention strategies.");
        setProgressColor("text-red-500");
      }

      setShowResults(true);
    } catch (err) {
      console.error("Heart risk assessment error:", err);
      showAlert("error", "Failed to calculate risk. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "1",
      height: "",
      weight: "",
      ap_hi: "",
      ap_lo: "",
      cholesterol: "1",
      gluc: "1",
      smoke: "0",
      alco: "0",
      active: "1",
    });
    setRisk(null);
    setLevel("");
    setInterpretation("");
    setProgressColor("");
    setShowResults(false);
    setAlert({ type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Alert Message */}
        {alert.message && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: "", message: "" })}
          />
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg mb-4">
            <HeartPulse size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Heart Risk Assessment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evaluate your heart health using AI-powered predictions based on your medical parameters
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {!showResults ? (
            <div className="p-8">
              <form onSubmit={calculateRisk} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Info size={20} className="text-blue-500" />
                    Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        name="age"
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        min="100"
                        max="250"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your height"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        min="30"
                        max="200"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your weight"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Activity size={20} className="text-red-500" />
                    Blood Pressure
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Systolic BP (mmHg)
                      </label>
                      <input
                        type="number"
                        name="ap_hi"
                        min="70"
                        max="250"
                        value={formData.ap_hi}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter systolic BP"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diastolic BP (mmHg)
                      </label>
                      <input
                        type="number"
                        name="ap_lo"
                        min="40"
                        max="150"
                        value={formData.ap_lo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter diastolic BP"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Health Indicators */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-yellow-500" />
                    Health Indicators
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cholesterol Level
                      </label>
                      <select
                        name="cholesterol"
                        value={formData.cholesterol}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Glucose Level
                      </label>
                      <select
                        name="gluc"
                        value={formData.gluc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1">Normal</option>
                        <option value="2">Above Normal</option>
                        <option value="3">Well Above Normal</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Factors */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    Lifestyle Factors
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you smoke?
                      </label>
                      <select
                        name="smoke"
                        value={formData.smoke}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you consume alcohol?
                      </label>
                      <select
                        name="alco"
                        value={formData.alco}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Are you physically active?
                      </label>
                      <select
                        name="active"
                        value={formData.active}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </>
                    ) : (
                      "Calculate Heart Risk"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8">
              {/* Results Section */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Heart Risk Assessment</h2>
                <p className="text-gray-600">Completed on {new Date().toLocaleString()}</p>
              </div>

              {/* Risk Percentage Circle */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="80"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className={progressColor}
                      strokeDasharray={`${risk * 5.02} 502`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${progressColor}`}>{risk}%</div>
                    <div className={`text-lg font-semibold ${progressColor}`}>{level}</div>
                  </div>
                </div>
              </div>

              {/* Interpretation Box */}
              <div
                className={`p-6 rounded-lg mb-8 border-l-4 ${
                  level === "Low Risk"
                    ? "bg-green-50 border-green-500"
                    : level === "Medium Risk"
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-red-50 border-red-500"
                }`}
              >
                <p className="text-gray-700">
                  {interpretation}
                </p>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-600 mt-0.5" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Medical Disclaimer</p>
                    <p>
                      This assessment is for informational purposes only and should not replace professional medical advice. 
                      Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Start Over
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Print Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}