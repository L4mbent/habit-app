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

export default function MealEntryScreen({ route, navigation }) {
  const { mealType, date, existingData, onSave } = route.params;
  const mealInfo = MEAL_TYPES.find((m) => m.key === mealType);

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 餐次标题 */}
      <View style={styles.header}>
        <Ionicons name={mealInfo.icon} size={32} color="#FF6B35" />
        <View>
          <Text style={styles.mealLabel}>{mealInfo.label}</Text>
          <Text style={styles.mealTime}>推荐时间 {mealInfo.time}</Text>
        </View>
      </View>

      {/* 食物 */}
      <Text style={styles.fieldLabel}>吃了什么</Text>
      <TextInput
        style={styles.input}
        placeholder="例：鸡胸肉200g + 米饭1碗 + 西兰花"
        value={foods}
        onChangeText={setFoods}
        multiline
      />

      {/* 蛋白质 */}
      <Text style={styles.fieldLabel}>蛋白质 (g)</Text>
      <TextInput
        style={styles.input}
        placeholder="例如：30"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
      />

      {/* 热量 */}
      <Text style={styles.fieldLabel}>热量 (kcal)</Text>
      <TextInput
        style={styles.input}
        placeholder="例如：450"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      {/* 胃口评分 */}
      <Text style={styles.fieldLabel}>胃口状态</Text>
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

      {/* 备注 */}
      <Text style={styles.fieldLabel}>备注</Text>
      <TextInput
        style={styles.input}
        placeholder="有什么想记录的..."
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* 保存按钮 */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.saveText}>保存打卡</Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  mealLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  mealTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ratingRow: {
    flexDirection: "row",
    gap: 8,
  },
  ratingBtn: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  ratingActive: {
    borderColor: "#FF6B35",
    backgroundColor: "#FFF3E0",
  },
  ratingEmoji: {
    fontSize: 22,
  },
  ratingLabel: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  ratingLabelActive: {
    color: "#FF6B35",
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
