import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function ProgressBar({ label, current, target, unit, color, icon }) {
  const ratio = target > 0 ? Math.min(current / target, 1) : 0;
  const pct = Math.round(ratio * 100);
  const barColor = color || theme.colors.primary;

  // MUI 风格：颜色根据完成度变化
  const getBarColor = () => {
    if (pct >= 100) return theme.colors.secondary;
    if (pct >= 75) return "#66BB6A";
    if (pct >= 50) return barColor;
    if (pct >= 25) return "#FFA726";
    return "#EF5350";
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.labelLeft}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>
          <Text style={styles.valueNum}>{Math.round(current)}</Text>
          <Text style={styles.valueTotal}> / {Math.round(target)}</Text>
          <Text style={styles.unit}> {unit}</Text>
        </Text>
      </View>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.max(pct, 2)}%`,
              backgroundColor: getBarColor(),
            },
          ]}
        />
      </View>
      <Text style={styles.pct}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  labelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    color: theme.colors.textPrimary,
  },
  valueNum: {
    fontWeight: "700",
    fontSize: 14,
  },
  valueTotal: {
    fontWeight: "400",
    color: theme.colors.textHint,
  },
  unit: {
    fontSize: 11,
    color: theme.colors.textHint,
  },
  barBg: {
    height: 8,
    backgroundColor: theme.colors.bgGrey,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  pct: {
    fontSize: 11,
    color: theme.colors.textHint,
    textAlign: "right",
    marginTop: 3,
    fontWeight: "500",
  },
});
