"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { careerStages, businessSpecialties } from "@/data/career-path";

export default function CareerPathPage() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"timeline" | "specialties">("timeline");

  const stage = careerStages.find((s) => s.id === selectedStage);
  const specialty = businessSpecialties.find((s) => s.id === selectedSpecialty);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-3xl mr-2">🎓</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Career Path
          </span>
        </h1>
        <p className="text-gray-400">Your journey from student to business leader, entrepreneur, or CEO!</p>
      </motion.div>

      {/* Tab Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "timeline" ? "btn-primary" : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Career Timeline
        </button>
        <button
          onClick={() => setActiveTab("specialties")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "specialties" ? "btn-primary" : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Specialties
        </button>
      </div>

      {activeTab === "timeline" ? (
        <>
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] to-[#FFD700] hidden sm:block" />

            <div className="space-y-6">
              {careerStages.map((s, index) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col sm:flex-row items-start gap-4 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <button
                      onClick={() => setSelectedStage(s.id === selectedStage ? null : s.id)}
                      className={`glass-card p-5 text-left sm:text-inherit w-full cursor-pointer transition-all ${
                        selectedStage === s.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                      }`}
                    >
                      <span className="text-3xl block mb-2">{s.emoji}</span>
                      <h3 className="text-lg font-bold text-white">{s.name}</h3>
                      <span className="text-xs text-[#FFD700]">Ages {s.ageRange}</span>
                      <p className="text-sm text-gray-400 mt-1">{s.description}</p>
                    </button>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden sm:flex items-center justify-center w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#0a0f1e] shrink-0 mt-6 z-10" />

                  {/* Spacer */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stage Detail */}
          <AnimatePresence>
            {stage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card p-6 mt-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{stage.emoji}</span>
                    {stage.name}
                    <span className="text-sm text-[#FFD700] font-normal">({stage.ageRange})</span>
                  </h3>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{stage.details}</p>
                <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Tips for This Stage:</h4>
                <ul className="space-y-2">
                  {stage.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#10B981] mt-1">&#8226;</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          {/* Specialties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessSpecialties.map((spec, index) => (
              <motion.button
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedSpecialty(spec.id === selectedSpecialty ? null : spec.id)}
                className={`glass-card p-5 text-left cursor-pointer transition-all ${
                  selectedSpecialty === spec.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                }`}
              >
                <span className="text-3xl block mb-2">{spec.emoji}</span>
                <h3 className="text-lg font-bold text-white">{spec.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{spec.description}</p>
                <span className="badge-secondary mt-2 inline-block">{spec.salary}</span>
              </motion.button>
            ))}
          </div>

          {/* Specialty Detail */}
          <AnimatePresence>
            {specialty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card p-6 mt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{specialty.emoji}</span>
                    {specialty.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSpecialty(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{specialty.description}</p>
                <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 mb-3">
                  <span className="text-[#10B981] font-semibold text-sm block mb-1">A Day in the Life:</span>
                  <span className="text-gray-300 text-sm">{specialty.dayInLife}</span>
                </div>
                <div className="bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] rounded-xl p-4">
                  <span className="text-[#FFD700] font-semibold text-sm block mb-1">Salary Range:</span>
                  <span className="text-gray-300 text-sm">{specialty.salary}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
