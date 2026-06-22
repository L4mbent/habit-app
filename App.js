import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AppProvider } from "./src/context/AppContext";

import HomeScreen from "./src/screens/HomeScreen";
import MealEntryScreen from "./src/screens/MealEntryScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import BodyScreen from "./src/screens/BodyScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FF6B35" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "今日打卡" }}
      />
      <Stack.Screen
        name="MealEntry"
        component={MealEntryScreen}
        options={{ title: "打卡" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Today") {
                iconName = focused ? "today" : "today-outline";
              } else if (route.name === "History") {
                iconName = focused ? "time" : "time-outline";
              } else if (route.name === "Body") {
                iconName = focused ? "fitness" : "fitness-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FF6B35",
            tabBarInactiveTintColor: "#999",
            tabBarStyle: {
              paddingBottom: 6,
              height: 56,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Today"
            component={HomeStack}
            options={{ tabBarLabel: "打卡" }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarLabel: "历史",
              headerShown: true,
              headerTitle: "历史记录",
              headerStyle: { backgroundColor: "#FF6B35" },
              headerTintColor: "#fff",
            }}
          />
          <Tab.Screen
            name="Body"
            component={BodyScreen}
            options={{
              tabBarLabel: "身体",
              headerShown: true,
              headerTitle: "身体数据",
              headerStyle: { backgroundColor: "#FF6B35" },
              headerTintColor: "#fff",
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "设置",
              headerShown: true,
              headerTitle: "设置",
              headerStyle: { backgroundColor: "#FF6B35" },
              headerTintColor: "#fff",
            }}
          />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </AppProvider>
  );
}
