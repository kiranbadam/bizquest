"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  businessTypes,
  simulateRound,
  getBusinessTitle,
  getStarRating,
  type BusinessType,
  type PricingTier,
  type MarketingOption,
  type QualityLevel,
  type HiringOption,
  type RoundResult,
} from "@/data/startup-sim";
import { unlockAchievement, addXP, setStartupCompleted } from "@/lib/progress";

type GameState = "setup" | "playing" | "results";

interface AchievementToast {
  name: string;
  emoji: string;
  xp: number;
}

export default function MyStartupPage() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessType | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [currentMonth, setCurrentMonth] = useState(1);
  const [budget, setBudget] = useState(1000);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [showRoundResult, setShowRoundResult] = useState(false);

  // Decisions
  const [pricing, setPricing] = useState<PricingTier>("medium");
  const [marketing, setMarketing] = useState<MarketingOption>("none");
  const [quality, setQuality] = useState<QualityLevel>("basic");
  const [hiring, setHiring] = useState<HiringOption>("solo");

  // Saved best
  const [bestProfit, setBestProfit] = useState<number | null>(null);

  // Achievement toast
  const [toast, setToast] = useState<AchievementToast | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bizquest-startup-best");
    if (saved) setBestProfit(parseFloat(saved));
  }, []);

  const showToast = (t: AchievementToast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  const launchBusiness = () => {
    if (!selectedBusiness || !businessName.trim()) return;
    setGameState("playing");
    setCurrentMonth(1);
    setBudget(1000);
    setRoundResults([]);
    setShowRoundResult(false);
  };

  const endMonth = () => {
    if (!selectedBusiness) return;
    const prevSatisfaction = roundResults.length > 0
      ? roundResults[roundResults.length - 1].satisfaction
      : 70;

    const result = simulateRound(
      selectedBusiness,
      { pricing, marketing, quality, hiring },
      currentMonth,
      prevSatisfaction
    );

    const newResults = [...roundResults, result];
    setRoundResults(newResults);
    setBudget((prev) => Math.round((prev + result.profit) * 100) / 100);
    setShowRoundResult(true);

    // Award small XP for each round
    addXP(10);
  };

  const nextMonth = () => {
    if (currentMonth >= 5) {
      finishGame();
    } else {
      setCurrentMonth((m) => m + 1);
      setShowRoundResult(false);
      setPricing("medium");
      setMarketing("none");
      setQuality("basic");
      setHiring("solo");
    }
  };

  const finishGame = () => {
    const totalProfit = roundResults.reduce((sum, r) => sum + r.profit, 0);
    const roundedProfit = Math.round(totalProfit * 100) / 100;

    // Save best
    if (bestProfit === null || roundedProfit > bestProfit) {
      setBestProfit(roundedProfit);
      localStorage.setItem("bizquest-startup-best", roundedProfit.toString());
    }

    // Track progress
    setStartupCompleted(roundedProfit);

    // Unlock achievements
    const founderResult = unlockAchievement("startup-founder");
    if (founderResult.unlocked && founderResult.achievement) {
      showToast({ name: founderResult.achievement.name, emoji: founderResult.achievement.emoji, xp: founderResult.xpGained });
    }

    if (roundedProfit >= 5000) {
      setTimeout(() => {
        const profitResult = unlockAchievement("profit-master");
        if (profitResult.unlocked && profitResult.achievement) {
          showToast({ name: profitResult.achievement.name, emoji: profitResult.achievement.emoji, xp: profitResult.xpGained });
        }
      }, 1500);
    }

    setGameState("results");
  };

  const playAgain = () => {
    setGameState("setup");
    setSelectedBusiness(null);
    setBusinessName("");
    setRoundResults([]);
    setShowRoundResult(false);
    setBudget(1000);
    setCurrentMonth(1);
  };

  const tryDifferent = () => {
    setGameState("setup");
    setBusinessName("");
    setRoundResults([]);
    setShowRoundResult(false);
    setBudget(1000);
    setCurrentMonth(1);
  };

  const totalProfit = roundResults.reduce((sum, r) => sum + r.profit, 0);
  const avgSatisfaction = roundResults.length > 0
    ? Math.round(roundResults.reduce((sum, r) => sum + r.satisfaction, 0) / roundResults.length)
    : 0;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
      {/* Achievement Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
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
          <span className="text-3xl mr-2">{"\uD83C\uDFEA"}</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            My Startup
          </span>
        </h1>
        <p className="text-gray-400">Build your own business and make it profitable!</p>
      </motion.div>

      {/* SETUP SCREEN */}
      {gameState === "setup" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {bestProfit !== null && (
            <div className="glass-card p-4 mb-6 text-center">
              <span className="text-[#FFD700]">Best Profit: ${bestProfit.toLocaleString()}</span>
            </div>
          )}

          <h2 className="text-xl font-bold text-white mb-4 text-center">Choose Your Business</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {businessTypes.map((biz, index) => (
              <motion.button
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedBusiness(biz)}
                className={`glass-card p-5 text-left cursor-pointer transition-all ${
                  selectedBusiness?.id === biz.id ? "!border-[#FFD700] !bg-[rgba(255,215,0,0.1)]" : ""
                }`}
              >
                <span className="text-4xl block mb-3">{biz.emoji}</span>
                <h3 className="text-lg font-bold text-white mb-1">{biz.name}</h3>
                <p className="text-sm text-gray-400">{biz.description}</p>
              </motion.button>
            ))}
          </div>

          {selectedBusiness && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 max-w-md mx-auto"
            >
              <label className="text-sm font-semibold text-[#FFD700] block mb-2">
                Name Your {selectedBusiness.name}
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && launchBusiness()}
                placeholder={`e.g. "Super ${selectedBusiness.name}"`}
                maxLength={30}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#10B981] transition-colors text-sm mb-4"
              />
              <button
                onClick={launchBusiness}
                disabled={!businessName.trim()}
                className="btn-primary w-full disabled:opacity-30 disabled:cursor-not-allowed text-lg py-3"
              >
                {"\uD83D\uDE80"} Launch!
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === "playing" && selectedBusiness && (
        <div>
          {/* Stats Banner */}
          <div className="glass-card p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedBusiness.emoji}</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{businessName}</h3>
                  <span className="text-xs text-gray-400">{selectedBusiness.name}</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <span className="text-gray-400 block text-xs">Month</span>
                  <span className="text-white font-bold">{currentMonth}/5</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 block text-xs">Budget</span>
                  <span className={`font-bold ${budget >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                    ${budget.toLocaleString()}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 block text-xs">Total Profit</span>
                  <span className={`font-bold ${totalProfit >= 0 ? "text-[#FFD700]" : "text-red-400"}`}>
                    ${Math.round(totalProfit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="progress-bar mt-3">
              <div className="progress-fill" style={{ width: `${(currentMonth / 5) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showRoundResult ? (
              /* Decision Cards */
              <motion.div
                key="decisions"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <h2 className="text-lg font-bold text-white mb-4">Month {currentMonth} Decisions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Pricing */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold text-[#FFD700] mb-3">{"\uD83C\uDFF7\uFE0F"} Pricing</h3>
                    <div className="space-y-2">
                      {(["low", "medium", "premium"] as PricingTier[]).map((tier) => (
                        <button
                          key={tier}
                          onClick={() => setPricing(tier)}
                          className={`w-full p-2.5 rounded-lg text-left text-sm transition-all ${
                            pricing === tier
                              ? "bg-[rgba(16,185,129,0.2)] border border-[#10B981] text-white"
                              : "bg-[rgba(255,255,255,0.03)] border border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          {tier === "low" && "\uD83D\uDFE2 Low — More customers, less per sale"}
                          {tier === "medium" && "\uD83D\uDFE1 Medium — Balanced approach"}
                          {tier === "premium" && "\uD83D\uDD34 Premium — Fewer customers, more per sale"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold text-[#FFD700] mb-3">{"\uD83D\uDCE3"} Marketing</h3>
                    <div className="space-y-2">
                      {([
                        { key: "none" as MarketingOption, label: "\u274C None — Save money", cost: "$0" },
                        { key: "flyers" as MarketingOption, label: "\uD83D\uDCCB Flyers", cost: "$50" },
                        { key: "social" as MarketingOption, label: "\uD83D\uDCF1 Social Media", cost: "$100" },
                        { key: "influencer" as MarketingOption, label: "\u2B50 Influencer", cost: "$200" },
                      ]).map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => setMarketing(opt.key)}
                          className={`w-full p-2.5 rounded-lg text-left text-sm transition-all flex justify-between ${
                            marketing === opt.key
                              ? "bg-[rgba(16,185,129,0.2)] border border-[#10B981] text-white"
                              : "bg-[rgba(255,255,255,0.03)] border border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className="text-xs opacity-60">{opt.cost}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quality */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold text-[#FFD700] mb-3">{"\u2728"} Quality</h3>
                    <div className="space-y-2">
                      {(["basic", "premium"] as QualityLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => setQuality(level)}
                          className={`w-full p-2.5 rounded-lg text-left text-sm transition-all ${
                            quality === level
                              ? "bg-[rgba(16,185,129,0.2)] border border-[#10B981] text-white"
                              : "bg-[rgba(255,255,255,0.03)] border border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          {level === "basic" && "\uD83D\uDCE6 Basic — Lower costs, decent satisfaction"}
                          {level === "premium" && "\uD83D\uDC8E Premium — Higher costs, happier customers"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hiring */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-semibold text-[#FFD700] mb-3">{"\uD83D\uDC65"} Staffing</h3>
                    <div className="space-y-2">
                      {(["solo", "hire"] as HiringOption[]).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setHiring(opt)}
                          className={`w-full p-2.5 rounded-lg text-left text-sm transition-all ${
                            hiring === opt
                              ? "bg-[rgba(16,185,129,0.2)] border border-[#10B981] text-white"
                              : "bg-[rgba(255,255,255,0.03)] border border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          {opt === "solo" && "\uD83E\uDDD1 Do It Yourself — Free, limited capacity"}
                          {opt === "hire" && "\uD83D\uDC65 Hire Help — $150/mo, more capacity"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={endMonth} className="btn-primary px-10 py-3 text-lg">
                    End Month {currentMonth}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Round Results */
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {roundResults.length > 0 && (() => {
                  const result = roundResults[roundResults.length - 1];
                  return (
                    <div className="glass-card p-6 mb-6">
                      <h2 className="text-xl font-bold text-white mb-4 text-center">
                        Month {result.month} Results
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 rounded-xl bg-[rgba(16,185,129,0.08)]">
                          <span className="text-2xl block">{"\uD83D\uDC65"}</span>
                          <span className="text-xs text-gray-400 block">Customers</span>
                          <span className="text-lg font-bold text-white">{result.customers}</span>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-[rgba(16,185,129,0.08)]">
                          <span className="text-2xl block">{"\uD83D\uDCB5"}</span>
                          <span className="text-xs text-gray-400 block">Revenue</span>
                          <span className="text-lg font-bold text-[#10B981]">${result.revenue.toLocaleString()}</span>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-[rgba(16,185,129,0.08)]">
                          <span className="text-2xl block">{"\uD83D\uDCB8"}</span>
                          <span className="text-xs text-gray-400 block">Expenses</span>
                          <span className="text-lg font-bold text-red-400">${result.expenses.toLocaleString()}</span>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-[rgba(16,185,129,0.08)]">
                          <span className="text-2xl block">{result.profit >= 0 ? "\uD83D\uDCC8" : "\uD83D\uDCC9"}</span>
                          <span className="text-xs text-gray-400 block">Profit</span>
                          <span className={`text-lg font-bold ${result.profit >= 0 ? "text-[#FFD700]" : "text-red-400"}`}>
                            ${result.profit.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Satisfaction Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Customer Satisfaction</span>
                          <span className="text-white">{result.satisfaction}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${result.satisfaction}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button onClick={nextMonth} className="btn-primary px-8">
                          {currentMonth >= 5 ? "See Final Report" : `Start Month ${currentMonth + 1}`}
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {gameState === "results" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          {(() => {
            const finalProfit = Math.round(totalProfit * 100) / 100;
            const title = getBusinessTitle(finalProfit, avgSatisfaction);
            const stars = getStarRating(finalProfit, avgSatisfaction);

            return (
              <>
                <div className="text-5xl mb-2">{title.emoji}</div>
                <h2 className="text-3xl font-bold text-white mb-1">{title.title}</h2>
                <p className="text-gray-400 mb-6">Business Report Card for {businessName}</p>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-3xl ${s <= stars ? "opacity-100" : "opacity-20"}`}>
                      {"\u2B50"}
                    </span>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
                  <div className="glass-card p-4 !bg-[rgba(16,185,129,0.05)]">
                    <span className="text-xs text-gray-400 block">Total Profit</span>
                    <span className={`text-xl font-bold ${finalProfit >= 0 ? "text-[#FFD700]" : "text-red-400"}`}>
                      ${finalProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="glass-card p-4 !bg-[rgba(16,185,129,0.05)]">
                    <span className="text-xs text-gray-400 block">Customer Rating</span>
                    <span className="text-xl font-bold text-white">{avgSatisfaction}%</span>
                  </div>
                  <div className="glass-card p-4 !bg-[rgba(16,185,129,0.05)]">
                    <span className="text-xs text-gray-400 block">Total Customers</span>
                    <span className="text-xl font-bold text-white">
                      {roundResults.reduce((sum, r) => sum + r.customers, 0)}
                    </span>
                  </div>
                  <div className="glass-card p-4 !bg-[rgba(16,185,129,0.05)]">
                    <span className="text-xs text-gray-400 block">Total Revenue</span>
                    <span className="text-xl font-bold text-[#10B981]">
                      ${Math.round(roundResults.reduce((sum, r) => sum + r.revenue, 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="max-w-2xl mx-auto mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Monthly Breakdown</h3>
                  <div className="space-y-2">
                    {roundResults.map((r) => (
                      <div key={r.month} className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500 w-16">Month {r.month}</span>
                        <div className="flex-1 h-2 rounded-full bg-[rgba(16,185,129,0.1)] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.max(0, Math.min(100, (r.profit / (Math.max(...roundResults.map(rr => Math.abs(rr.profit))) || 1)) * 50 + 50))}%`,
                              background: r.profit >= 0
                                ? "linear-gradient(90deg, #10B981, #FFD700)"
                                : "linear-gradient(90deg, #EF4444, #F59E0B)",
                            }}
                          />
                        </div>
                        <span className={`w-20 text-right font-medium ${r.profit >= 0 ? "text-[#10B981]" : "text-red-400"}`}>
                          ${r.profit.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={playAgain} className="btn-secondary">
                    Play Again
                  </button>
                  <button onClick={tryDifferent} className="btn-primary">
                    Try Different Business
                  </button>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
