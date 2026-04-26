export type Offer = {
  id: string;
  emoji: string;
  title: string;
  merchant: string;
  distance: string;
  discount: string;
  expiresInSec: number;
  reason: string;
  category: "coffee" | "bakery" | "food" | "cinema" | "retail" | "fitness";
  color: "cyan" | "magenta" | "violet" | "lime" | "amber";
};

const POOL: Offer[] = [
  { id: "o1", emoji: "☕", title: "Warm Cappuccino waiting", merchant: "Nimbus Café", distance: "80m", discount: "20% off", expiresInSec: 720, reason: "Cold weather + lunch break + nearby café quiet", category: "coffee", color: "cyan" },
  { id: "o2", emoji: "🥐", title: "Fresh bakery combo", merchant: "Lune Bakery", distance: "140m", discount: "Buy 2 get 1", expiresInSec: 900, reason: "Morning hour + stock surplus detected", category: "bakery", color: "amber" },
  { id: "o3", emoji: "🎬", title: "Pre-cinema burger deal", merchant: "Volt Diner", distance: "320m", discount: "30% off combo", expiresInSec: 1800, reason: "Cinema traffic high tonight nearby", category: "cinema", color: "magenta" },
  { id: "o4", emoji: "🍜", title: "Quiet hour ramen", merchant: "Kaze Ramen", distance: "220m", discount: "$5 off bowl", expiresInSec: 1200, reason: "Restaurant under 30% capacity", category: "food", color: "violet" },
  { id: "o5", emoji: "🧋", title: "Bubble tea boost", merchant: "Pulse Tea Co.", distance: "60m", discount: "1+1 free", expiresInSec: 480, reason: "Afternoon dip + you walked past 2x", category: "coffee", color: "lime" },
  { id: "o6", emoji: "👟", title: "Runner refresh", merchant: "Apex Sport", distance: "410m", discount: "15% socks & gels", expiresInSec: 2400, reason: "Sunny window after rain", category: "fitness", color: "lime" },
  { id: "o7", emoji: "🍕", title: "Slice happy hour", merchant: "Neon Slice", distance: "180m", discount: "$3 slices", expiresInSec: 600, reason: "Oven pre-heated + low foot traffic", category: "food", color: "amber" },
  { id: "o8", emoji: "🌮", title: "Taco Tuesday turbo", merchant: "Casa Lumen", distance: "260m", discount: "3 for $9", expiresInSec: 1500, reason: "Event nearby ending in 20 min", category: "food", color: "magenta" },
];

export function getOffers(seed = 0): Offer[] {
  const arr = [...POOL].sort(() => Math.sin(seed * 9301 + 49297) - 0.5);
  return arr.slice(0, 6);
}

export const weatherStates = [
  { label: "Cold & clear", temp: 6, icon: "❄️", mood: "Cozy seekers active" },
  { label: "Light rain", temp: 12, icon: "🌧️", mood: "Indoor demand rising" },
  { label: "Sunny break", temp: 19, icon: "☀️", mood: "Outdoor patios surging" },
  { label: "Cloudy mild", temp: 14, icon: "⛅", mood: "Steady foot traffic" },
];

export const trafficSeries = Array.from({ length: 12 }, (_, i) => ({
  hour: `${(8 + i) % 24}:00`,
  traffic: Math.round(30 + Math.sin(i / 1.6) * 25 + Math.random() * 15),
  accepted: Math.round(10 + Math.cos(i / 2) * 8 + Math.random() * 6),
}));

export const acceptanceData = [
  { name: "Accepted", value: 68, color: "hsl(var(--neon-cyan))" },
  { name: "Dismissed", value: 22, color: "hsl(var(--neon-magenta))" },
  { name: "Expired", value: 10, color: "hsl(var(--neon-violet))" },
];

export const revenueSeries = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  baseline: 800 + Math.round(Math.random() * 200),
  uplift: 200 + Math.round(Math.random() * 300),
}));

export const walletHistory = [
  { id: "w1", merchant: "Nimbus Café", amount: 1.20, date: "Today · 12:42", emoji: "☕" },
  { id: "w2", merchant: "Lune Bakery", amount: 2.40, date: "Yesterday", emoji: "🥐" },
  { id: "w3", merchant: "Volt Diner", amount: 4.80, date: "2 days ago", emoji: "🎬" },
  { id: "w4", merchant: "Kaze Ramen", amount: 3.10, date: "Last week", emoji: "🍜" },
];
