import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MealCard({ meal, onPress, compact }) {
  const typeLabels = {
    breakfast: "早餐",
    morning_snack: "早加餐",
    lunch: "午餐",
    afternoon_snack: "午加餐",
    dinner: "晚餐",
    supper: "宵夜",
  };
  const typeIcons = {
    breakfast: "sunrise",
    morning_snack: "cafe",
    lunch: "sunny",
    afternoon_snack: "cafe",
    dinner: "moon",
    supper: "weather-night",
  };

  const label = typeLabels[meal.meal_type] || meal.meal_type;
  const icon = typeIcons[meal.meal_type] || "restaurant";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Ionicons name={icon} size={compact ? 18 : 24} color="#FF6B35" />
        <Text style={[styles.label, compact && styles.labelCompact]}>{label}</Text>
        {meal.foods ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>已打卡</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.badgeMiss]}>
            <Text style={[styles.badgeText, styles.badgeTextMiss]}>未打卡</Text>
          </View>
        )}
      </View>
      {meal.foods ? (
        <View style={styles.body}>
          <Text style={[styles.foods, compact && styles.foodsCompact]} numberOfLines={1}>
            {meal.foods}
          </Text>
          <View style={styles.stats}>
            <Text style={styles.stat}>🔥 {Math.round(meal.calories)} kcal</Text>
            <Text style={styles.stat}>🥩 {Math.round(meal.protein)}g 蛋白</Text>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  labelCompact: {
    fontSize: 14,
  },
  badge: {
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMiss: {
    backgroundColor: "#FFF3E0",
  },
  badgeText: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "500",
  },
  badgeTextMiss: {
    color: "#E65100",
  },
  body: {
    marginTop: 8,
  },
  foods: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  foodsCompact: {
    fontSize: 12,
  },
  stats: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    fontSize: 12,
    color: "#888",
  },
});
