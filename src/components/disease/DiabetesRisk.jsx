

// import React, { useState } from "react";
// import { Activity, HeartPulse, Droplets, Gauge, Pill } from "lucide-react";
// import API from "../../api/API";
// import AlertMessage from "./AlertMessage";

// const DiabetesRisk = () => {
//   const [formData, setFormData] = useState({
//     age: "",
//     sex: "",
//     bmi: "",
//     bp: "",
//     glucose: "",
//     insulin: "",
//   });

//   const [risk, setRisk] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState(null);

//   const gradient = "from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A]";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlert(null);
//     setRisk(null);
//     const patient = JSON.parse(localStorage.getItem("patient"));

//     try {
//       const response = await API.post(
//         "/diabetes/predict",
//         {
//           patientId: patient._id,
//           age: parseFloat(formData.age),
//           sex: parseFloat(formData.sex),
//           bmi: parseFloat(formData.bmi),
//           bp: parseFloat(formData.bp),
//           glucose: parseFloat(formData.glucose),
//           insulin: parseFloat(formData.insulin),
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setRisk(response.data.prediction);
//       setAlert({
//         type: "success",
//         text: `Prediction: ${response.data.prediction}`,
//       });
//     } catch (error) {
//       console.error(error);
//       setAlert({
//         type: "error",
//         text:
//           error.response?.data?.message ||
//           "Error predicting diabetes. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       age: "",
//       sex: "",
//       bmi: "",
//       bp: "",
//       glucose: "",
//       insulin: "",
//     });
//     setRisk(null);
//     setAlert(null);
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-12 px-6 sm:px-10 py-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-xl rounded-3xl animate-fadeIn">
//       {/* Header */}
//       <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#B3E4FF]">
//         Diabetes Risk Predictor
//       </h2>
//       <p className="text-center text-gray-600 mb-6">
//         Enter your health details below to estimate your diabetes risk.
//       </p>

//       {/* Alert */}
//       {alert && (
//         <div className="mb-4">
//           <AlertMessage type={alert.type} text={alert.text} />
//         </div>
//       )}

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 sm:grid-cols-2 gap-5"
//       >
//         {[
//           { name: "age", icon: Activity, placeholder: "Age" },
//           {
//             name: "sex",
//             icon: HeartPulse,
//             placeholder: "Gender",
//             type: "select",
//             options: ["Male", "Female"],
//           },
//           { name: "bmi", icon: Gauge, placeholder: "BMI" },
//           { name: "bp", icon: HeartPulse, placeholder: "Blood Pressure" },
//           { name: "glucose", icon: Droplets, placeholder: "Glucose Level" },
//           { name: "insulin", icon: Pill, placeholder: "Insulin Level" },
//         ].map((field) => (
//           <div
//             key={field.name}
//             className={`flex items-center gap-3 border border-gray-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#B3E4FF] bg-white transition-all hover:shadow-md`}
//           >
//             <field.icon className="text-[#2563EB]" />
//             {field.type === "select" ? (
//               <select
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="w-full outline-none bg-transparent"
//                 required
//               >
//                 <option value="">Select {field.placeholder}</option>
//                 {field.options.map((opt, idx) => (
//                   <option key={idx} value={idx === 0 ? 1 : 0}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type="number"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="w-full outline-none bg-transparent"
//                 required
//               />
//             )}
//           </div>
//         ))}

//         {/* Buttons */}
//         <div className="col-span-full flex flex-col sm:flex-row gap-3 mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${gradient} hover:scale-105 transition-transform disabled:opacity-50`}
//           >
//             {loading ? "Predicting..." : "Predict Risk"}
//           </button>

//           <button
//             type="button"
//             onClick={handleReset}
//             className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
//           >
//             Reset
//           </button>
//         </div>
//       </form>

//       {/* Prediction Result */}
//       {risk && (
//         <div className="col-span-full mt-8 bg-white rounded-2xl shadow-inner p-6 text-center animate-fadeIn">
//           <h3 className="text-xl font-bold text-gray-800 mb-3">
//             Prediction Result
//           </h3>
//           <div
//             className={`text-4xl font-extrabold ${
//               risk === "Diabetic" ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {risk}
//           </div>

//           <div className="w-full bg-gray-200 rounded-full h-3 mt-4 mb-2">
//             <div
//               className={`h-3 rounded-full transition-all ${
//                 risk === "Diabetic" ? "bg-red-500" : "bg-green-500"
//               }`}
//               style={{ width: risk === "Diabetic" ? "80%" : "30%" }}
//             ></div>
//           </div>

//           <p className="text-gray-600 text-sm">
//             {risk === "Diabetic"
//               ? "⚠️ High risk detected. Please consult a healthcare professional."
//               : "✅ Low risk. Maintain healthy lifestyle and regular checkups!"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DiabetesRisk;
import React, { useState } from "react";
import { Activity, HeartPulse, Droplets, Gauge, Pill } from "lucide-react";
import API from "../../api/API";
import AlertMessage from "./AlertMessage";

const DiabetesRisk = () => {
  const [formData, setFormData] = useState({
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    Smoker: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    PhysActivity: "",
    Fruits: "",
    Veggies: "",
  });

  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const gradient = "from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A]";

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convert to number for numeric fields
    const processedValue = type === "number" ? parseFloat(value) : value;
    
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setRisk(null);

    try {
      // Updated endpoint to match middleware
      const response = await API.post(
        "/api/diabetes_riskscoring/predict",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Extract prediction and risk level from response
      const { prediction, risk_level } = response.data;
      
      setRisk({
        prediction: prediction,
        riskLevel: risk_level,
      });
      
      setAlert({
        type: "success",
        text: `Risk Level: ${risk_level}`,
      });
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        text:
          error.response?.data?.error ||
          "Error predicting diabetes risk. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      HighBP: "",
      HighChol: "",
      CholCheck: "",
      BMI: "",
      Smoker: "",
      Stroke: "",
      HeartDiseaseorAttack: "",
      PhysActivity: "",
      Fruits: "",
      Veggies: "",
    });
    setRisk(null);
    setAlert(null);
  };

  // Helper function to get risk color based on risk level
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "High Risk":
        return "text-red-600";
      case "Moderate Risk":
        return "text-yellow-600";
      case "Low Risk":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Helper function to get risk progress bar color
  const getRiskProgressColor = (riskLevel) => {
    switch (riskLevel) {
      case "High Risk":
        return "bg-red-500";
      case "Moderate Risk":
        return "bg-yellow-500";
      case "Low Risk":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper function to get risk progress width
  const getRiskProgressWidth = (prediction) => {
    const percentage = prediction * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  // Helper function to get risk message
  const getRiskMessage = (riskLevel) => {
    switch (riskLevel) {
      case "High Risk":
        return "⚠️ High risk detected. Please consult a healthcare professional immediately.";
      case "Moderate Risk":
        return "⚡ Moderate risk detected. Consider lifestyle changes and regular checkups.";
      case "Low Risk":
        return "✅ Low risk. Maintain healthy lifestyle and regular checkups!";
      default:
        return "Please complete the form to get your risk assessment.";
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 sm:px-10 py-8 bg-white/70 backdrop-blur-md border border-gray-100 shadow-xl rounded-3xl animate-fadeIn">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#B3E4FF]">
        Diabetes Risk Predictor
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter your health details below to estimate your diabetes risk.
      </p>

      {/* Alert */}
      {alert && (
        <div className="mb-4">
          <AlertMessage type={alert.type} text={alert.text} />
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {[
          { 
            name: "HighBP", 
            icon: HeartPulse, 
            placeholder: "High Blood Pressure (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "HighChol", 
            icon: Droplets, 
            placeholder: "High Cholesterol (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "CholCheck", 
            icon: Activity, 
            placeholder: "Cholesterol Check (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "BMI", 
            icon: Gauge, 
            placeholder: "BMI",
            type: "number",
            step: "0.1"
          },
          { 
            name: "Smoker", 
            icon: Pill, 
            placeholder: "Smoker (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "Stroke", 
            icon: HeartPulse, 
            placeholder: "History of Stroke (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "HeartDiseaseorAttack", 
            icon: HeartPulse, 
            placeholder: "Heart Disease/Attack (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "PhysActivity", 
            icon: Activity, 
            placeholder: "Physical Activity (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "Fruits", 
            icon: Droplets, 
            placeholder: "Fruits Consumption (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
          { 
            name: "Veggies", 
            icon: Droplets, 
            placeholder: "Vegetables Consumption (0/1)",
            type: "select",
            options: ["No", "Yes"]
          },
        ].map((field) => (
          <div
            key={field.name}
            className={`flex items-center gap-3 border border-gray-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#B3E4FF] bg-white transition-all hover:shadow-md`}
          >
            <field.icon className="text-[#2563EB]" />
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                required
              >
                <option value="">Select {field.placeholder}</option>
                {field.options.map((opt, idx) => (
                  <option key={idx} value={idx === 0 ? 0 : 1}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "number"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                step={field.step || "1"}
                className="w-full outline-none bg-transparent"
                required
              />
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="col-span-full flex flex-col sm:flex-row gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${gradient} hover:scale-105 transition-transform disabled:opacity-50`}
          >
            {loading ? "Predicting..." : "Predict Risk"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Prediction Result */}
      {risk && (
        <div className="col-span-full mt-8 bg-white rounded-2xl shadow-inner p-6 text-center animate-fadeIn">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Prediction Result
          </h3>
          <div
            className={`text-4xl font-extrabold ${getRiskColor(risk.riskLevel)}`}
          >
            {risk.riskLevel}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 mb-2">
            <div
              className={`h-3 rounded-full transition-all ${getRiskProgressColor(risk.riskLevel)}`}
              style={{ width: getRiskProgressWidth(risk.prediction) }}
            ></div>
          </div>

          <p className="text-gray-600 text-sm mt-2">
            Risk Score: {(risk.prediction * 100).toFixed(1)}%
          </p>

          <p className="text-gray-600 text-sm mt-2">
            {getRiskMessage(risk.riskLevel)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiabetesRisk;