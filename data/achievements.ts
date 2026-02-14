export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  xp: number;
}

export const achievements: Achievement[] = [
  { id: "first-day", name: "First Day", emoji: "\uD83C\uDF92", description: "Visit the app for the first time", xp: 50 },
  { id: "business-student", name: "Business Student", emoji: "\uD83C\uDFE2", description: "Explore all 13 Business Basics items", xp: 150 },
  { id: "quiz-whiz", name: "Quiz Whiz", emoji: "\uD83D\uDCDD", description: "Score 80%+ on any quiz", xp: 100 },
  { id: "quiz-master", name: "Quiz Master", emoji: "\uD83C\uDFC6", description: "Score 90%+ on a marathon quiz", xp: 200 },
  { id: "career-explorer", name: "Career Explorer", emoji: "\uD83C\uDF93", description: "View all 7 career stages and all 7 specialties", xp: 150 },
  { id: "operations-pro", name: "Operations Pro", emoji: "\uD83D\uDCCB", description: "Read all 20 business operations", xp: 150 },
  { id: "hero-worshipper", name: "Hero Worshipper", emoji: "\u2B50", description: "Expand and read all 9 business heroes", xp: 100 },
  { id: "shark", name: "Shark", emoji: "\uD83E\uDD88", description: "Complete all 5 pitch evaluations", xp: 150 },
  { id: "mentors-friend", name: "Mentor's Friend", emoji: "\uD83E\uDD16", description: "Send 5+ messages to Biz Mentor", xp: 100 },
  { id: "startup-founder", name: "Startup Founder", emoji: "\uD83C\uDFEA", description: "Complete the My Startup simulator", xp: 150 },
  { id: "profit-master", name: "Profit Master", emoji: "\uD83D\uDCB0", description: "Earn $5,000+ total profit in My Startup", xp: 200 },
  { id: "bizquest-champion", name: "BizQuest Champion", emoji: "\uD83D\uDC51", description: "Earn all other badges", xp: 200 },
];

export interface Level {
  name: string;
  minXP: number;
  emoji: string;
}

export const levels: Level[] = [
  { name: "Intern", minXP: 0, emoji: "\uD83D\uDCBC" },
  { name: "Associate", minXP: 100, emoji: "\uD83D\uDCCA" },
  { name: "Manager", minXP: 300, emoji: "\uD83D\uDCC8" },
  { name: "Director", minXP: 600, emoji: "\u2B50" },
  { name: "VP", minXP: 1000, emoji: "\uD83D\uDE80" },
  { name: "CEO", minXP: 1500, emoji: "\uD83D\uDC51" },
];
