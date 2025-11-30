import React, { useState } from "react";
import DiabetesRisk from "./DiabetesRisk";
import HeartRisk from "./HeartRisk";

const RiskScoring = () => {
  const [selectedRisk, setSelectedRisk] = useState(""); // "heart" or "diabetes"

  const gradient = "from-[#B3E4FF] via-[#8ebbf3] to-[#1E3A8A]";

  const cards = [
    {
      key: "heart",
      title: "Heart Risk Scoring",
      description:
        "Calculate your risk for cardiovascular diseases using AI-based analysis.",
      features: [
        "Comprehensive cardiovascular assessment",
        "Personalized risk percentage",
        "Lifestyle improvement suggestions",
      ],
      icon: "❤️",
    },
    {
      key: "diabetes",
      title: "Diabetes Risk Scoring",
      description:
        "Evaluate your likelihood of developing diabetes based on lifestyle and health data.",
      features: [
        "Blood sugar and BMI evaluation",
        "Risk factor identification",
        "Preventive strategy guidance",
      ],
      icon: "⚕️",
    },
  ];

  // Navigate to risk component
  if (selectedRisk === "diabetes") return <DiabetesRisk />;
  if (selectedRisk === "heart") return <HeartRisk />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      {/* Header */}
      <header className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
          🧠 Risk Scoring Tools
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Assess your health risks with our{" "}
          <span className="text-[#2563EB] font-semibold">AI-powered calculators</span>{" "}
          — for better health insights and early prevention.
        </p>
      </header>

      {/* Risk Cards */}
      <div className="grid gap-10 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.key}
            onClick={() => setSelectedRisk(card.key)}
            className="cursor-pointer relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="relative z-10 flex flex-col items-center">
              {/* Icon */}
              <div
                className={`w-20 h-20 flex items-center justify-center text-4xl rounded-full bg-gradient-to-r ${gradient} text-white mb-6 shadow-md`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {card.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 text-sm md:text-base"
                  >
                    <span className="text-[#2563EB] mr-2 text-lg">✔</span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                className={`px-5 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r ${gradient} hover:scale-105 transition-transform shadow-md`}
              >
                Assess Risk →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskScoring;
