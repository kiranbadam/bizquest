"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessParts, businessFlowSteps } from "@/data/business-basics";

export default function BusinessBasicsPage() {
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<"structure" | "flow">("structure");
  const [activeFlowStep, setActiveFlowStep] = useState(0);

  const types = businessParts.filter((p) => p.level === "type");
  const departments = businessParts.filter((p) => p.level === "department");
  const concepts = businessParts.filter((p) => p.level === "concept");

  const selected = businessParts.find((p) => p.id === selectedPart);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-3xl mr-2">🏢</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Business Basics
          </span>
        </h1>
        <p className="text-gray-400">Click on any part to learn more about how businesses work</p>
      </motion.div>

      {/* Tab Toggle */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("structure")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "structure"
              ? "btn-primary"
              : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Business Structure
        </button>
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "flow"
              ? "btn-primary"
              : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Starting a Business
        </button>
      </div>

      {activeTab === "structure" ? (
        <>
          {/* Simple/Advanced Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsAdvanced(!isAdvanced)}
              className="btn-secondary text-sm"
            >
              {isAdvanced ? "Switch to Simple Mode" : "Switch to Advanced Mode"}
            </button>
          </div>

          {/* Business Types */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              Types of Businesses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {types.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPart(type.id)}
                  className={`glass-card px-5 py-4 text-center cursor-pointer w-full ${
                    selectedPart === type.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                  }`}
                >
                  <span className="text-3xl block mb-2">{type.emoji}</span>
                  <span className="font-bold text-white block">{type.name}</span>
                  <span className="text-xs text-gray-400 block mt-1">{type.description}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Departments & Key Concepts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Departments</h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <motion.button
                    key={dept.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPart(dept.id)}
                    className={`glass-card p-4 text-left w-full cursor-pointer ${
                      selectedPart === dept.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{dept.emoji}</span>
                      <div>
                        <span className="font-semibold text-white block">{dept.name}</span>
                        <span className="text-sm text-gray-400">{dept.description}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Key Concepts</h2>
              <div className="space-y-3">
                {concepts.map((concept) => (
                  <motion.button
                    key={concept.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPart(concept.id)}
                    className={`glass-card p-4 text-left w-full cursor-pointer ${
                      selectedPart === concept.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.emoji}</span>
                      <div>
                        <span className="font-semibold text-white block">{concept.name}</span>
                        <span className="text-sm text-gray-400">{concept.description}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="glass-card p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>{selected.emoji}</span>
                    {selected.name}
                  </h3>
                  <button
                    onClick={() => setSelectedPart(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-300 mb-4">
                  {isAdvanced ? selected.details : selected.description}
                </p>
                {isAdvanced && (
                  <div className="bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] rounded-xl p-4">
                    <span className="text-[#FFD700] font-semibold text-sm">Fun Fact: </span>
                    <span className="text-gray-300 text-sm">{selected.funFact}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Starting a Business Flow */
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            How to Start a Business — Step by Step
          </h2>

          {/* Progress Bar */}
          <div className="progress-bar mb-6">
            <div
              className="progress-fill"
              style={{ width: `${((activeFlowStep + 1) / businessFlowSteps.length) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {businessFlowSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveFlowStep(index)}
                className={`p-2 rounded-xl text-center transition-all ${
                  index === activeFlowStep
                    ? "bg-[rgba(16,185,129,0.2)] border border-[#10B981]"
                    : index < activeFlowStep
                    ? "bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.2)]"
                    : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"
                }`}
              >
                <span className="text-xl block">{step.emoji}</span>
                <span className="text-[10px] text-gray-400 block mt-1">{step.name}</span>
              </button>
            ))}
          </div>

          {/* Active Step Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlowStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{businessFlowSteps[activeFlowStep].emoji}</span>
                <div>
                  <span className="badge-primary">Step {activeFlowStep + 1} of {businessFlowSteps.length}</span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {businessFlowSteps[activeFlowStep].name}
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                {businessFlowSteps[activeFlowStep].details}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setActiveFlowStep(Math.max(0, activeFlowStep - 1))}
              disabled={activeFlowStep === 0}
              className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveFlowStep(Math.min(businessFlowSteps.length - 1, activeFlowStep + 1))}
              disabled={activeFlowStep === businessFlowSteps.length - 1}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
