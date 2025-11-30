// import { useState } from "react";
// import API from "../api/API";
// import { Loader } from "lucide-react";

// export default function DiseasePanel({ disease }) {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     // ✅ Allow only PNG, JPG, JPEG
//     const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
//     if (!allowedTypes.includes(selected.type)) {
//       setError("Only chest X-ray images (PNG, JPG, JPEG) are allowed.");
//       setFile(null);
//       setPreview(null);
//       return;
//     }

//     setError("");
//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await API.post(`/diseases/${disease}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResult(res.data);
//     } catch (err) {
//       console.error("Prediction error:", err);
//       setResult({
//         class: "Error",
//         confidence: 0,
//         error: err.response?.data?.detail || "Failed to process image",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg mx-auto flex flex-col gap-6">
//       <h2 className="text-2xl font-bold text-indigo-600">
//         {disease.replace("-", " ")}
//       </h2>

//       {/* Upload Form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <label className="border-2 border-dashed border-indigo-300 p-6 rounded-lg text-center cursor-pointer hover:border-indigo-500 transition">
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               className="mx-auto h-48 object-contain rounded-lg"
//             />
//           ) : (
//             <p className="text-gray-400">
//               Click or drag chest X-ray (PNG/JPG/JPEG) here to upload
//             </p>
//           )}
//           <input
//             type="file"
//             accept=".png, .jpg, .jpeg"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading || !file}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 flex justify-center items-center gap-2 transition transform hover:scale-[1.02]"
//         >
//           {loading && <Loader className="animate-spin h-5 w-5" />}
//           {loading ? "Predicting..." : "Predict"}
//         </button>
//       </form>

//       {/* Result */}
//       {result && (
//         <div
//           className={`mt-4 p-4 rounded-lg border ${
//             result.class && result.class.toLowerCase() === "normal"
//               ? "bg-green-50 border-green-300"
//               : result.class && result.class.toLowerCase() === "error"
//               ? "bg-red-50 border-red-300"
//               : "bg-yellow-50 border-yellow-300"
//           }`}
//         >
//           <p className="text-lg">
//             <strong>Class:</strong>{" "}
//             <span className="capitalize">{result.class || "Unknown"}</span>
//           </p>
//           <p className="text-lg">
//             <strong>Confidence:</strong>{" "}
//             {result.confidence
//               ? `${(result.confidence * 100).toFixed(2)}%`
//               : "N/A"}
//           </p>
//           {result.error && (
//             <p className="text-sm text-red-600 mt-2">
//               <strong>Error:</strong> {result.error}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import API from "../api/API";
import { Loader } from "lucide-react";

export default function DiseasePanel({ disease }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedModel, setSelectedModel] = useState("model1"); // Default model

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

  const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/dicom"];
  if (!allowedTypes.includes(selected.type)) {
    setError("Only chest X-ray images (PNG, JPG, JPEG, or DICOM) are allowed.");
    setFile(null);
    setPreview(null);
    return;
  }

    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_name", selectedModel); // Send selected model

    try {
      setLoading(true);
      const res = await API.post(`/diseases/${disease}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setResult({
        class: "Error",
        confidence: 0,
        error: err.response?.data?.detail || "Failed to process image",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-indigo-600">
        {disease.replace("-", " ")}
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="border-2 border-dashed border-indigo-300 p-6 rounded-lg text-center cursor-pointer hover:border-indigo-500 transition">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-48 object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-400">
              Click or drag chest X-ray (PNG/JPG/JPEG) here to upload
            </p>
          )}
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Model selection */}
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="model"
              value="model1"
              checked={selectedModel === "model1"}
              onChange={() => setSelectedModel("model1")}
            />
            Model 1
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="model"
              value="model2"
              checked={selectedModel === "model2"}
              onChange={() => setSelectedModel("model2")}
            />
            Model 2
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="model"
              value="model3"
              checked={selectedModel === "model3"}
              onChange={() => setSelectedModel("model3")}
            />
            Model 3
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 flex justify-center items-center gap-2 transition transform hover:scale-[1.02]"
        >
          {loading && <Loader className="animate-spin h-5 w-5" />}
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div
          className={`mt-4 p-4 rounded-lg border ${
            result.prediction?.class?.toLowerCase() === "normal"
              ? "bg-green-50 border-green-300"
              : result.prediction?.class?.toLowerCase() === "error"
              ? "bg-red-50 border-red-300"
              : "bg-yellow-50 border-yellow-300"
          }`}
        >
          <p className="text-lg">
            <strong>Model Used:</strong> {result.prediction?.selected_model}
          </p>
          <p className="text-lg">
            <strong>Class:</strong>{" "}
            <span className="capitalize">{result.prediction?.class || "Unknown"}</span>
          </p>
          <p className="text-lg">
            <strong>Confidence:</strong>{" "}
            {result.prediction?.confidence
              ? `${(result.prediction.confidence * 100).toFixed(2)}%`
              : "N/A"}
          </p>
          {result.prediction?.error && (
            <p className="text-sm text-red-600 mt-2">
              <strong>Error:</strong> {result.prediction.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

