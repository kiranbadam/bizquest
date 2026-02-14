"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessOperations, type OperationCategory, type Complexity } from "@/data/operations";
import { updateTracking, unlockAchievement, addXP } from "@/lib/progress";

interface AchievementToast {
  name: string;
  emoji: string;
  xp: number;
}

export default function OperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<OperationCategory | "all">("all");
  const [complexityFilter, setComplexityFilter] = useState<Complexity | "all">("all");

  const categories: (OperationCategory | "all")[] = ["all", "Planning", "Execution", "Growth", "Management"];
  const complexities: (Complexity | "all")[] = ["all", "Basic", "Intermediate", "Advanced"];

  const filtered = businessOperations.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (complexityFilter !== "all" && p.complexity !== complexityFilter) return false;
    return true;
  });

  const selected = businessOperations.find((p) => p.id === selectedOperation);
  const [toast, setToast] = useState<AchievementToast | null>(null);

  const showToast = (t: AchievementToast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  const trackOperation = (id: number) => {
    setSelectedOperation(id === selectedOperation ? null : id);
    if (id !== selectedOperation) {
      addXP(5);
      const progress = updateTracking("viewedOperations", id);
      if (progress.viewedOperations.length >= 20) {
        const result = unlockAchievement("operations-pro");
        if (result.unlocked && result.achievement) {
          showToast({ name: result.achievement.name, emoji: result.achievement.emoji, xp: result.xpGained });
        }
      }
    }
  };

  const complexityColor = (c: Complexity) => {
    switch (c) {
      case "Basic": return "text-green-400 bg-[rgba(46,204,113,0.1)] border-[rgba(46,204,113,0.3)]";
      case "Intermediate": return "text-yellow-400 bg-[rgba(241,196,15,0.1)] border-[rgba(241,196,15,0.3)]";
      case "Advanced": return "text-red-400 bg-[rgba(231,76,60,0.1)] border-[rgba(231,76,60,0.3)]";
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
      {/* Achievement Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="achievement-toast"
          >
            <span className="text-2xl">{toast.emoji}</span>
            <div>
              <p className="font-bold text-white text-sm">{toast.name}</p>
              <p className="text-xs text-[#FFD700]">+{toast.xp} XP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-3xl mr-2">📋</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Business Operations
          </span>
        </h1>
        <p className="text-gray-400">20 key business operations from planning to scaling</p>
      </motion.div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-xs text-gray-400 block mb-2">Category</span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border border-[#10B981]"
                      : "bg-[rgba(255,255,255,0.03)] text-gray-400 border border-transparent hover:text-white"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-400 block mb-2">Complexity</span>
            <div className="flex flex-wrap gap-1.5">
              {complexities.map((comp) => (
                <button
                  key={comp}
                  onClick={() => setComplexityFilter(comp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    complexityFilter === comp
                      ? "bg-[rgba(16,185,129,0.2)] text-[#34D399] border border-[#10B981]"
                      : "bg-[rgba(255,255,255,0.03)] text-gray-400 border border-transparent hover:text-white"
                  }`}
                >
                  {comp === "all" ? "All" : comp}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Showing {filtered.length} of {businessOperations.length} operations
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((op, index) => (
          <motion.button
            key={op.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => trackOperation(op.id)}
            className={`glass-card p-5 text-left cursor-pointer transition-all ${
              selectedOperation === op.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{op.emoji}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${complexityColor(op.complexity)}`}>
                {op.complexity}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-1">{op.name}</h3>
            <p className="text-xs text-gray-400">{op.shortDescription}</p>
            <span className="badge-primary mt-2 inline-block text-[10px]">{op.category}</span>
          </motion.button>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedOperation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto !bg-[rgba(10,15,30,0.95)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selected.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="badge-primary text-[10px]">{selected.category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${complexityColor(selected.complexity)}`}>
                        {selected.complexity}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOperation(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>

              <p className="text-gray-300 mb-4">{selected.fullDescription}</p>

              <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 mb-4">
                <span className="text-[#10B981] font-semibold text-sm block mb-1">Real-World Example:</span>
                <span className="text-gray-300 text-sm">{selected.realWorldExample}</span>
              </div>

              <div className="bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] rounded-xl p-4">
                <span className="text-[#FFD700] font-semibold text-sm block mb-1">Fun Fact:</span>
                <span className="text-gray-300 text-sm">{selected.funFact}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
