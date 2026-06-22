import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getConfig, setConfig } from "../database";
import { DEFAULT_GOALS, getToday } from "../utils";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [today, setToday] = useState(getToday());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      const cal = await getConfig("targetCalories");
      const pro = await getConfig("targetProtein");
      const wt = await getConfig("targetWeight");
      setGoals({
        targetCalories: cal || DEFAULT_GOALS.targetCalories,
        targetProtein: pro || DEFAULT_GOALS.targetProtein,
        targetWeight: wt || DEFAULT_GOALS.targetWeight,
      });
    } catch (e) {
      console.warn("Config load error:", e);
    }
    setLoaded(true);
  }

  const updateGoals = useCallback(async (newGoals) => {
    setGoals(newGoals);
    await Promise.all([
      setConfig("targetCalories", newGoals.targetCalories),
      setConfig("targetProtein", newGoals.targetProtein),
      setConfig("targetWeight", newGoals.targetWeight),
    ]);
  }, []);

  const refreshDate = useCallback(() => {
    setToday(getToday());
  }, []);

  return (
    <AppContext.Provider value={{ goals, updateGoals, today, refreshDate, loaded }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
