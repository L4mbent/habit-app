import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function StatsCard({ icon, label, value, color, trend }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: (color || theme.colors.primary) + "15" }]}>
        <Ionicons name={icon} size={22} color={color || theme.colors.primary} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend !== undefined && (
        <View style={[styles.trend, { backgroundColor: trend >= 0 ? "#E8F5E9" : "#FFEBEE" }]}>
          <Ionicons
            name={trend >= 0 ? "trending-up" : "trending-down"}
            size={10}
            color={trend >= 0 ? theme.colors.secondary : theme.colors.error}
          />
          <Text
            style={[
              styles.trendText,
              { color: trend >= 0 ? theme.colors.secondary : theme.colors.error },
            ]}
          >
            {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 16,
    alignItems: "center",
    flex: 1,
    ...theme.shadows.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    lineHeight: 28,
  },
  label: {
    fontSize: 12,
    color: theme.colors.textHint,
    fontWeight: "500",
    marginTop: 2,
  },
  trend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  trendText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
