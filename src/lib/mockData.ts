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
  confidence: number; // 0-100 AI match score
  surge?: "HOT" | "QUIET" | "SURGE" | "RARE";
  signals: string[];
};

const POOL: Offer[] = [
  { id: "o1", emoji: "☕", title: "Warm Cappuccino waiting", merchant: "Nimbus Café", distance: "80m", discount: "20% off", expiresInSec: 720, reason: "Cold weather + lunch break + nearby café quiet", category: "coffee", color: "cyan", confidence: 94, surge: "QUIET", signals: ["cold", "lunch", "low-traffic"] },
  { id: "o2", emoji: "🥐", title: "Fresh bakery combo", merchant: "Lune Bakery", distance: "140m", discount: "Buy 2 get 1", expiresInSec: 900, reason: "Morning hour + stock surplus detected", category: "bakery", color: "amber", confidence: 87, surge: "RARE", signals: ["surplus", "morning"] },
  { id: "o3", emoji: "🎬", title: "Pre-cinema burger deal", merchant: "Volt Diner", distance: "320m", discount: "30% off combo", expiresInSec: 1800, reason: "Cinema traffic high tonight nearby", category: "cinema", color: "magenta", confidence: 91, surge: "HOT", signals: ["event-near", "evening"] },
  { id: "o4", emoji: "🍜", title: "Quiet hour ramen", merchant: "Kaze Ramen", distance: "220m", discount: "$5 off bowl", expiresInSec: 1200, reason: "Restaurant under 30% capacity", category: "food", color: "violet", confidence: 82, surge: "QUIET", signals: ["low-cap", "warm-food"] },
  { id: "o5", emoji: "🧋", title: "Bubble tea boost", merchant: "Pulse Tea Co.", distance: "60m", discount: "1+1 free", expiresInSec: 480, reason: "Afternoon dip + you walked past 2x", category: "coffee", color: "lime", confidence: 89, surge: "HOT", signals: ["proximity", "repeat-pass"] },
  { id: "o6", emoji: "👟", title: "Runner refresh", merchant: "Apex Sport", distance: "410m", discount: "15% socks & gels", expiresInSec: 2400, reason: "Sunny window after rain", category: "fitness", color: "lime", confidence: 76, signals: ["weather-shift"] },
  { id: "o7", emoji: "🍕", title: "Slice happy hour", merchant: "Neon Slice", distance: "180m", discount: "$3 slices", expiresInSec: 600, reason: "Oven pre-heated + low foot traffic", category: "food", color: "amber", confidence: 84, surge: "SURGE", signals: ["pre-heat", "low-traffic"] },
  { id: "o8", emoji: "🌮", title: "Taco Tuesday turbo", merchant: "Casa Lumen", distance: "260m", discount: "3 for $9", expiresInSec: 1500, reason: "Event nearby ending in 20 min", category: "food", color: "magenta", confidence: 88, surge: "HOT", signals: ["event-end", "hungry-crowd"] },
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
  traffic: Math.round(30 + Math.sin(i / 1.6) * 25 + (((i * 53) % 17) - 8)),
  accepted: Math.round(10 + Math.cos(i / 2) * 8 + (((i * 31) % 11) - 5)),
  revenue: Math.round(120 + Math.sin(i / 1.2) * 60 + (((i * 41) % 19))),
}));

export const acceptanceData = [
  { name: "Accepted", value: 68, color: "hsl(var(--neon-cyan))" },
  { name: "Dismissed", value: 22, color: "hsl(var(--neon-magenta))" },
  { name: "Expired", value: 10, color: "hsl(var(--neon-violet))" },
];

export const revenueSeries = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => ({
  day,
  baseline: 800 + ((i * 137) % 200),
  uplift: 200 + ((i * 211) % 300),
}));

// AI signal mix for radar chart (0-100)
export const signalMix = [
  { signal: "Weather", value: 88 },
  { signal: "Time", value: 76 },
  { signal: "Location", value: 92 },
  { signal: "Events", value: 64 },
  { signal: "Traffic", value: 81 },
  { signal: "History", value: 70 },
];

export const walletHistory = [
  { id: "w1", merchant: "Nimbus Café", amount: 1.20, date: "Today · 12:42", emoji: "☕" },
  { id: "w2", merchant: "Lune Bakery", amount: 2.40, date: "Yesterday", emoji: "🥐" },
  { id: "w3", merchant: "Volt Diner", amount: 4.80, date: "2 days ago", emoji: "🎬" },
  { id: "w4", merchant: "Kaze Ramen", amount: 3.10, date: "Last week", emoji: "🍜" },
];

export const liveTickerEvents = [
  "🎬 Cinema District: queues +42%",
  "☕ Café row: 6 quiet venues",
  "🌧️ Rain in 18 min — indoor surge predicted",
  "🥐 Lune Bakery surplus drop",
  "🏃 Park run wrapping in 12 min",
  "🍕 Neon Slice pre-heated batch",
  "🚇 Central Station: outbound peak",
  "🎶 Live music starts 8pm @ Echo Hall",
];
