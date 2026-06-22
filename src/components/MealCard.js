import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme, mealConfig } from "../theme";

export default function MealCard({ meal, onPress, compact }) {
  const cfg = mealConfig[meal.meal_type] || {
    label: meal.meal_type,
    icon: "restaurant",
    color: theme.colors.primary,
    bgColor: "#FFF3E0",
  };

  const checkedIn = !!meal.foods;

  return (
    <TouchableOpacity
      style={[styles.card, checkedIn && styles.cardChecked]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* 左侧色条 */}
      <View style={[styles.colorBar, { backgroundColor: cfg.color }]} />

      <View style={styles.content}>
        {/* 顶栏：图标 + 标题 + 状态 */}
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: cfg.bgColor }]}>
            <Ionicons name={cfg.icon} size={compact ? 16 : 20} color={cfg.color} />
          </View>
          <Text style={[styles.label, compact && styles.labelCompact]}>{cfg.label}</Text>
          {checkedIn ? (
            <View style={styles.badgeDone}>
              <Ionicons name="checkmark-circle" size={14} color={theme.colors.secondary} />
              <Text style={styles.badgeDoneText}>已打卡</Text>
            </View>
          ) : (
            <View style={styles.badgeMiss}>
              <Text style={styles.badgeMissText}>待打卡</Text>
            </View>
          )}
        </View>

        {/* 打卡内容 */}
        {checkedIn && (
          <View style={styles.body}>
            <Text style={styles.foods} numberOfLines={compact ? 1 : 2}>
              {meal.foods}
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="flame" size={13} color="#FF9800" />
                <Text style={styles.statText}>
                  {Math.round(meal.calories)} <Text style={styles.statUnit}>kcal</Text>
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="barbell" size={13} color={theme.colors.secondary} />
                <Text style={styles.statText}>
                  {Math.round(meal.protein)} <Text style={styles.statUnit}>g</Text>
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* 右侧箭头 */}
      <Ionicons
        name="chevron-forward"
        size={compact ? 16 : 20}
        color={theme.colors.textDisabled}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    marginBottom: 10,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  cardChecked: {
    ...theme.shadows.md,
  },
  colorBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: theme.shape.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    flex: 1,
  },
  labelCompact: {
    fontSize: 13,
  },
  badgeDone: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  badgeDoneText: {
    fontSize: 11,
    color: theme.colors.secondary,
    fontWeight: "500",
  },
  badgeMiss: {
    backgroundColor: theme.colors.bgGrey,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeMissText: {
    fontSize: 11,
    color: theme.colors.textHint,
    fontWeight: "500",
  },
  body: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.divider,
  },
  foods: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
  statUnit: {
    fontSize: 11,
    color: theme.colors.textHint,
    fontWeight: "400",
  },
  arrow: {
    alignSelf: "center",
    marginRight: 4,
  },
});
