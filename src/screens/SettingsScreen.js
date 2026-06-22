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
import { useApp } from "../context/AppContext";

export default function SettingsScreen() {
  const { goals, updateGoals } = useApp();
  const [cal, setCal] = useState(goals.targetCalories);
  const [pro, setPro] = useState(goals.targetProtein);
  const [wt, setWt] = useState(goals.targetWeight);

  async function handleSave() {
    if (!cal || !pro || !wt) {
      Alert.alert("提示", "请填写所有目标值");
      return;
    }
    await updateGoals({
      targetCalories: cal,
      targetProtein: pro,
      targetWeight: wt,
    });
    Alert.alert("成功", "目标已更新");
  }

  const tips = [
    { icon: "flame", text: "瘦子增肌每天需要摄入 2500-3000 kcal" },
    { icon: "barbell", text: "蛋白质摄入建议每公斤体重 1.6-2.2g" },
    { icon: "water", text: "每天喝够 2-3L 水" },
    { icon: "moon", text: "保证 7-9 小时睡眠有助于肌肉恢复" },
    { icon: "fitness", text: "每餐都包含蛋白质 + 碳水 + 健康脂肪" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>个人目标</Text>

      <View style={styles.form}>
        <Text style={styles.fieldLabel}>每日目标热量 (kcal)</Text>
        <TextInput
          style={styles.input}
          value={cal}
          onChangeText={setCal}
          keyboardType="numeric"
        />

        <Text style={styles.fieldLabel}>每日目标蛋白质 (g)</Text>
        <TextInput
          style={styles.input}
          value={pro}
          onChangeText={setPro}
          keyboardType="numeric"
        />

        <Text style={styles.fieldLabel}>目标体重 (kg)</Text>
        <TextInput
          style={styles.input}
          value={wt}
          onChangeText={setWt}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>保存目标</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>瘦子增肌小贴士</Text>
      {tips.map((tip, i) => (
        <View key={i} style={styles.tipItem}>
          <Ionicons name={tip.icon} size={20} color="#FF6B35" />
          <Text style={styles.tipText}>{tip.text}</Text>
        </View>
      ))}

      <Text style={styles.version}>Habit Tracker v1.0.0</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#333",
  },
  saveBtn: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  version: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 12,
    marginTop: 24,
  },
});
