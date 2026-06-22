export function getToday() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  return `${parts[0]}年${parseInt(parts[1])}月${parseInt(parts[2])}日`;
}

export function getWeekRange() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { start: toDateStr(monday), end: toDateStr(sunday) };
}

function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const MEAL_TYPES = [
  { key: "breakfast", label: "早餐", icon: "sunrise", time: "06:00-09:00" },
  { key: "morning_snack", label: "早加餐", icon: "food-apple", time: "09:00-11:00" },
  { key: "lunch", label: "午餐", icon: "sun", time: "11:00-13:00" },
  { key: "afternoon_snack", label: "午加餐", icon: "food-apple", time: "15:00-17:00" },
  { key: "dinner", label: "晚餐", icon: "moon-waning-crescent", time: "17:00-20:00" },
  { key: "supper", label: "宵夜", icon: "weather-night", time: "20:00-23:00" },
];

export const MEAL_ORDER = MEAL_TYPES.map((m) => m.key);

export const RATING_OPTIONS = [
  { value: 1, label: "没胃口", emoji: "😞" },
  { value: 2, label: "一般般", emoji: "😐" },
  { value: 3, label: "正常", emoji: "🙂" },
  { value: 4, label: "胃口好", emoji: "😋" },
  { value: 5, label: "暴食", emoji: "🤤" },
];

export const DEFAULT_GOALS = {
  targetCalories: "2500",
  targetProtein: "120",
  targetWeight: "65",
};
