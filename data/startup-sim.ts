export interface BusinessType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  baseDemand: number;     // base customers per month
  costPerUnit: number;    // base cost to serve each customer
  maxCapacity: number;    // max customers without hiring
  premiumMultiplier: number; // how much premium quality boosts satisfaction
}

export const businessTypes: BusinessType[] = [
  {
    id: "lemonade",
    name: "Lemonade Stand",
    emoji: "\uD83C\uDF4B",
    description: "Classic first business! Sell refreshing lemonade in your neighborhood.",
    baseDemand: 40,
    costPerUnit: 0.5,
    maxCapacity: 30,
    premiumMultiplier: 1.3,
  },
  {
    id: "app-studio",
    name: "App Studio",
    emoji: "\uD83D\uDCF1",
    description: "Build and sell mobile apps and games to users worldwide.",
    baseDemand: 25,
    costPerUnit: 2,
    maxCapacity: 20,
    premiumMultiplier: 1.5,
  },
  {
    id: "tshirt-shop",
    name: "T-Shirt Shop",
    emoji: "\uD83D\uDC55",
    description: "Design and sell custom t-shirts online and at local events.",
    baseDemand: 30,
    costPerUnit: 5,
    maxCapacity: 25,
    premiumMultiplier: 1.4,
  },
  {
    id: "tutoring",
    name: "Tutoring Service",
    emoji: "\uD83D\uDCDA",
    description: "Help other students succeed by offering tutoring sessions.",
    baseDemand: 15,
    costPerUnit: 3,
    maxCapacity: 10,
    premiumMultiplier: 1.6,
  },
  {
    id: "youtube",
    name: "YouTube Channel",
    emoji: "\uD83C\uDFA5",
    description: "Create content and build an audience on YouTube.",
    baseDemand: 50,
    costPerUnit: 1,
    maxCapacity: 40,
    premiumMultiplier: 1.2,
  },
];

export type PricingTier = "low" | "medium" | "premium";
export type MarketingOption = "none" | "flyers" | "social" | "influencer";
export type QualityLevel = "basic" | "premium";
export type HiringOption = "solo" | "hire";

export interface RoundDecisions {
  pricing: PricingTier;
  marketing: MarketingOption;
  quality: QualityLevel;
  hiring: HiringOption;
}

export interface RoundResult {
  month: number;
  customers: number;
  revenue: number;
  expenses: number;
  profit: number;
  satisfaction: number; // 0-100
}

const pricingMultipliers: Record<PricingTier, { price: number; demandFactor: number }> = {
  low: { price: 1, demandFactor: 1.4 },
  medium: { price: 2, demandFactor: 1.0 },
  premium: { price: 3.5, demandFactor: 0.6 },
};

const marketingBoosts: Record<MarketingOption, { cost: number; demandBoost: number }> = {
  none: { cost: 0, demandBoost: 0 },
  flyers: { cost: 50, demandBoost: 0.15 },
  social: { cost: 100, demandBoost: 0.3 },
  influencer: { cost: 200, demandBoost: 0.5 },
};

export function simulateRound(
  business: BusinessType,
  decisions: RoundDecisions,
  month: number,
  previousSatisfaction: number
): RoundResult {
  const pricing = pricingMultipliers[decisions.pricing];
  const marketing = marketingBoosts[decisions.marketing];

  // Calculate demand
  const seasonalFactor = 1 + Math.sin((month * Math.PI) / 3) * 0.1;
  const satisfactionFactor = 0.7 + (previousSatisfaction / 100) * 0.3;
  let demand = Math.round(
    business.baseDemand * pricing.demandFactor * (1 + marketing.demandBoost) * seasonalFactor * satisfactionFactor
  );

  // Capacity limits
  const capacity = decisions.hiring === "hire" ? business.maxCapacity * 1.8 : business.maxCapacity;
  const customers = Math.min(demand, Math.round(capacity));

  // Revenue
  const pricePerCustomer = business.costPerUnit * pricing.price * 3;
  const revenue = Math.round(customers * pricePerCustomer * 100) / 100;

  // Expenses
  const unitCost = decisions.quality === "premium"
    ? business.costPerUnit * 2
    : business.costPerUnit;
  const laborCost = decisions.hiring === "hire" ? 150 : 0;
  const expenses = Math.round((customers * unitCost + marketing.cost + laborCost) * 100) / 100;

  // Profit
  const profit = Math.round((revenue - expenses) * 100) / 100;

  // Customer satisfaction
  let satisfaction = 60;
  if (decisions.quality === "premium") satisfaction += 20;
  if (decisions.pricing === "low") satisfaction += 10;
  if (decisions.pricing === "premium") satisfaction -= 5;
  if (decisions.marketing !== "none") satisfaction += 5;
  if (customers < demand) satisfaction -= 10; // couldn't serve everyone
  satisfaction = Math.max(0, Math.min(100, satisfaction));

  return { month, customers, revenue, expenses, profit, satisfaction };
}

export function getBusinessTitle(totalProfit: number, avgSatisfaction: number): { title: string; emoji: string } {
  if (totalProfit >= 5000 && avgSatisfaction >= 80) return { title: "Future CEO!", emoji: "\uD83D\uDC51" };
  if (totalProfit >= 3000) return { title: "Rising Mogul!", emoji: "\uD83C\uDF1F" };
  if (totalProfit >= 1500) return { title: "Rising Entrepreneur!", emoji: "\uD83D\uDE80" };
  if (totalProfit >= 500) return { title: "Business Builder!", emoji: "\uD83D\uDCC8" };
  if (totalProfit >= 0) return { title: "Learning the Ropes!", emoji: "\uD83D\uDCDA" };
  return { title: "Back to the Drawing Board!", emoji: "\uD83D\uDD04" };
}

export function getStarRating(totalProfit: number, avgSatisfaction: number): number {
  let stars = 0;
  if (totalProfit >= 500) stars++;
  if (totalProfit >= 2000) stars++;
  if (totalProfit >= 4000) stars++;
  if (avgSatisfaction >= 70) stars++;
  if (avgSatisfaction >= 85) stars++;
  return Math.min(5, stars);
}
