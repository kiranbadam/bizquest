"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/business-basics", label: "Business Basics", icon: "🏢" },
  { href: "/quiz", label: "Quiz", icon: "📝" },
  { href: "/career-path", label: "Career Path", icon: "🎓" },
  { href: "/operations", label: "Operations", icon: "📋" },
  { href: "/heroes", label: "Heroes", icon: "🌟" },
  { href: "/shark-tank", label: "Shark Tank", icon: "🦈" },
  { href: "/biz-mentor", label: "Biz Mentor", icon: "🤖" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl dollar-spin inline-block">💼</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#10B981] to-[#FFD700] bg-clip-text text-transparent">
              BizQuest
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                  ${
                    pathname === link.href
                      ? "bg-[rgba(16,185,129,0.15)] text-[#34D399] border border-[rgba(16,185,129,0.3)]"
                      : "text-gray-400 hover:text-white hover:bg-[rgba(16,185,129,0.08)]"
                  }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[rgba(16,185,129,0.1)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[rgba(16,185,129,0.15)] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${
                      pathname === link.href
                        ? "bg-[rgba(16,185,129,0.15)] text-[#34D399]"
                        : "text-gray-400 hover:text-white hover:bg-[rgba(16,185,129,0.08)]"
                    }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
