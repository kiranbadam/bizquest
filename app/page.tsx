"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { businessFacts, businessQuotes } from "@/data/business-facts";

const navCards = [
  { href: "/business-basics", emoji: "🏢", title: "Business Basics", description: "Explore business types, departments & how companies work" },
  { href: "/quiz", emoji: "📝", title: "Biz Quiz", description: "Test your business knowledge across 6 categories" },
  { href: "/career-path", emoji: "🎓", title: "Career Path", description: "Your journey from student to CEO or entrepreneur" },
  { href: "/operations", emoji: "📋", title: "Operations", description: "20 business operations from planning to scaling" },
  { href: "/heroes", emoji: "🌟", title: "Business Heroes", description: "Meet 9 pioneers who changed the world through business" },
  { href: "/shark-tank", emoji: "🦈", title: "Shark Tank", description: "Famous business moments & pitch evaluation challenges" },
  { href: "/biz-mentor", emoji: "🤖", title: "Biz Mentor", description: "Chat with your AI business coach" },
];

export default function Home() {
  const [dailyFact, setDailyFact] = useState(businessFacts[0]);
  const [currentQuote, setCurrentQuote] = useState(businessQuotes[0]);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setDailyFact(businessFacts[dayOfYear % businessFacts.length]);
    setCurrentQuote(businessQuotes[dayOfYear % businessQuotes.length]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        const currentIndex = businessQuotes.findIndex((q) => q.id === prev.id);
        return businessQuotes[(currentIndex + 1) % businessQuotes.length];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        {/* Animated Briefcase */}
        <div className="text-7xl mb-6 dollar-spin inline-block">💼</div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
            Biz
          </span>
          <span className="gold-shimmer">Quest</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
          Your interactive journey into the world of business and entrepreneurship.
          Explore, learn, and discover your path to business success!
        </p>

        {/* Trend Line SVG */}
        <svg
          className="mx-auto mb-8"
          width="200"
          height="30"
          viewBox="0 0 200 30"
        >
          <polyline
            points="0,25 30,20 60,22 90,15 120,18 150,8 180,10 200,2"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            className="trend-line"
          />
        </svg>
      </motion.div>

      {/* Daily Business Fact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card p-6 mb-8 max-w-3xl mx-auto"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h2 className="text-sm font-semibold text-[#FFD700] uppercase tracking-wider mb-1">
              Daily Business Fact
            </h2>
            <p className="text-gray-200 text-lg">{dailyFact.fact}</p>
            <span className="badge-primary mt-2 inline-block">{dailyFact.category}</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {navCards.map((card, index) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
          >
            <Link href={card.href} className="glass-card p-5 block h-full group">
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                {card.emoji}
              </span>
              <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Rotating Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-card p-6 max-w-2xl mx-auto text-center"
      >
        <motion.div
          key={currentQuote.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-300 italic text-lg mb-3">
            &ldquo;{currentQuote.quote}&rdquo;
          </p>
          <p className="text-[#FFD700] font-medium text-sm">
            — {currentQuote.author}
          </p>
          <p className="text-gray-500 text-xs">{currentQuote.role}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
