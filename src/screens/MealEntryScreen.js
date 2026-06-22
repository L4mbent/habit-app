import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { upsertMeal } from "../database";
import { MEAL_TYPES, RATING_OPTIONS } from "../utils";
import { theme, mealConfig } from "../theme";

export default function MealEntryScreen({ route, navigation }) {
  const { mealType, date, existingData, onSave } = route.params;
  const cfg = mealConfig[mealType] || { label: mealType, icon: "restaurant", color: theme.colors.primary, bgColor: "#FFF3E0", time: "" };

  const [foods, setFoods] = useState(existingData?.foods || "");
  const [protein, setProtein] = useState(existingData?.protein?.toString() || "");
  const [calories, setCalories] = useState(existingData?.calories?.toString() || "");
  const [rating, setRating] = useState(existingData?.rating || 3);
  const [notes, setNotes] = useState(existingData?.notes || "");

  async function handleSave() {
    if (!foods.trim()) {
      Alert.alert("提示", "请填写吃了什么食物");
      return;
    }
    try {
      await upsertMeal({
        date,
        meal_type: mealType,
        foods: foods.trim(),
        protein: parseFloat(protein) || 0,
        calories: parseFloat(calories) || 0,
        rating,
        notes: notes.trim(),
      });
      if (onSave) onSave();
      navigation.goBack();
    } catch (e) {
      Alert.alert("保存失败", e.message);
    }
  }

  const isEditing = !!existingData?.foods;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 餐次标题卡片 */}
      <View style={[styles.headerCard, { borderLeftColor: cfg.color }]}>
        <View style={[styles.iconWrap, { backgroundColor: cfg.bgColor }]}>
          <Ionicons name={cfg.icon} size={28} color={cfg.color} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.mealLabel}>{cfg.label}</Text>
          <Text style={styles.mealTime}>推荐时间 {cfg.time}</Text>
        </View>
        {isEditing && (
          <View style={styles.editBadge}>
            <Ionicons name="create" size={12} color={theme.colors.info} />
            <Text style={styles.editBadgeText}>编辑</Text>
          </View>
        )}
      </View>

      {/* 食物 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          <Ionicons name="restaurant" size={14} color={theme.colors.textSecondary} /> 吃了什么
        </Text>
        <TextInput
          style={styles.input}
          placeholder="例：鸡胸肉200g、米饭1碗、西兰花"
          placeholderTextColor={theme.colors.textHint}
          value={foods}
          onChangeText={setFoods}
          multiline
        />
      </View>

      {/* 营养一行两个输入框 */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>
            <Ionicons name="barbell" size={14} color={theme.colors.secondary} /> 蛋白质
          </Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputRow]}
              placeholder="0"
              placeholderTextColor={theme.colors.textHint}
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>g</Text>
          </View>
        </View>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>
            <Ionicons name="flame" size={14} color="#FF9800" /> 热量
          </Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputRow]}
              placeholder="0"
              placeholderTextColor={theme.colors.textHint}
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>kcal</Text>
          </View>
        </View>
      </View>

      {/* 胃口评分 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          <Ionicons name="happy" size={14} color={theme.colors.textSecondary} /> 胃口状态
        </Text>
        <View style={styles.ratingRow}>
          {RATING_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.ratingBtn, rating === opt.value && styles.ratingActive]}
              onPress={() => setRating(opt.value)}
            >
              <Text style={styles.ratingEmoji}>{opt.emoji}</Text>
              <Text style={[styles.ratingLabel, rating === opt.value && styles.ratingLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 备注 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          <Ionicons name="document-text" size={14} color={theme.colors.textSecondary} /> 备注
        </Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="有什么想记录的..."
          placeholderTextColor={theme.colors.textHint}
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {/* 保存按钮 */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.saveText}>{isEditing ? "更新打卡" : "保存打卡"}</Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    ...theme.shadows.sm,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: theme.shape.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  mealLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  mealTime: {
    fontSize: 12,
    color: theme.colors.textHint,
    marginTop: 2,
  },
  editBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editBadgeText: {
    fontSize: 11,
    color: theme.colors.info,
    fontWeight: "500",
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  input: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 14,
    fontSize: 15,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    lineHeight: 22,
  },
  inputRow: {
    paddingRight: 40,
  },
  inputWithUnit: {
    position: "relative",
  },
  unitText: {
    position: "absolute",
    right: 14,
    top: 14,
    fontSize: 14,
    color: theme.colors.textHint,
    fontWeight: "500",
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 8,
  },
  ratingBtn: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  ratingActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + "10",
  },
  ratingEmoji: {
    fontSize: 22,
  },
  ratingLabel: {
    fontSize: 10,
    color: theme.colors.textHint,
    marginTop: 3,
    fontWeight: "500",
  },
  ratingLabelActive: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.md,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    ...theme.shadows.md,
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
