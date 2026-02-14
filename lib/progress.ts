import { achievements, levels } from "@/data/achievements";

const STORAGE_KEY = "bizquest-progress";

export interface ProgressData {
  xp: number;
  unlockedAchievements: string[];
  // Tracking data for various pages
  viewedBasics: number[];
  viewedCareerStages: number[];
  viewedSpecialties: number[];
  viewedOperations: number[];
  expandedHeroes: number[];
  completedPitches: number[];
  mentorMessages: number;
  startupCompleted: boolean;
  startupBestProfit: number;
}

const defaultProgress: ProgressData = {
  xp: 0,
  unlockedAchievements: [],
  viewedBasics: [],
  viewedCareerStages: [],
  viewedSpecialties: [],
  viewedOperations: [],
  expandedHeroes: [],
  completedPitches: [],
  mentorMessages: 0,
  startupCompleted: false,
  startupBestProfit: 0,
};

export function getProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(saved) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addXP(amount: number): { newXP: number; leveledUp: boolean; newLevelName: string | null } {
  const progress = getProgress();
  const oldLevel = getLevel(progress.xp);
  progress.xp += amount;
  const newLevel = getLevel(progress.xp);
  saveProgress(progress);
  return {
    newXP: progress.xp,
    leveledUp: newLevel.name !== oldLevel.name,
    newLevelName: newLevel.name !== oldLevel.name ? newLevel.name : null,
  };
}

export function unlockAchievement(
  achievementId: string
): { unlocked: boolean; achievement: (typeof achievements)[number] | null; xpGained: number } {
  const progress = getProgress();
  if (progress.unlockedAchievements.includes(achievementId)) {
    return { unlocked: false, achievement: null, xpGained: 0 };
  }

  const achievement = achievements.find((a) => a.id === achievementId);
  if (!achievement) return { unlocked: false, achievement: null, xpGained: 0 };

  progress.unlockedAchievements.push(achievementId);
  progress.xp += achievement.xp;
  saveProgress(progress);

  // Check if all other achievements are unlocked (for BizQuest Champion)
  if (achievementId !== "bizquest-champion") {
    const otherAchievements = achievements.filter((a) => a.id !== "bizquest-champion");
    const allOthersUnlocked = otherAchievements.every((a) =>
      progress.unlockedAchievements.includes(a.id)
    );
    if (allOthersUnlocked) {
      // Recursively unlock champion
      unlockAchievement("bizquest-champion");
    }
  }

  return { unlocked: true, achievement, xpGained: achievement.xp };
}

export function getLevel(xp: number) {
  let current = levels[0];
  for (const level of levels) {
    if (xp >= level.minXP) current = level;
    else break;
  }
  return current;
}

export function getNextLevel(xp: number) {
  for (const level of levels) {
    if (xp < level.minXP) return level;
  }
  return null;
}

export function updateTracking(
  key: keyof Pick<
    ProgressData,
    "viewedBasics" | "viewedCareerStages" | "viewedSpecialties" | "viewedOperations" | "expandedHeroes" | "completedPitches"
  >,
  id: number
): ProgressData {
  const progress = getProgress();
  if (!progress[key].includes(id)) {
    progress[key] = [...progress[key], id];
    saveProgress(progress);
  }
  return progress;
}

export function incrementMentorMessages(): ProgressData {
  const progress = getProgress();
  progress.mentorMessages += 1;
  saveProgress(progress);
  return progress;
}

export function setStartupCompleted(profit: number): ProgressData {
  const progress = getProgress();
  progress.startupCompleted = true;
  if (profit > progress.startupBestProfit) {
    progress.startupBestProfit = profit;
  }
  saveProgress(progress);
  return progress;
}
