import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Greeting = () => {
  // Get today's date
  const today = new Date();

  // Function to format date
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Add suffix for day
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;

    return `${dayWithSuffix}, ${month} ${year}`;
  };

  // Function to get day suffix
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Catch 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <View style={styles.greetingContainer}>
      <View>
        <Text style={styles.noTaskText}>Hello 👋 Hiten</Text>
        <Text style={styles.addTask}>Welcome Back!</Text>
        <Text style={styles.dateText}>{formatDate(today)}</Text>
      </View>
      <View>
        <MaterialIcons
          name="supervised-user-circle"
          size={35}
          style={{ color: "#F2F1EB" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  noTaskText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F2F1EB",
  },
  addTask: {
    fontSize: 24,
    color: "#F2F1EB",
  },
  dateText: {
    fontSize: 18,
    color: "#F2F1EB",
    marginTop: 5,
  },
});

export default Greeting;
