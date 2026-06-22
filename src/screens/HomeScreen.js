import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useApp } from "../context/AppContext";
import { getDayMeals, upsertMeal } from "../database";
import { MEAL_TYPES, RATING_OPTIONS, formatDate } from "../utils";
import MealCard from "../components/MealCard";
import ProgressBar from "../components/ProgressBar";
import StatsCard from "../components/StatsCard";

export default function HomeScreen({ navigation }) {
  const { goals, today, refreshDate } = useApp();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshDate();
    loadMeals();
  }, []);

  async function loadMeals() {
    setLoading(true);
    try {
      const data = await getDayMeals(today);
      setMeals(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  // 合并所有餐的数据用于进度条
  const totalCalories = meals.reduce((s, m) => s + (m.calories || 0), 0);
  const totalProtein = meals.reduce((s, m) => s + (m.protein || 0), 0);
  const mealCount = meals.filter((m) => m.foods).length;

  function navigateToMeal(mealType) {
    const existing = meals.find((m) => m.meal_type === mealType);
    navigation.navigate("MealEntry", {
      mealType,
      date: today,
      existingData: existing,
      onSave: loadMeals,
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 日期 */}
      <Text style={styles.date}>{formatDate(today)}</Text>
      <Text style={styles.subtitle}>今日打卡 {mealCount}/{MEAL_TYPES.length} 餐</Text>

      {/* 进度概览 */}
      <View style={styles.progressSection}>
        <ProgressBar
          label="热量"
          current={totalCalories}
          target={parseInt(goals.targetCalories)}
          unit="kcal"
          color="#FF6B35"
        />
        <ProgressBar
          label="蛋白质"
          current={totalProtein}
          target={parseInt(goals.targetProtein)}
          unit="g"
          color="#4CAF50"
        />
      </View>

      {/* 快速统计 */}
      <View style={styles.statsRow}>
        <StatsCard icon="flame" label="已摄入" value={`${Math.round(totalCalories)}`} />
        <StatsCard icon="barbell" label="蛋白质" value={`${Math.round(totalProtein)}g`} />
        <StatsCard icon="checkmark-circle" label="已打卡" value={`${mealCount}`} />
      </View>

      {/* 每餐打卡 */}
      <Text style={styles.sectionTitle}>每餐打卡</Text>
      {MEAL_TYPES.map((mt) => {
        const meal = meals.find((m) => m.meal_type === mt.key);
        return (
          <MealCard
            key={mt.key}
            meal={{
              meal_type: mt.key,
              foods: meal?.foods,
              calories: meal?.calories,
              protein: meal?.protein,
              rating: meal?.rating,
            }}
            onPress={() => navigateToMeal(mt.key)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  progressSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
});
