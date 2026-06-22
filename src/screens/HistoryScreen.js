import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getMealHistory } from "../database";
import { formatDate, MEAL_TYPES } from "../utils";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen({ navigation }) {
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

  // 按日期分组
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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>打卡历史</Text>
      {dates.length === 0 ? (
        <Text style={styles.empty}>暂无打卡记录</Text>
      ) : (
        dates.map((date) => {
          const dayMeals = grouped[date];
          const totCal = dayMeals.reduce((s, m) => s + (m.calories || 0), 0);
          const totPro = dayMeals.reduce((s, m) => s + (m.protein || 0), 0);
          return (
            <View key={date} style={styles.dayGroup}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayDate}>{formatDate(date)}</Text>
                <Text style={styles.dayStats}>
                  {Math.round(totCal)}kcal · {Math.round(totPro)}g 蛋白
                </Text>
              </View>
              <View style={styles.mealRow}>
                {dayMeals.map((m) => (
                  <View key={m.meal_type} style={styles.mealTag}>
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 15,
  },
  dayGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  dayStats: {
    fontSize: 12,
    color: "#999",
  },
  mealRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  mealTag: {
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  mealTagText: {
    fontSize: 12,
    color: "#E65100",
    fontWeight: "500",
  },
});
