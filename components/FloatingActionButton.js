// FloatingActionButton.js
import React from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FloatingActionButton = ({ isAdding, rotateInterpolate, onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Ionicons name="add" size={28} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#388e3c",
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingActionButton;
