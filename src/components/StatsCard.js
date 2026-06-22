import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatsCard({ icon, label, value, color }) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={24} color={color || "#FF6B35"} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginTop: 6,
  },
  label: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
});
