"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions, quizCategories, type QuizCategory } from "@/data/quiz-questions";

type QuizMode = "quick" | "marathon";
type QuizState = "menu" | "playing" | "results";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("menu");
  const [mode, setMode] = useState<QuizMode>("quick");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | "all">("all");
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stars, setStars] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bizquest-best");
    if (saved) setPersonalBest(parseInt(saved));
  }, []);

  const startQuiz = useCallback((quizMode: QuizMode, category: QuizCategory | "all") => {
    let filtered = category === "all" ? quizQuestions : quizQuestions.filter((q) => q.category === category);
    filtered = shuffleArray(filtered);
    if (quizMode === "quick") filtered = filtered.slice(0, 10);
    setQuestions(filtered);
    setMode(quizMode);
    setSelectedCategory(category);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setState("playing");
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === questions[currentIndex].correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      const percentage = Math.round((score / questions.length) * 100);
      const earnedStars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;
      setStars(earnedStars);

      if (score > personalBest) {
        setPersonalBest(score);
        localStorage.setItem("bizquest-best", score.toString());
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }

      setState("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti absolute"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#10B981", "#FFD700", "#E74C3C", "#3B82F6", "#9B59B6"][i % 5],
                width: "10px",
                height: "10px",
                borderRadius: i % 2 === 0 ? "50%" : "0",
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-3xl mr-2">📝</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Biz Quiz
          </span>
        </h1>
        {state === "menu" && (
          <p className="text-gray-400">Test your business knowledge and earn stars!</p>
        )}
      </motion.div>

      {/* Menu */}
      {state === "menu" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {personalBest > 0 && (
            <div className="glass-card p-4 mb-6 text-center">
              <span className="text-[#FFD700]">Personal Best: {personalBest} correct</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => startQuiz("quick", selectedCategory)}
              className="glass-card p-6 text-left hover:!border-[#10B981] transition-all"
            >
              <span className="text-3xl block mb-2">⚡</span>
              <h3 className="text-lg font-bold text-white">Quick Round</h3>
              <p className="text-sm text-gray-400">10 random questions — fast and fun</p>
            </button>
            <button
              onClick={() => startQuiz("marathon", selectedCategory)}
              className="glass-card p-6 text-left hover:!border-[#FFD700] transition-all"
            >
              <span className="text-3xl block mb-2">🏆</span>
              <h3 className="text-lg font-bold text-white">Marathon</h3>
              <p className="text-sm text-gray-400">All questions in your category</p>
            </button>
          </div>

          <h2 className="text-lg font-semibold text-white mb-4">Choose a Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`glass-card p-4 text-center transition-all ${
                selectedCategory === "all" ? "!border-[#10B981] !bg-[rgba(16,185,129,0.15)]" : ""
              }`}
            >
              <span className="text-2xl block mb-1">🎯</span>
              <span className="text-sm font-medium text-white">All Categories</span>
              <span className="text-xs text-gray-400 block">{quizQuestions.length} questions</span>
            </button>
            {quizCategories.map((cat) => {
              const count = quizQuestions.filter((q) => q.category === cat.name).length;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`glass-card p-4 text-center transition-all ${
                    selectedCategory === cat.name ? "!border-[#10B981] !bg-[rgba(16,185,129,0.15)]" : ""
                  }`}
                >
                  <span className="text-2xl block mb-1">{cat.emoji}</span>
                  <span className="text-sm font-medium text-white">{cat.name}</span>
                  <span className="text-xs text-gray-400 block">{count} questions</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Playing */}
      {state === "playing" && currentQuestion && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-[#FFD700]">Score: {score}</span>
          </div>
          <div className="progress-bar mb-6">
            <div
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-6 mb-4">
                <span className="badge-primary mb-3 inline-block">{currentQuestion.category}</span>
                <h2 className="text-xl font-bold text-white">{currentQuestion.question}</h2>
              </div>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  let buttonStyle = "glass-card";
                  if (selectedAnswer !== null) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonStyle = "glass-card !border-green-500 !bg-[rgba(46,204,113,0.15)]";
                    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                      buttonStyle = "glass-card !border-red-500 !bg-[rgba(231,76,60,0.15)]";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`${buttonStyle} p-4 text-left w-full transition-all ${
                        selectedAnswer === null ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center text-sm font-bold text-[#10B981] shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-200">{option}</span>
                        {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                          <span className="ml-auto text-green-400">&#10003;</span>
                        )}
                        {selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                          <span className="ml-auto text-red-400">&#10007;</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4 mb-6 !border-[rgba(255,215,0,0.3)] !bg-[rgba(255,215,0,0.05)]"
                >
                  <span className="text-[#FFD700] font-semibold text-sm block mb-1">Explanation</span>
                  <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {selectedAnswer !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <button onClick={nextQuestion} className="btn-primary">
                    {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Results */}
      {state === "results" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 text-center"
        >
          <div className="text-5xl mb-4">
            {stars >= 3 ? "🏆" : stars >= 2 ? "🌟" : stars >= 1 ? "⭐" : "📚"}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-300 mb-4">
            You got <span className="text-[#FFD700] font-bold">{score}</span> out of{" "}
            <span className="text-[#10B981] font-bold">{questions.length}</span> correct
          </p>
          <p className="text-lg text-gray-400 mb-2">
            {Math.round((score / questions.length) * 100)}%
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-3xl ${s <= stars ? "opacity-100" : "opacity-20"}`}>
                ⭐
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setState("menu")} className="btn-secondary">
              Back to Menu
            </button>
            <button onClick={() => startQuiz(mode, selectedCategory)} className="btn-primary">
              Play Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
