import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { upsertBodyStats, getBodyStatsHistory } from "../database";
import { useApp } from "../context/AppContext";
import { formatDate } from "../utils";
import { theme } from "../theme";

export default function BodyScreen() {
  const { goals, today } = useApp();
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [notes, setNotes] = useState("");
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
      const data = await getBodyStatsHistory(30);
      setHistory(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!weight && !bodyFat) {
      Alert.alert("提示", "请至少填写体重或体脂率");
      return;
    }
    try {
      await upsertBodyStats({
        date: today,
        weight: weight ? parseFloat(weight) : null,
        body_fat: bodyFat ? parseFloat(bodyFat) : null,
        notes,
      });
      Alert.alert("成功", "身体数据已记录");
      setWeight("");
      setBodyFat("");
      setNotes("");
      loadHistory();
    } catch (e) {
      Alert.alert("保存失败", e.message);
    }
  }

  const latestWeight = history.length > 0 ? history[0].weight : null;
  const weightDiff = latestWeight && goals.targetWeight
    ? (latestWeight - parseFloat(goals.targetWeight)).toFixed(1)
    : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 今日概览 */}
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Ionicons name="fitness" size={22} color={theme.colors.primary} />
          <Text style={styles.overviewTitle}>{formatDate(today)}</Text>
        </View>
        {latestWeight && (
          <View style={styles.weightRow}>
            <Text style={styles.weightLabel}>最新体重</Text>
            <View style={styles.weightValueRow}>
              <Text style={styles.weightValue}>{latestWeight}</Text>
              <Text style={styles.weightUnit}>kg</Text>
              {weightDiff && (
                <View
                  style={[
                    styles.weightDiff,
                    { backgroundColor: parseFloat(weightDiff) >= 0 ? "#E8F5E9" : "#FFEBEE" },
                  ]}
                >
                  <Ionicons
                    name={parseFloat(weightDiff) >= 0 ? "arrow-up" : "arrow-down"}
                    size={11}
                    color={parseFloat(weightDiff) >= 0 ? theme.colors.secondary : theme.colors.error}
                  />
                  <Text
                    style={[
                      styles.weightDiffText,
                      {
                        color: parseFloat(weightDiff) >= 0 ? theme.colors.secondary : theme.colors.error,
                      },
                    ]}
                  >
                    {Math.abs(weightDiff)}kg
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.targetHint}>目标 {goals.targetWeight}kg</Text>
          </View>
        )}
      </View>

      {/* 记录表单 */}
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Ionicons name="create" size={18} color={theme.colors.primary} />
          <Text style={styles.formTitle}>记录数据</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>体重</Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={[styles.input, { paddingRight: 36 }]}
                placeholder={`${goals.targetWeight}`}
                placeholderTextColor={theme.colors.textHint}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
              />
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>体脂率</Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={[styles.input, { paddingRight: 36 }]}
                placeholder="15"
                placeholderTextColor={theme.colors.textHint}
                value={bodyFat}
                onChangeText={setBodyFat}
                keyboardType="decimal-pad"
              />
              <Text style={styles.unitText}>%</Text>
            </View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>备注</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="训练感受、身体状态..."
            placeholderTextColor={theme.colors.textHint}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>记录</Text>
        </TouchableOpacity>
      </View>

      {/* 历史记录 */}
      <View style={styles.sectionHeader}>
        <Ionicons name="time" size={18} color={theme.colors.textPrimary} />
        <Text style={styles.sectionTitle}>历史记录</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
      ) : history.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="analytics-outline" size={40} color={theme.colors.textDisabled} />
          <Text style={styles.emptyText}>暂无记录</Text>
        </View>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={styles.historyDot} />
              <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.historyStats}>
              {item.weight && <Text style={styles.historyStat}>⚖️ {item.weight}kg</Text>}
              {item.body_fat && <Text style={styles.historyStat}>📊 {item.body_fat}%</Text>}
            </View>
            {item.notes ? (
              <Text style={styles.historyNotes} numberOfLines={1}>{item.notes}</Text>
            ) : null}
          </View>
        ))
      )}
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
  overviewCard: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 16,
    ...theme.shadows.sm,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  overviewTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  weightRow: {
    alignItems: "center",
    paddingVertical: 8,
  },
  weightLabel: {
    fontSize: 12,
    color: theme.colors.textHint,
    fontWeight: "500",
    marginBottom: 4,
  },
  weightValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  weightValue: {
    fontSize: 36,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  weightUnit: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: "500",
  },
  weightDiff: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  weightDiffText: {
    fontSize: 12,
    fontWeight: "600",
  },
  targetHint: {
    fontSize: 12,
    color: theme.colors.textHint,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.md,
    padding: 16,
    marginBottom: 20,
    ...theme.shadows.sm,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.divider,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
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
  notesInput: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.shape.sm,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textHint,
    marginTop: 8,
  },
  historyItem: {
    backgroundColor: theme.colors.bgPaper,
    borderRadius: theme.shape.sm,
    padding: 12,
    marginBottom: 8,
    ...theme.shadows.sm,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  historyStats: {
    flexDirection: "row",
    gap: 16,
    marginLeft: 16,
  },
  historyStat: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  historyNotes: {
    fontSize: 12,
    color: theme.colors.textHint,
    marginTop: 4,
    marginLeft: 16,
  },
});
