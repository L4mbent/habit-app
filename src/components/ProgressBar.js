import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ label, current, target, unit, color }) {
  const ratio = target > 0 ? Math.min(current / target, 1) : 0;
  const pct = Math.round(ratio * 100);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {Math.round(current)}/{Math.round(target)} {unit}
        </Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: color || "#FF6B35" }]} />
      </View>
      <Text style={styles.pct}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
  barBg: {
    height: 10,
    backgroundColor: "#EEE",
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  pct: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: 2,
  },
});
