import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { autoCalculateNutrition, getFoodSuggestions } from "../utils/foodDB";

export default function MealEntryScreen({ route, navigation }) {
  const { mealType, date, existingData, onSave } = route.params;
  const cfg = mealConfig[mealType] || { label: mealType, icon: "restaurant", color: theme.colors.primary, bgColor: "#FFF3E0", time: "" };

  // 是否开启自动计算
  const [autoCalc, setAutoCalc] = useState(!existingData?.foods);
  const [foods, setFoods] = useState(existingData?.foods || "");
  const [protein, setProtein] = useState(existingData?.protein?.toString() || "");
  const [calories, setCalories] = useState(existingData?.calories?.toString() || "");
  const [rating, setRating] = useState(existingData?.rating || 3);
  const [notes, setNotes] = useState(existingData?.notes || "");

  // 自动计算结果
  const [calcResult, setCalcResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const foodsRef = useRef(null);
  const isEditing = !!existingData?.foods;

  // 输入食物时实时计算
  const handleFoodChange = useCallback((text) => {
    setFoods(text);
    if (!autoCalc) return;

    // 只在输入停顿后计算
    const result = autoCalculateNutrition(text);
    if (result && result.details.some(d => d.matched)) {
      setCalcResult(result);
      if (!protein && !calories) {
        setProtein(result.protein > 0 ? result.protein.toString() : "");
        setCalories(result.calories > 0 ? result.calories.toString() : "");
      }
    } else {
      setCalcResult(null);
    }

    // 输入建议（输入最后一段）
    const lastPart = text.split(/[+,，、\n]/).pop()?.trim() || "";
    if (lastPart.length >= 1 && text.length > 0) {
      const sug = getFoodSuggestions(lastPart);
      setSuggestions(sug);
      setShowSuggestions(sug.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [autoCalc, protein, calories]);

  // 选择建议的食物
  const selectSuggestion = useCallback((foodName) => {
    const parts = foods.split(/[+,，、\n]/);
    parts[parts.length - 1] = foodName;
    const newText = parts.join("、");
    setFoods(newText);
    setShowSuggestions(false);
    // 触发重新计算
    const result = autoCalculateNutrition(newText);
    if (result) {
      setCalcResult(result);
      if (!protein && !calories) {
        setProtein(result.protein > 0 ? result.protein.toString() : "");
        setCalories(result.calories > 0 ? result.calories.toString() : "");
      }
    }
  }, [foods, protein, calories]);

  // 一键应用计算结果
  const applyCalculation = useCallback(() => {
    if (calcResult) {
      setProtein(calcResult.protein > 0 ? calcResult.protein.toString() : "");
      setCalories(calcResult.calories > 0 ? calcResult.calories.toString() : "");
    }
  }, [calcResult]);

  async function handleSave() {
    if (!foods.trim()) {
      Alert.alert("提示", "请填写吃了什么食物");
      return;
    }
    try {
      // 如果开启了自动计算且有结果但用户没手动填，自动应用
      const finalProtein = protein || (calcResult ? calcResult.protein.toString() : "0");
      const finalCalories = calories || (calcResult ? calcResult.calories.toString() : "0");

      await upsertMeal({
        date,
        meal_type: mealType,
        foods: foods.trim(),
        protein: parseFloat(finalProtein) || 0,
        calories: parseFloat(finalCalories) || 0,
        rating,
        notes: notes.trim(),
      });
      if (onSave) onSave();
      navigation.goBack();
    } catch (e) {
      Alert.alert("保存失败", e.message);
    }
  }

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

      {/* 自动计算开关 */}
      <TouchableOpacity
        style={styles.autoCalcToggle}
        onPress={() => setAutoCalc(!autoCalc)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={autoCalc ? "calculator" : "calculator-outline"}
          size={18}
          color={autoCalc ? theme.colors.info : theme.colors.textHint}
        />
        <Text style={[styles.autoCalcText, autoCalc && styles.autoCalcTextOn]}>
          智能营养计算
        </Text>
        <Ionicons
          name={autoCalc ? "toggle" : "toggle-outline"}
          size={22}
          color={autoCalc ? theme.colors.info : theme.colors.textDisabled}
        />
      </TouchableOpacity>

      {/* 食物 */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>
          <Ionicons name="restaurant" size={14} color={theme.colors.textSecondary} /> 吃了什么
        </Text>
        <View style={styles.foodInputWrap}>
          <TextInput
            ref={foodsRef}
            style={styles.input}
            placeholder="例：鸡胸肉200g + 米饭1碗 + 西兰花100g"
            placeholderTextColor={theme.colors.textHint}
            value={foods}
            onChangeText={handleFoodChange}
            multiline
          />
          {/* 食物输入建议 */}
          {showSuggestions && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionItem}
                  onPress={() => selectSuggestion(s.name)}
                >
                  <Text style={styles.suggestionName}>{s.name}</Text>
                  <Text style={styles.suggestionDetail}>
                    {s.protein}g蛋白 / {s.calories}kcal / 100{s.unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 自动计算结果展示 */}
      {autoCalc && calcResult && calcResult.details.some(d => d.matched) && (
        <View style={styles.calcResultCard}>
          <View style={styles.calcResultHeader}>
            <Ionicons name="flash" size={16} color="#FF9800" />
            <Text style={styles.calcResultTitle}>营养估算</Text>
            <TouchableOpacity onPress={applyCalculation} style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>应用</Text>
            </TouchableOpacity>
          </View>
          {calcResult.details.filter(d => d.matched).map((d, i) => (
            <View key={i} style={styles.calcItem}>
              <Text style={styles.calcFoodName}>
                {d.name}{d.amount}{d.unit}
                <Text style={styles.calcMatched}> → {d.matched}</Text>
              </Text>
              <Text style={styles.calcFoodNutri}>
                🔥 {d.calories}kcal · 🥩 {d.protein}g
              </Text>
            </View>
          ))}
          <View style={styles.calcTotal}>
            <Text style={styles.calcTotalLabel}>合计</Text>
            <Text style={styles.calcTotalValue}>
              {Math.round(calcResult.calories)} kcal · {Math.round(calcResult.protein)}g 蛋白
            </Text>
          </View>
        </View>
      )}

      {/* 营养输入行 */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>
            <Ionicons name="barbell" size={14} color={theme.colors.secondary} /> 蛋白质 (g)
          </Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputRow]}
              placeholder={autoCalc && calcResult ? `${Math.round(calcResult.protein)}` : "30"}
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
            <Ionicons name="flame" size={14} color="#FF9800" /> 热量 (kcal)
          </Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputRow]}
              placeholder={autoCalc && calcResult ? `${Math.round(calcResult.calories)}` : "450"}
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
    marginBottom: 12,
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

  // 自动计算开关
  autoCalcToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  autoCalcText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textHint,
    fontWeight: "500",
  },
  autoCalcTextOn: {
    color: theme.colors.info,
  },

  // 食物输入
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
  foodInputWrap: {
    position: "relative",
    zIndex: 100,
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
    paddingRight: 50,
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

  // 食物建议下拉
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    ...theme.shadows.md,
    zIndex: 999,
    maxHeight: 200,
  },
  suggestionItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  suggestionDetail: {
    fontSize: 11,
    color: theme.colors.textHint,
    marginTop: 2,
  },

  // 自动计算结果卡片
  calcResultCard: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFE0B2",
    backgroundColor: "#FFFBF0",
  },
  calcResultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#FFE0B2",
  },
  calcResultTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E65100",
    flex: 1,
  },
  applyBtn: {
    backgroundColor: theme.colors.info + "15",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.info,
  },
  calcItem: {
    marginBottom: 6,
  },
  calcFoodName: {
    fontSize: 13,
    color: theme.colors.textPrimary,
    fontWeight: "500",
  },
  calcMatched: {
    fontSize: 11,
    color: theme.colors.textHint,
    fontWeight: "400",
  },
  calcFoodNutri: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  calcTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#FFE0B2",
  },
  calcTotalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  calcTotalValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E65100",
  },

  // 胃口评分
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
