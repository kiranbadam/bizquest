"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { getProgress, getLevel, getNextLevel } from "@/lib/progress";

export default function ProgressDashboard() {
  const [progress, setProgress] = useState<ReturnType<typeof getProgress> | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  const level = getLevel(progress.xp);
  const nextLevel = getNextLevel(progress.xp);
  const xpProgress = nextLevel
    ? ((progress.xp - level.minXP) / (nextLevel.minXP - level.minXP)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-6 mb-8 max-w-4xl mx-auto"
    >
      {/* Level & XP Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{level.emoji}</span>
          <div>
            <h2 className="text-lg font-bold text-white">Level: {level.name}</h2>
            <p className="text-xs text-gray-400">{progress.xp} XP total</p>
          </div>
        </div>
        {nextLevel && (
          <div className="text-right text-xs text-gray-400">
            <span>{nextLevel.minXP - progress.xp} XP to {nextLevel.name}</span>
          </div>
        )}
      </div>

      {/* XP Bar */}
      <div className="progress-bar mb-6">
        <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
      </div>

      {/* Achievement Grid */}
      <h3 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-3">
        Achievements ({progress.unlockedAchievements.length}/{achievements.length})
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {achievements.map((a) => {
          const unlocked = progress.unlockedAchievements.includes(a.id);
          return (
            <div
              key={a.id}
              className={`relative p-3 rounded-xl text-center transition-all ${
                unlocked
                  ? "bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]"
                  : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] opacity-50"
              }`}
              title={unlocked ? `${a.name}: ${a.description}` : `Locked: ${a.description}`}
            >
              <span className={`text-2xl block mb-1 ${unlocked ? "" : "grayscale"}`}>
                {unlocked ? a.emoji : "\uD83D\uDD12"}
              </span>
              <span className={`text-[10px] block font-medium ${unlocked ? "text-white" : "text-gray-500"}`}>
                {a.name}
              </span>
              {unlocked && (
                <span className="text-[9px] text-[#10B981] block">+{a.xp} XP</span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
