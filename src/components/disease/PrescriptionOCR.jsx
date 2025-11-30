
import React, { useState, useRef } from "react";
import API from "../../api/API";
import AlertMessage from "./AlertMessage";
import {
  X,
  UploadCloud,
  Edit,
  Save,
  Printer,
} from "lucide-react";

const translations = {
  en: {
    uploadTitle: "Upload Prescription",
    supportedFormats: "(Supported formats: JPG, PNG, JPEG)",
    analyzeButton: "Analyze Prescription",
    analyzing: "Analyzing...",
    upload: "Upload Image",
    patientName: "Patient Name",
    age: "Age",
    gender: "Gender",
    date: "Date",
    doctorName: "Doctor Name",
    diagnosis: "Diagnosis",
    medicines: "Medicines",
    notes: "Notes",
    edit: "Edit",
    save: "Save",
    printReport: "Print Report",
    prescriptionReport: "Prescription Analysis Report",
    noMedicines: "No medicines recognized.",
  },
  ur: {
    uploadTitle: "نسخہ اپلوڈ کریں",
    supportedFormats: "(فائل کی اقسام: JPG، PNG، JPEG)",
    analyzeButton: "نسخہ تجزیہ کریں",
    analyzing: "تجزیہ ہو رہا ہے...",
    upload: "تصویر اپلوڈ کریں",
    patientName: "مریض کا نام",
    age: "عمر",
    gender: "جنس",
    date: "تاریخ",
    doctorName: "ڈاکٹر کا نام",
    diagnosis: "تشخیص",
    medicines: "دوائیں",
    notes: "نوٹس",
    edit: "ترمیم کریں",
    save: "محفوظ کریں",
    printReport: "رپورٹ پرنٹ کریں",
    prescriptionReport: "نسخہ تجزیہ رپورٹ",
    noMedicines: "کوئی دوا شناخت نہیں ہوئی۔",
  },
};

const PrescriptionOCR = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [alertMsg, setAlertMsg] = useState({ type: "", message: "" });
  const [language, setLanguage] = useState("en");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  const fileInputRef = useRef(null);
  const reportRef = useRef(null);
  const t = translations[language];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setAlertMsg({ type: "error", message: "Please select an image first." });
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await API.post("/api/prescriptionocr/predict", formData, {
        params: { lang: language },
      });

      const data = res.data;
      if (data.error) {
        setAlertMsg({ type: "error", message: data.error });
      } else {
        setResult(data);
        setEditedData(data);
        setAlertMsg({
          type: "success",
          message: "Prescription analyzed successfully!",
        });
      }
    } catch (err) {
      setAlertMsg({
        type: "error",
        message: err.response?.data?.error || `Network error: ${err.message}`,
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      setResult({ ...editedData });
      setAlertMsg({ type: "success", message: "Changes saved successfully!" });
    } else {
      setEditedData({ ...result });
    }
    setEditMode(!editMode);
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...(editedData.Medicines || [])];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      [field]: value,
    };
    setEditedData((prev) => ({
      ...prev,
      Medicines: updatedMedicines,
    }));
  };

  const handleAddMedicine = () => {
    setEditedData((prev) => ({
      ...prev,
      Medicines: [
        ...(prev.Medicines || []),
        { Name: "", Dosage: "", Frequency: "", Duration: "" },
      ],
    }));
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...(editedData.Medicines || [])];
    updatedMedicines.splice(index, 1);
    setEditedData((prev) => ({
      ...prev,
      Medicines: updatedMedicines,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          body > *:not(.print-container) {
            display: none !important;
          }
          .print-container {
            display: block !important;
            width: 100%;
          }
          .print-container > div {
            display: block !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-6 no-print">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6 pb-3 border-b">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-blue-600">
            Prescription Analysis
          </h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-1 text-gray-700 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="ur">اردو</option>
          </select>
        </div>

        {alertMsg.message && (
          <AlertMessage
            type={alertMsg.type}
            message={alertMsg.message}
            onClose={() => setAlertMsg({ type: "", message: "" })}
          />
        )}

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-lg hover:border-blue-600 transition-colors"
          >
            <UploadCloud className="w-5 h-5" /> {t.upload}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {previewUrl && (
          <div className="relative w-full max-w-md mx-auto mb-4 rounded-lg overflow-hidden shadow-sm border">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full object-contain max-h-72"
            />
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={analyzing}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            analyzing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {analyzing ? t.analyzing : t.analyzeButton}
        </button>
      </div>

      {result && (
        <div className="max-w-5xl mx-auto px-6 pb-8 space-y-6">
          <div className="flex justify-end gap-2 no-print">
            <button
              onClick={handleEditToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                editMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {editMode ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {editMode ? t.save : t.edit}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t.printReport}
            </button>
          </div>

          <div ref={reportRef} className="print-container">
            <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
              <div className="text-center mb-6 pb-4 border-b-2 border-blue-100">
                <h1 className="text-2xl font-bold text-blue-800">{t.prescriptionReport}</h1>
                <p className="text-gray-500 mt-1">
                  {new Date().toLocaleDateString(language === "ur" ? "ur-PK" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-blue-700 mb-3 pb-1 border-b border-blue-100">
                  Patient Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.patientName}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Patient_Name || ""}
                        onChange={(e) => handleFieldChange("Patient_Name", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Patient_Name || "-"}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.age}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Age || ""}
                        onChange={(e) => handleFieldChange("Age", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Age || "-"}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.gender}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Gender || ""}
                        onChange={(e) => handleFieldChange("Gender", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Gender || "-"}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.date}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Date || ""}
                        onChange={(e) => handleFieldChange("Date", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Date || "-"}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-blue-700 mb-3 pb-1 border-b border-blue-100">
                  Doctor Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.doctorName}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Doctor_Name || ""}
                        onChange={(e) => handleFieldChange("Doctor_Name", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Doctor_Name || "-"}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">{t.diagnosis}</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={editedData.Diagnosis || ""}
                        onChange={(e) => handleFieldChange("Diagnosis", e.target.value)}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{result.Diagnosis || "-"}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3 pb-1 border-b border-blue-100">
                  <h2 className="text-lg font-semibold text-blue-700">{t.medicines}</h2>
                  {editMode && (
                    <button
                      onClick={handleAddMedicine}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add Medicine
                    </button>
                  )}
                </div>
                {(editMode ? editedData.Medicines : result.Medicines) &&
                (editMode ? editedData.Medicines : result.Medicines).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-blue-50 text-left">
                          <th className="px-3 py-2 border border-blue-100">Name</th>
                          <th className="px-3 py-2 border border-blue-100">Dosage</th>
                          <th className="px-3 py-2 border border-blue-100">Frequency</th>
                          <th className="px-3 py-2 border border-blue-100">Duration</th>
                          {editMode && <th className="px-3 py-2 border border-blue-100">Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {(editMode ? editedData.Medicines : result.Medicines).map((med, idx) => (
                          <tr key={idx} className="even:bg-gray-50">
                            <td className="px-3 py-2 border border-blue-100">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={med.Name || ""}
                                  onChange={(e) => handleMedicineChange(idx, "Name", e.target.value)}
                                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              ) : (
                                med.Name || "-"
                              )}
                            </td>
                            <td className="px-3 py-2 border border-blue-100">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={med.Dosage || ""}
                                  onChange={(e) => handleMedicineChange(idx, "Dosage", e.target.value)}
                                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              ) : (
                                med.Dosage || "-"
                              )}
                            </td>
                            <td className="px-3 py-2 border border-blue-100">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={med.Frequency || ""}
                                  onChange={(e) => handleMedicineChange(idx, "Frequency", e.target.value)}
                                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              ) : (
                                med.Frequency || "-"
                              )}
                            </td>
                            <td className="px-3 py-2 border border-blue-100">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={med.Duration || ""}
                                  onChange={(e) => handleMedicineChange(idx, "Duration", e.target.value)}
                                  className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              ) : (
                                med.Duration || "-"
                              )}
                            </td>
                            {editMode && (
                              <td className="px-3 py-2 border border-blue-100">
                                <button
                                  onClick={() => handleRemoveMedicine(idx)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">{t.noMedicines}</p>
                )}
              </div>

              {result.Notes && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-blue-700 mb-3 pb-1 border-b border-blue-100">
                    {t.notes}
                  </h2>
                  {editMode ? (
                    <textarea
                      value={editedData.Notes || ""}
                      onChange={(e) => handleFieldChange("Notes", e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{result.Notes}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrescriptionOCR;