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
import { theme } from "../theme";

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
    Alert.alert("已保存", "你的增肌目标已更新");
  }

  const tips = [
    { icon: "flame", text: "瘦子增肌每天需要摄入 2500-3000 kcal", color: "#FF9800" },
    { icon: "barbell", text: "蛋白质摄入建议每公斤体重 1.6-2.2g", color: theme.colors.secondary },
    { icon: "water", text: "每天喝够 2-3L 水", color: theme.colors.info },
    { icon: "moon", text: "保证 7-9 小时睡眠有助于肌肉恢复", color: "#5C6BC0" },
    { icon: "fitness", text: "每餐都包含蛋白质 + 碳水 + 健康脂肪", color: theme.colors.primary },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 目标设置卡片 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="flag" size={20} color={theme.colors.primary} />
          <Text style={styles.cardTitle}>个人目标</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>每日目标热量</Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, { paddingRight: 56 }]}
              value={cal}
              onChangeText={setCal}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>kcal</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>每日目标蛋白质</Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              value={pro}
              onChangeText={setPro}
              keyboardType="numeric"
            />
            <Text style={styles.unitText}>g</Text>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>目标体重</Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, { paddingRight: 40 }]}
              value={wt}
              onChangeText={setWt}
              keyboardType="decimal-pad"
            />
            <Text style={styles.unitText}>kg</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>保存目标</Text>
        </TouchableOpacity>
      </View>

      {/* 增肌小贴士 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb" size={20} color="#FF9800" />
          <Text style={styles.cardTitle}>瘦子增肌小贴士</Text>
        </View>

        {tips.map((tip, i) => (
          <View key={i} style={[styles.tipItem, i < tips.length - 1 && styles.tipBorder]}>
            <View style={[styles.tipIcon, { backgroundColor: tip.color + "15" }]}>
              <Ionicons name={tip.icon} size={18} color={tip.color} />
            </View>
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        ))}
      </View>

      {/* 关于 */}
      <View style={styles.aboutSection}>
        <Ionicons name="fitness" size={16} color={theme.colors.textDisabled} />
        <Text style={styles.version}>增肌打卡 v1.0.0</Text>
      </View>
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
  card: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 16,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.bgGrey,
    borderRadius: theme.shape.sm,
    padding: 12,
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  inputWithUnit: {
    position: "relative",
  },
  unitText: {
    position: "absolute",
    right: 12,
    top: 12,
    fontSize: 14,
    color: theme.colors.textHint,
    fontWeight: "500",
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.sm,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  tipBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.shape.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  aboutSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 16,
  },
  version: {
    fontSize: 13,
    color: theme.colors.textDisabled,
  },
});
