import React, { useState } from "react";
import { Upload, CheckCircle, XCircle, AlertCircle, Loader, Info } from "lucide-react";
import axios from "axios";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { 'Content-Type': 'application/json' },
});

// Alert Component
const AlertMessage = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  
  return (
    <div className={`${bgColor} border-l-4 p-4 mb-4 rounded-r-lg`}>
      <div className="flex items-center justify-between">
        <p className={`${textColor} font-medium`}>{message}</p>
        <button onClick={onClose} className={`${textColor} hover:opacity-70`}>×</button>
      </div>
    </div>
  );
};

export default function KidneyAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showDebug, setShowDebug] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 5000);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(selected.type)) {
      showAlert("error", "Only PNG, JPG, JPEG files are allowed.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return showAlert("error", "Please upload an image first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);

      const res = await API.post("/api/kidneyctscan/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);

      if (res.data.predicted_class === "Uncertain") {
        showAlert("error", "Model is uncertain about this image. Try another image or consult a doctor.");
      } else {
        showAlert("success", "Analysis completed successfully!");
      }
    } catch (err) {
      let errorMessage = "Prediction failed. Please try again.";
      if (err.response) errorMessage = err.response.data?.error || err.response.data?.message || errorMessage;
      else if (err.request) errorMessage = "No response from server. Please check if middleware is running.";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendFeedback = async (feedbackValue) => {
    if (!result) return;

    let correctLabel = null;
    if (feedbackValue === "incorrect") {
      correctLabel = prompt("Please enter the correct diagnosis: Normal, Cyst, Tumor, Stone");
      const validLabels = ["Normal", "Cyst", "Tumor", "Stone"];
      if (!correctLabel || !validLabels.includes(correctLabel)) {
        return showAlert("error", "Please enter a valid diagnosis.");
      }
    }

    try {
      await API.post("/api/kidneyctscan/feedback", {
        prediction: result.predicted_class,
        feedback: feedbackValue,
        correct_label: correctLabel,
        confidence: result.confidence,
        timestamp: new Date().toISOString(),
      });
      showAlert("success", "Thank you for your feedback!");
    } catch (err) {
      showAlert("error", "Failed to submit feedback.");
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceBarColor = (confidence) => {
    if (confidence >= 0.8) return "bg-green-600";
    if (confidence >= 0.6) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {alert.message && (
        <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Kidney CT Scan Analysis</h2>
        <p className="text-gray-600">Upload a CT scan image for AI-powered kidney disease detection</p>

        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Important Information:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Only grayscale CT scan images are accepted</li>
                <li>Colored RGB images will be rejected</li>
                <li>Supported formats: PNG, JPG, JPEG, DICOM (.dcm)</li>
                <li>This is an AI assistant - consult medical professionals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur-sm shadow-lg hover:shadow-xl"
        onClick={() => document.getElementById("file-input").click()}
      >
        {preview ? (
          <div className="w-full max-w-md">
            <img src={preview} alt="Preview" className="rounded-xl w-full object-contain border-2 border-gray-200 shadow-md max-h-[400px]" />
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); }}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="w-16 h-16 text-indigo-600 mb-4" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-gray-700">Click to upload or drag & drop</p>
            <p className="text-sm text-gray-500 mt-2">CT scan images only (JPG, JPEG, PNG, DICOM)</p>
            <p className="text-xs text-gray-400 mt-1">Max file size: 10MB</p>
          </div>
        )}
        <input type="file" id="file-input" accept=".jpg,.jpeg,.png,.dcm" onChange={handleFileChange} className="hidden" />
      </div>

      {/* Analyze Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-10 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 shadow-lg text-lg ${
            loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          } ${!file && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? (
            <span className="flex items-center gap-2"><Loader className="animate-spin" size={20} />Analyzing CT Scan...</span>
          ) : "Analyze CT Scan"}
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-10 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Analysis Results</h3>
              <p className="text-gray-500 text-sm mt-1">Completed on {new Date().toLocaleString()}</p>
            </div>
            <button onClick={() => setShowDebug(!showDebug)} className="text-sm text-gray-500 hover:text-gray-700">
              {showDebug ? "Hide" : "Show"} Debug Info
            </button>
          </div>

          {/* Debug Info */}
          {showDebug && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <p className="text-sm font-bold text-gray-700 mb-2">Raw API Response:</p>
              <pre className="text-xs text-gray-600 overflow-auto max-h-40">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {/* Diagnosis Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-100">
            <p className="uppercase text-indigo-600 text-xs font-semibold tracking-wider mb-2">Predicted Diagnosis</p>
            <h4 className="text-4xl font-bold text-gray-800 mb-3">{result.predicted_class || "Unknown"}</h4>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600">Confidence Level:</span>
              <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence || 0)}`}>
                {((result.confidence || 0) * 100).toFixed(1)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className={`h-4 rounded-full ${getConfidenceBarColor(result.confidence || 0)} transition-all duration-700 ease-out`} style={{ width: `${((result.confidence || 0) * 100).toFixed(1)}%` }}></div>
            </div>

            <div className="mt-4 text-sm">
              {result.confidence >= 0.8 ? (
                <p className="text-green-700 font-medium">✓ High confidence prediction</p>
              ) : result.confidence >= 0.6 ? (
                <p className="text-yellow-700 font-medium">Moderate confidence - consider additional analysis</p>
              ) : (
                <p className="text-red-700 font-medium">Low confidence - consult a medical professional</p>
              )}
            </div>
          </div>

          {/* Grad-CAM Visualization */}
          {result.gradcam && (
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Visual Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Original CT Scan", "AI Attention Map (Grad-CAM)"].map((title, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center hover:scale-105 transform transition-all duration-300">
                    <h5 className="font-semibold text-gray-700 mb-3 text-center">{title}</h5>
                    <TransformWrapper initialScale={1} minScale={1} maxScale={3} wheel={{ step: 0.1 }} doubleClick={{ disabled: true }} pinch={{ step: 5 }}>
                      <TransformComponent>
                        <img
                          src={idx === 0 ? preview : `data:image/jpeg;base64,${result.gradcam}`}
                          alt={title}
                          className="rounded-lg w-full border border-gray-300 shadow-sm object-contain"
                        />
                      </TransformComponent>
                    </TransformWrapper>
                    {idx === 1 && <p className="text-xs text-gray-500 mt-2 text-center">Red areas indicate regions of high AI attention</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Medical Disclaimer</p>
                <p>This AI analysis is informational only. Always consult qualified healthcare providers for diagnosis and treatment.</p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Help Improve Our AI</h4>
            <p className="text-sm text-gray-600 text-center mb-4">Was this diagnosis accurate? Your feedback helps train better models.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button onClick={() => sendFeedback("correct")} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 font-medium">
                <CheckCircle size={20} /> Correct Diagnosis
              </button>
              <button onClick={() => sendFeedback("incorrect")} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 font-medium">
                <XCircle size={20} /> Incorrect Diagnosis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <Loader className="animate-spin text-indigo-600 mx-auto mb-4" size={48} />
            <p className="text-gray-700 font-semibold text-lg">Analyzing CT Scan...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </div>
        </div>
      )}
    </div>
  );
}
