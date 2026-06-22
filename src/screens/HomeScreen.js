import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { getDayMeals } from "../database";
import { MEAL_TYPES, formatDate } from "../utils";
import { theme } from "../theme";
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
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 顶部日期区域 */}
      <View style={styles.dateSection}>
        <View>
          <Text style={styles.greeting}>今日打卡</Text>
          <Text style={styles.date}>{formatDate(today)}</Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressCircleNum}>{mealCount}</Text>
          <Text style={styles.progressCircleLabel}>/{MEAL_TYPES.length}</Text>
        </View>
      </View>

      {/* 进度卡片 */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Ionicons name="speedometer" size={18} color={theme.colors.primary} />
          <Text style={styles.progressTitle}>今日进度</Text>
        </View>
        <ProgressBar
          label="热量目标"
          current={totalCalories}
          target={parseInt(goals.targetCalories)}
          unit="kcal"
          color={theme.colors.primary}
        />
        <ProgressBar
          label="蛋白质目标"
          current={totalProtein}
          target={parseInt(goals.targetProtein)}
          unit="g"
          color={theme.colors.secondary}
        />
      </View>

      {/* 快速统计 */}
      <View style={styles.statsRow}>
        <StatsCard
          icon="flame"
          label="已摄入"
          value={`${Math.round(totalCalories)}`}
          color="#FF9800"
        />
        <StatsCard
          icon="barbell"
          label="蛋白质"
          value={`${Math.round(totalProtein)}g`}
          color={theme.colors.secondary}
        />
        <StatsCard
          icon="checkmark-circle"
          label="已打卡"
          value={`${mealCount}/${MEAL_TYPES.length}`}
          color={theme.colors.info}
        />
      </View>

      {/* 每餐打卡 */}
      <View style={styles.sectionHeader}>
        <Ionicons name="restaurant" size={18} color={theme.colors.textPrimary} />
        <Text style={styles.sectionTitle}>每餐打卡</Text>
      </View>

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
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
  },
  dateSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  progressCircle: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: theme.colors.primary + "12",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  progressCircleNum: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  progressCircleLabel: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  progressCard: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 16,
    ...theme.shadows.md,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
});
