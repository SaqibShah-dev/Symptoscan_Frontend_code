import React, { useState, useRef } from "react";
import { FileText, Upload, Send, Globe, Loader2 } from "lucide-react";
import API from "../../api/API";
import AlertMessage from "./AlertMessage";

export default function RAGAssistant() {
  const [messages, setMessages] = useState([
    {
      type: "welcome",
      text: "Upload a PDF document and ask questions about its content. Enable web search to supplement answers with online information.",
    },
  ]);
  const [query, setQuery] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [useInternet, setUseInternet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);

  const addMsg = (text, type) => {
    setMessages((prev) => [...prev, { text, type }]);
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    addMsg(query, "user");
    setQuery("");
    setIsLoading(true);
    addMsg("Thinking...", "bot");

    try {
      // Updated: Use the API Gateway endpoints
      const endpoint = useInternet ? "/api/rag/internet_query" : "/api/rag/query";
      const res = await API.post(endpoint, { query });
      const data = res.data;

      setMessages((prev) =>
        prev.filter((m) => !(m.type === "bot" && m.text === "Thinking..."))
      );

      if (data.answer) addMsg(data.answer, "bot");
      else if (data.error) addMsg("Error: " + data.error, "error");
      else addMsg("No response received", "error");
    } catch (err) {
      addMsg("Error: " + err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    const file = fileRef.current.files[0];
    if (!file) {
      setUploadStatus("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus("Uploading document...");

    try {
      // Updated: Use the API Gateway endpoint
      const res = await API.post("/api/rag/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data;
      if (data.message) {
        setUploadStatus("✓ " + data.message);
        fileRef.current.value = "";
      } else {
        setUploadStatus("✗ " + (data.error || "Upload failed"));
      }
    } catch (err) {
      setUploadStatus("✗ " + err.message);
    }
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-100px)] bg-white">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-50 p-6 border-r border-gray-200 flex flex-col">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Tools
        </h3>

        <div className="space-y-4">
          {/* Upload */}
          <div>
            <input
              type="file"
              id="pdf-file"
              accept=".pdf"
              ref={fileRef}
              className="hidden"
            />
            <label
              htmlFor="pdf-file"
              className="block p-3 text-gray-600 border border-gray-300 rounded-md text-center cursor-pointer hover:border-indigo-500 hover:text-indigo-600"
            >
              <FileText className="inline w-4 h-4 mr-1" />
              Select PDF
            </label>
            <button
              onClick={handleUpload}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>

          {/* Web Search Toggle */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              Web Search
            </label>
            <input
              type="checkbox"
              checked={useInternet}
              onChange={(e) => setUseInternet(e.target.checked)}
              className="w-5 h-5 accent-indigo-600"
            />
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div
              className={`p-2 text-sm font-medium rounded-md text-center ${
                uploadStatus.startsWith("✓")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : uploadStatus.startsWith("✗")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-gray-50 text-gray-700 border border-gray-200"
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) =>
            msg.type === "welcome" ? (
              <div
                key={idx}
                className="text-center text-gray-500 max-w-xl mx-auto mt-10"
              >
                <h2 className="text-2xl font-bold text-indigo-700 mb-3">
                  Knowledge Assistant
                </h2>
                <p className="text-gray-600">{msg.text}</p>
              </div>
            ) : (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[70%] text-sm leading-relaxed shadow-sm ${
                  msg.type === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : msg.type === "bot"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-600 text-white"
                }`}
              >
                {msg.text === "Thinking..." ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Thinking...
                  </span>
                ) : (
                  msg.text
                )}
              </div>
            )
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 flex gap-3 bg-gray-50">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your document..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`px-6 py-3 rounded-full font-semibold text-white flex items-center gap-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Processing
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}






