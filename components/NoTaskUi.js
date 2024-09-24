// NoTaskUI.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const NoTaskUI = () => {
  return (
    <View style={styles.noTaskContainer}>
      <StatusBar style="dark" />
      <Text style={styles.noTaskText}>Hello 👋 Hiten,</Text>
      <Text style={styles.addTask}>You haven't added any task yet!</Text>
      <Text style={styles.noTaskProgress}>Click + icon to add a task now</Text>
      <Text style={styles.noTaskEncouragement}>
        We are happy to welcome you
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noTaskContainer: {
    justifyContent: "center",
    backgroundColor: "#F2F1EB",
    borderRadius: 30,
    paddingHorizontal: 45,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: "55%",
  },
  noTaskText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#424242",
  },
  noTaskProgress: {
    fontSize: 22,
    color: "#388e3c",
    marginTop: 25,
  },
  noTaskEncouragement: {
    fontSize: 22,
    color: "#616161",
  },
  addTask: {
    fontSize: 40,
    color: "#424242",
    // marginTop: -30,
  },
});

export default NoTaskUI;
