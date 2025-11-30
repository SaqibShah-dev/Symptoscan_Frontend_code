import React, { useState, useRef } from "react";
import { Upload, XCircle, Activity, Loader, Info, AlertCircle } from "lucide-react";
import API from "../../api/API";
import AlertMessage from "./AlertMessage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ChestXrayAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showDebug, setShowDebug] = useState(false);
  const fileInputRef = useRef(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 5000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*") && !file.name.endsWith(".dcm")) {
      showAlert("error", "Please select an image file (PNG, JPG, JPEG, DICOM)");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } });
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleBrowseClick = () => fileInputRef.current.click();

  const getDiagnosisFromData = (data) =>
    data.result?.label || data.label || data.prediction || "Unknown";
  const getConfidenceFromData = (data) =>
    data.result?.score || data.score || data.confidence || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return showAlert("error", "Please upload an X-ray image first.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const res = await API.post("/api/chestxray/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      showAlert("success", "X-ray analyzed successfully!");
    } catch (err) {
      console.error("Error uploading file:", err);
      showAlert("error", "Failed to analyze X-ray. Please try again.");
    } finally {
      setLoading(false);
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
      {/* Alert */}
      {alert.message && (
        <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Chest X-ray Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a chest X-ray image to detect abnormalities using AI-based radiology analysis.
        </p>

        {/* Info Banner */}
        <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="text-indigo-600 mt-0.5" size={20} />
            <div className="text-sm text-indigo-800">
              <p className="font-semibold mb-1">Important:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Only grayscale CT/X-ray images are accepted</li>
                <li>Colored images may lead to incorrect results</li>
                <li>Supported formats: PNG, JPG, JPEG, DICOM (.dcm)</li>
                <li>AI assistant only – consult medical professionals for diagnosis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200"
      >
        <div
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            preview
              ? "border-indigo-500 bg-indigo-100"
              : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleBrowseClick}
        >
          {!preview ? (
            <div className="flex flex-col items-center justify-center text-gray-600 space-y-3">
              <Upload className="w-12 h-12 text-indigo-600" />
              <p className="text-sm md:text-base font-medium">Click to upload or drag & drop your chest X-ray image</p>
              <p className="text-xs text-gray-400">Supported formats: JPG, JPEG, PNG, DICOM</p>
            </div>
          ) : (
            <div className="relative inline-block">
              <img src={preview} alt="Preview" className="rounded-2xl shadow-md max-h-96 mx-auto object-contain" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                title="Remove Image"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, .dcm, application/dicom"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Analyze Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={!selectedFile || loading}
            className={`px-10 py-4 rounded-xl text-white font-semibold text-lg transition-all transform ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin w-5 h-5" /> Analyzing...
              </span>
            ) : (
              "Analyze X-ray"
            )}
          </button>
        </div>

        {loading && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-600 h-2 w-2/3 animate-pulse rounded-full"></div>
          </div>
        )}
      </form>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-10 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="text-indigo-600 w-6 h-6" /> Analysis Result
            </h3>
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {showDebug ? "Hide" : "Show"} Debug Info
            </button>
          </div>

          {showDebug && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 overflow-auto max-h-40">
              <pre className="text-xs text-gray-600">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {/* Prediction & Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600 shadow-sm">
              <p className="text-indigo-700 text-xs uppercase">Prediction</p>
              <h4
                className={`text-2xl md:text-3xl font-bold mt-1 ${
                  getDiagnosisFromData(result) === "Normal" ? "text-green-600" : "text-red-600"
                }`}
              >
                {getDiagnosisFromData(result)}
              </h4>
            </div>

            <div className="p-5 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600 shadow-sm">
              <p className="text-indigo-700 text-xs uppercase">Confidence</p>
              <h4 className={`text-2xl md:text-3xl font-bold mt-1 ${getConfidenceColor(getConfidenceFromData(result))}`}>
                {(getConfidenceFromData(result) * 100).toFixed(1)}%
              </h4>
              <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 ${getConfidenceBarColor(getConfidenceFromData(result))} rounded-full transition-all duration-700`}
                  style={{ width: `${(getConfidenceFromData(result) * 100).toFixed(1)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {preview && (
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <h4 className="bg-indigo-600 text-white p-3 font-medium text-center">Original X-ray</h4>
                <TransformWrapper initialScale={1} minScale={1} maxScale={3} wheel={{ step: 0.1 }}>
                  <TransformComponent>
                    <img src={preview} alt="Original X-ray" className="w-full object-contain bg-white p-4 max-h-96" />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            )}
            {result.gradcam && (
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <h4 className="bg-indigo-600 text-white p-3 font-medium text-center">AI Focus Map (Grad-CAM)</h4>
                <TransformWrapper initialScale={1} minScale={1} maxScale={3} wheel={{ step: 0.1 }}>
                  <TransformComponent>
                    <img
                      src={`data:image/png;base64,${result.gradcam}`}
                      alt="GradCAM"
                      className="w-full object-contain bg-white p-4 max-h-96"
                    />
                  </TransformComponent>
                </TransformWrapper>
                <p className="text-center text-gray-500 text-sm italic py-2">
                  🔴 Red areas indicate regions the AI model focused on.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChestXrayAnalyzer;
