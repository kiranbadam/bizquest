"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessMoments, pitchScenarios } from "@/data/shark-tank";
import { updateTracking, unlockAchievement, addXP } from "@/lib/progress";

interface AchievementToast {
  name: string;
  emoji: string;
  xp: number;
}

export default function SharkTankPage() {
  const [selectedMoment, setSelectedMoment] = useState<number | null>(null);
  const [revealedQuotes, setRevealedQuotes] = useState<Set<number>>(new Set());
  const [pitchMode, setPitchMode] = useState(false);
  const [pitchIndex, setPitchIndex] = useState(0);
  const [userDecision, setUserDecision] = useState<"invest" | "pass" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [toast, setToast] = useState<AchievementToast | null>(null);

  const showToast = (t: AchievementToast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  const selected = businessMoments.find((m) => m.id === selectedMoment);

  const revealQuote = (id: number) => {
    setRevealedQuotes((prev) => new Set([...prev, id]));
  };

  const handleDecision = (decision: "invest" | "pass") => {
    setUserDecision(decision);
    setShowResult(true);
    addXP(15);
    const progress = updateTracking("completedPitches", currentPitch.id);
    if (progress.completedPitches.length >= 5) {
      const result = unlockAchievement("shark");
      if (result.unlocked && result.achievement) {
        showToast({ name: result.achievement.name, emoji: result.achievement.emoji, xp: result.xpGained });
      }
    }
  };

  const nextPitch = () => {
    setPitchIndex((i) => (i + 1) % pitchScenarios.length);
    setUserDecision(null);
    setShowResult(false);
  };

  const currentPitch = pitchScenarios[pitchIndex];

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
          <span className="text-3xl mr-2">🦈</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Shark Tank Challenge
          </span>
        </h1>
        <p className="text-gray-400">Famous business moments and pitch evaluation challenges</p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setPitchMode(false)}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            !pitchMode ? "btn-primary" : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Famous Moments
        </button>
        <button
          onClick={() => setPitchMode(true)}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            pitchMode ? "btn-primary" : "glass-card text-gray-400 hover:text-white"
          }`}
        >
          Pitch Evaluator
        </button>
      </div>

      {!pitchMode ? (
        <>
          {/* Moments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {businessMoments.map((moment, index) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-5 cursor-pointer transition-all ${
                  selectedMoment === moment.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.08)]" : ""
                }`}
                onClick={() => setSelectedMoment(selectedMoment === moment.id ? null : moment.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{moment.emoji}</span>
                  <div className="flex items-center gap-2">
                    <span className="badge-secondary text-[10px]">{moment.year}</span>
                    <span className="badge-primary text-[10px]">{moment.category}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{moment.title}</h3>
                <p className="text-sm text-gray-400">{moment.shortDescription}</p>

                {/* Dramatic Quote Reveal */}
                <div className="mt-4">
                  {revealedQuotes.has(moment.id) ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] rounded-xl p-3"
                    >
                      <p className="text-sm text-gray-200 italic">
                        &ldquo;{moment.dramaticQuote}&rdquo;
                      </p>
                      <p className="text-xs text-[#FFD700] mt-1">— {moment.quoteAttribution}</p>
                    </motion.div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        revealQuote(moment.id);
                      }}
                      className="btn-secondary text-xs py-2"
                    >
                      Reveal Famous Quote
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Story */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedMoment(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto !bg-[rgba(10,15,30,0.95)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>{selected.emoji}</span>
                        {selected.title}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="badge-secondary text-[10px]">{selected.year}</span>
                        <span className="badge-primary text-[10px]">{selected.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMoment(null)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      &times;
                    </button>
                  </div>

                  <p className="text-gray-300 mb-4">{selected.fullStory}</p>

                  <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 mb-4">
                    <p className="text-gray-200 italic">
                      &ldquo;{selected.dramaticQuote}&rdquo;
                    </p>
                    <p className="text-[#FFD700] text-sm mt-2">— {selected.quoteAttribution}</p>
                  </div>

                  <div className="bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] rounded-xl p-4">
                    <span className="text-[#FFD700] font-semibold text-sm block mb-1">Impact:</span>
                    <span className="text-gray-300 text-sm">{selected.impact}</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Pitch Evaluator */
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">{currentPitch.emoji}</span>
              <h3 className="text-xl font-bold text-white">{currentPitch.title}</h3>
              <span className="badge-secondary mt-2 inline-block">Asking: {currentPitch.askAmount}</span>
            </div>

            <p className="text-gray-300 mb-6">{currentPitch.description}</p>

            {!showResult ? (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDecision("invest")}
                  className="btn-primary px-8 py-3 text-lg"
                >
                  💰 Invest!
                </button>
                <button
                  onClick={() => handleDecision("pass")}
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  👋 Pass
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* User Decision Result */}
                <div
                  className={`p-4 rounded-xl mb-4 ${
                    userDecision === currentPitch.verdict
                      ? "bg-[rgba(46,204,113,0.1)] border border-green-500/30"
                      : "bg-[rgba(231,76,60,0.1)] border border-red-500/30"
                  }`}
                >
                  <p className={`font-bold text-lg ${userDecision === currentPitch.verdict ? "text-green-400" : "text-red-400"}`}>
                    {userDecision === currentPitch.verdict
                      ? "Great call! You matched the expert opinion!"
                      : "Interesting choice! The experts disagreed."}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Expert verdict: <span className="text-[#FFD700] font-medium capitalize">{currentPitch.verdict}</span>
                  </p>
                </div>

                {/* Explanation */}
                <div className="glass-card p-4 mb-4 !bg-[rgba(16,185,129,0.05)]">
                  <span className="text-[#10B981] font-semibold text-sm block mb-2">Analysis:</span>
                  <p className="text-gray-300 text-sm mb-3">{currentPitch.explanation}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-green-400 font-semibold text-xs block mb-1">Strengths:</span>
                      <ul className="space-y-1">
                        {currentPitch.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-1">
                            <span className="text-green-400 mt-0.5">+</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-red-400 font-semibold text-xs block mb-1">Weaknesses:</span>
                      <ul className="space-y-1">
                        {currentPitch.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-1">
                            <span className="text-red-400 mt-0.5">-</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button onClick={nextPitch} className="btn-primary w-full">
                  Next Pitch ({pitchIndex + 1}/{pitchScenarios.length})
                </button>
              </motion.div>
            )}

            <p className="text-center text-xs text-gray-500 mt-4">
              Pitch {pitchIndex + 1} of {pitchScenarios.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
