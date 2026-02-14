"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessHeroes } from "@/data/heroes";
import { updateTracking, unlockAchievement, addXP } from "@/lib/progress";

interface AchievementToast {
  name: string;
  emoji: string;
  xp: number;
}

export default function HeroesPage() {
  const [expandedHero, setExpandedHero] = useState<number | null>(null);
  const [toast, setToast] = useState<AchievementToast | null>(null);

  const showToast = (t: AchievementToast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  const trackHeroExpand = (id: number) => {
    const newId = expandedHero === id ? null : id;
    setExpandedHero(newId);
    if (newId !== null) {
      addXP(10);
      const progress = updateTracking("expandedHeroes", id);
      if (progress.expandedHeroes.length >= 9) {
        const result = unlockAchievement("hero-worshipper");
        if (result.unlocked && result.achievement) {
          showToast({ name: result.achievement.name, emoji: result.achievement.emoji, xp: result.xpGained });
        }
      }
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
          <span className="text-3xl mr-2">🌟</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Business Heroes
          </span>
        </h1>
        <p className="text-gray-400">Meet the pioneers who changed the world through business and innovation</p>
      </motion.div>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {businessHeroes.map((hero, index) => (
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={`glass-card p-5 cursor-pointer transition-all h-full ${
                expandedHero === hero.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.08)]" : ""
              }`}
              onClick={() => trackHeroExpand(hero.id)}
            >
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981] to-[#FFD700] flex items-center justify-center text-2xl shrink-0">
                  {hero.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{hero.name}</h3>
                  <span className="text-xs text-[#FFD700]">{hero.years}</span>
                </div>
              </div>

              <p className="text-xs text-[#34D399] font-medium mb-2">{hero.title}</p>
              <p className="text-sm text-gray-400">{hero.shortBio}</p>

              {/* Expand indicator */}
              <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                <span>{expandedHero === hero.id ? "Click to collapse" : "Click to learn more"}</span>
                <span className={`transition-transform ${expandedHero === hero.id ? "rotate-180" : ""}`}>
                  &#9660;
                </span>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedHero === hero.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[rgba(16,185,129,0.15)] mt-4 pt-4">
                      <p className="text-sm text-gray-300 mb-4">{hero.fullBio}</p>

                      {/* Quote */}
                      <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-200 italic">
                          &ldquo;{hero.famousQuote}&rdquo;
                        </p>
                      </div>

                      {/* Achievements */}
                      <h4 className="text-sm font-semibold text-[#FFD700] mb-2">Key Achievements:</h4>
                      <ul className="space-y-1.5 mb-4">
                        {hero.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="text-[#10B981] mt-0.5">&#9733;</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      {/* Fun Fact */}
                      <div className="bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] rounded-xl p-3">
                        <span className="text-[#FFD700] font-semibold text-xs">Fun Fact: </span>
                        <span className="text-gray-300 text-xs">{hero.funFact}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
