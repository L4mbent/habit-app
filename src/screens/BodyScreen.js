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
import { getToday, formatDate } from "../utils";

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
      setNotes("");
      loadHistory();
    } catch (e) {
      Alert.alert("保存失败", e.message);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>身体数据</Text>
      <Text style={styles.date}>{formatDate(today)}</Text>

      <View style={styles.form}>
        <Text style={styles.fieldLabel}>体重 (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder={`目标: ${goals.targetWeight}kg`}
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        <Text style={styles.fieldLabel}>体脂率 (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="例：15"
          value={bodyFat}
          onChangeText={setBodyFat}
          keyboardType="decimal-pad"
        />

        <Text style={styles.fieldLabel}>备注</Text>
        <TextInput
          style={styles.input}
          placeholder="训练感受、身体状态..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>记录</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>历史记录</Text>
      {loading ? (
        <ActivityIndicator color="#FF6B35" />
      ) : history.length === 0 ? (
        <Text style={styles.empty}>暂无记录</Text>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
            <View style={styles.historyStats}>
              {item.weight && <Text style={styles.historyStat}>⚖️ {item.weight}kg</Text>}
              {item.body_fat && <Text style={styles.historyStat}>📊 {item.body_fat}%</Text>}
            </View>
            {item.notes ? <Text style={styles.historyNotes}>{item.notes}</Text> : null}
          </View>
        ))
      )}
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
  },
  date: {
    fontSize: 14,
    color: "#999",
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
    backgroundColor: "#4CAF50",
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
  empty: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginTop: 16,
  },
  historyItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  historyStats: {
    flexDirection: "row",
    gap: 16,
  },
  historyStat: {
    fontSize: 13,
    color: "#555",
  },
  historyNotes: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
