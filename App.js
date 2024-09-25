import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import PendingTasksScreen from "./screens/PendingTasksScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import { RecoilRoot } from "recoil";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = focused ? "grid" : "grid-outline";
        } else if (route.name === "PendingTasks") {
          iconName = focused ? "list" : "list-outline";
        }

        return (
          <View style={focused ? styles.highlightedTab : styles.defaultTab}>
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
);

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
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
