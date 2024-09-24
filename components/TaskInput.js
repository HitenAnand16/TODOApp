import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TaskInput = ({ task, setTask, addTask }) => {
  const [priority, setPriority] = useState("Low"); // Default priority

  const handlePriorityChange = (level) => {
    setPriority(level);
  };

  const handleAddTask = () => {
    if (task) {
      // Ensure task is not empty
      addTask({ text: task, priority }); // Pass text and priority as an object
      setTask(""); // Clear input
      setPriority("Low"); // Reset priority to default
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={task}
        onChangeText={setTask}
      />

      {/* Priority Buttons */}
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            styles.lowPriority,
            priority !== "Low" && styles.unselectedButton, // Apply fade effect to unselected
          ]}
          onPress={() => handlePriorityChange("Low")}
        >
          <Text style={styles.priorityText}>L</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            styles.mediumPriority,
            priority !== "Medium" && styles.unselectedButton, // Apply fade effect to unselected
          ]}
          onPress={() => handlePriorityChange("Medium")}
        >
          <Text style={styles.priorityText}>M</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            styles.highPriority,
            priority !== "High" && styles.unselectedButton, // Apply fade effect to unselected
          ]}
          onPress={() => handlePriorityChange("High")}
        >
          <Text style={styles.priorityText}>H</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Ionicons name="checkmark" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F1EB",
    padding: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#388e3c",
    borderRadius: 10,
    padding: 15,
  },
  priorityContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  lowPriority: {
    backgroundColor: "#4caf50", // Green for Low priority
  },
  mediumPriority: {
    backgroundColor: "#ff9800", // Orange for Medium priority
  },
  highPriority: {
    backgroundColor: "#f44336", // Red for High priority
  },
  unselectedButton: {
    opacity: 0.5, // Reduce opacity for unselected buttons
  },
  priorityText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white", // Text color for all priority buttons
  },
});

export default TaskInput;
