"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { incrementMentorMessages, unlockAchievement, addXP } from "@/lib/progress";

interface AchievementToast {
  name: string;
  emoji: string;
  xp: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What does a CEO actually do all day?",
  "How do I start my own business as a kid?",
  "What's the difference between revenue and profit?",
  "Tell me about how Apple got started",
  "What is the stock market and how does it work?",
  "What makes a great marketing campaign?",
  "What's the hardest part about running a business?",
  "Can you explain what a startup is?",
  "What business skills should I learn right now?",
  "How do entrepreneurs get funding for their ideas?",
  "What are the most successful businesses ever?",
  "What's the best advice for a young entrepreneur?",
];

export default function BizMentorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<AchievementToast | null>(null);

  const showToast = (t: AchievementToast) => {
    setToast(t);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // Track mentor messages for achievement
    addXP(5);
    const progress = incrementMentorMessages();
    if (progress.mentorMessages >= 5) {
      const result = unlockAchievement("mentors-friend");
      if (result.unlocked && result.achievement) {
        showToast({ name: result.achievement.name, emoji: result.achievement.emoji, xp: result.xpGained });
      }
    }

    try {
      const response = await fetch("/api/biz-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setError("Failed to connect to Biz Mentor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto flex flex-col">
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
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-3xl mr-2">🤖</span>
          <span className="bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
            Biz Mentor
          </span>
        </h1>
        <p className="text-gray-400">Your AI business coach — ask anything about business and entrepreneurship!</p>
      </motion.div>

      {/* Chat Area */}
      <div className="glass-card flex-1 flex flex-col min-h-[500px] max-h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <span className="text-5xl mb-4 float inline-block">💼</span>
              <p className="text-gray-400 text-center mb-6">
                Hi there! I&apos;m your Biz Mentor. Ask me anything about business, entrepreneurship, famous companies, or how to start your own venture!
              </p>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl w-full">
                {suggestedQuestions.slice(0, 6).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-left text-sm p-3 rounded-xl bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.12)] text-gray-300 hover:bg-[rgba(16,185,129,0.12)] hover:border-[rgba(16,185,129,0.25)] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* More suggestions toggle */}
              <details className="mt-3 w-full max-w-xl">
                <summary className="text-xs text-gray-500 cursor-pointer text-center hover:text-gray-300">
                  More question ideas...
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {suggestedQuestions.slice(6).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-left text-sm p-3 rounded-xl bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.12)] text-gray-300 hover:bg-[rgba(16,185,129,0.12)] hover:border-[rgba(16,185,129,0.25)] transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#10B981] text-white rounded-br-sm"
                        : "bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.15)] text-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <span className="text-xs text-[#FFD700] font-semibold block mb-1">Biz Mentor</span>
                    )}
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.15)] p-3.5 rounded-2xl rounded-bl-sm">
                    <span className="text-xs text-[#FFD700] font-semibold block mb-1">Biz Mentor</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="text-center p-3 bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[rgba(16,185,129,0.15)]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Ask me anything about business..."
              className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#10B981] transition-colors text-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="btn-primary px-5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
