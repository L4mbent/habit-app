import * as SQLite from "expo-sqlite";

let db = null;

export async function getDatabase() {
  if (db) return db;
  db = await SQLite.openDatabaseAsync("habit.db");
  await initDatabase(db);
  return db;
}

async function initDatabase(database) {
  await database.runAsync(
    "CREATE TABLE IF NOT EXISTS user_config (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
  );

  await database.runAsync(
    "CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, meal_type TEXT NOT NULL, foods TEXT, protein REAL DEFAULT 0, calories REAL DEFAULT 0, rating INTEGER DEFAULT 3, notes TEXT, created_at TEXT DEFAULT (datetime('now','localtime')), UNIQUE(date, meal_type))"
  );

  await database.runAsync(
    "CREATE TABLE IF NOT EXISTS body_stats (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL UNIQUE, weight REAL, body_fat REAL, notes TEXT, created_at TEXT DEFAULT (datetime('now','localtime')))"
  );

  const tables = await database.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('user_config','meals','body_stats') ORDER BY name"
  );
  const tableNames = tables.map(r => r.name).join(", ");
  console.log("Database tables initialized:", tableNames);
}

export async function getConfig(key) {
  const database = await getDatabase();
  const row = await database.getFirstAsync("SELECT value FROM user_config WHERE key = ?", key);
  return row ? row.value : null;
}

export async function setConfig(key, value) {
  const database = await getDatabase();
  await database.runAsync("INSERT OR REPLACE INTO user_config (key, value) VALUES (?, ?)", key, value);
}

export async function getMeal(date, mealType) {
  const database = await getDatabase();
  return await database.getFirstAsync("SELECT * FROM meals WHERE date = ? AND meal_type = ?", date, mealType);
}

export async function upsertMeal({ date, meal_type, foods, protein, calories, rating, notes }) {
  const database = await getDatabase();
  await database.runAsync(
    "INSERT OR REPLACE INTO meals (date, meal_type, foods, protein, calories, rating, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
    date,
    meal_type,
    foods || "",
    protein || 0,
    calories || 0,
    rating || 3,
    notes || ""
  );
}

export async function getDayMeals(date) {
  const database = await getDatabase();
  return await database.getAllAsync("SELECT * FROM meals WHERE date = ? ORDER BY meal_type", date);
}

export async function getMealHistory(limit = 30) {
  const database = await getDatabase();
  return await database.getAllAsync(
    "SELECT * FROM meals ORDER BY date DESC, meal_type ASC LIMIT ?",
    limit
  );
}

export async function getDateRange(startDate, endDate) {
  const database = await getDatabase();
  return await database.getAllAsync(
    "SELECT * FROM meals WHERE date >= ? AND date <= ? ORDER BY date, meal_type",
    startDate,
    endDate
  );
}

export async function getBodyStats(date) {
  const database = await getDatabase();
  return await database.getFirstAsync("SELECT * FROM body_stats WHERE date = ?", date);
}

export async function upsertBodyStats({ date, weight, body_fat, notes }) {
  const database = await getDatabase();
  await database.runAsync(
    "INSERT OR REPLACE INTO body_stats (date, weight, body_fat, notes) VALUES (?, ?, ?, ?)",
    date,
    weight || null,
    body_fat || null,
    notes || ""
  );
}

export async function getBodyStatsHistory(limit = 30) {
  const database = await getDatabase();
  return await database.getAllAsync("SELECT * FROM body_stats ORDER BY date DESC LIMIT ?", limit);
}
