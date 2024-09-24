import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import PendingTasksScreen from "./screens/PendingTasksScreen";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "grid" : "grid-outline";
              } else if (route.name === "Completed") {
                iconName = focused
                  ? "checkmark-circle"
                  : "checkmark-circle-outline";
              } else if (route.name === "PendingTasks") {
                iconName = focused ? "list" : "list-outline";
              }

              return (
                <View
                  style={focused ? styles.highlightedTab : styles.defaultTab}
                >
                  <Ionicons
                    name={iconName}
                    size={24}
                    color={focused ? "#000" : "#fff"}
                  />
                </View>
              );
            },
            tabBarStyle: {
              backgroundColor: "#181C14",
              borderTopWidth: 0,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#888",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="PendingTasks"
            component={PendingTasksScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  highlightedTab: {
    backgroundColor: "#F2F1EB",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 50,
  },
  defaultTab: {
    backgroundColor: "transparent",
    padding: 10,
  },
});
