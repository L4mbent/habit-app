import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getMealHistory } from "../database";
import { formatDate } from "../utils";
import { theme } from "../theme";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  async function loadHistory() {
    setLoading(true);
    try {
      const data = await getMealHistory(60);
      setHistory(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const grouped = {};
  for (const meal of history) {
    if (!grouped[meal.date]) grouped[meal.date] = [];
    grouped[meal.date].push(meal);
  }

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const typeLabels = {
    breakfast: "早", morning_snack: "早加", lunch: "午",
    afternoon_snack: "午加", dinner: "晚", supper: "宵",
  };

  const typeColors = {
    breakfast: "#FF9800", morning_snack: "#8D6E63", lunch: "#FF6B35",
    afternoon_snack: "#8D6E63", dinner: "#5C6BC0", supper: "#7B1FA2",
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {dates.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={56} color={theme.colors.textDisabled} />
          <Text style={styles.emptyTitle}>暂无打卡记录</Text>
          <Text style={styles.emptySub}>开始记录你的第一餐吧！</Text>
        </View>
      ) : (
        dates.map((date) => {
          const dayMeals = grouped[date];
          const totCal = dayMeals.reduce((s, m) => s + (m.calories || 0), 0);
          const totPro = dayMeals.reduce((s, m) => s + (m.protein || 0), 0);
          return (
            <View key={date} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <View style={styles.dayHeaderLeft}>
                  <Ionicons name="calendar" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.dayDate}>{formatDate(date)}</Text>
                </View>
                <View style={styles.dayStats}>
                  <Text style={styles.dayStat}>
                    <Ionicons name="flame" size={12} color="#FF9800" /> {Math.round(totCal)}
                  </Text>
                  <Text style={styles.dayStat}>
                    <Ionicons name="barbell" size={12} color={theme.colors.secondary} /> {Math.round(totPro)}g
                  </Text>
                </View>
              </View>
              <View style={styles.mealRow}>
                {dayMeals.map((m) => (
                  <View
                    key={m.meal_type}
                    style={[
                      styles.mealTag,
                      { backgroundColor: (typeColors[m.meal_type] || theme.colors.primary) + "15" },
                    ]}
                  >
                    <View
                      style={[
                        styles.mealDot,
                        { backgroundColor: typeColors[m.meal_type] || theme.colors.primary },
                      ]}
                    />
                    <Text style={styles.mealTagText}>
                      {typeLabels[m.meal_type] || m.meal_type}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })
      )}
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
  emptyState: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginTop: 16,
  },
  emptySub: {
    fontSize: 14,
    color: theme.colors.textHint,
    marginTop: 6,
  },
  dayCard: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 10,
    ...theme.shadows.sm,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  dayHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dayDate: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  dayStats: {
    flexDirection: "row",
    gap: 14,
  },
  dayStat: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: "500",
  },
  mealRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  mealTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mealDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  mealTagText: {
    fontSize: 12,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
});
