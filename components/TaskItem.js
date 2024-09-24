import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Helper function to style based on priority
const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return {
        borderColor: "#ffcccc",
        borderWidth: 2,
        backgroundColor: "#fff",
        height: 100,
      };
    case "Medium":
      return {
        borderColor: "#ffe6cc",
        borderWidth: 2,
        backgroundColor: "#fff",
        height: 100,
      };
    case "Low":
      return {
        borderColor: "#ccffcc",
        borderWidth: 2,
        backgroundColor: "#fff",
        height: 100,
      };
    default:
      return {
        borderColor: "#cccccc",
        borderWidth: 2,
        backgroundColor: "#fff",
        height: 100,
      };
  }
};

// Format the deadline into a more UI-friendly format (e.g., day of the week and date)
const formatDeadline = (deadline) => {
  if (deadline === "NA") {
    return { day: "", date: "NA" };
  }
  if (deadline) {
    const dateObj = new Date(deadline);
    const options = { weekday: "short" };
    const day = dateObj.toLocaleDateString("en-US", options);
    const date = dateObj.getDate();
    return { day, date };
  }
  return { day: "--", date: "NA" };
};

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { backgroundColor, borderColor, borderWidth, height } =
    getPriorityStyles(task.priority);
  const { day, date } = formatDeadline(task.deadline);

  // Confirmation alert for deletion
  const confirmDelete = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteTask(task.id) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          { backgroundColor, borderColor, borderWidth, height },
        ]}
      >
        <View style={styles.deadlineCircleContainer}>
          <View style={styles.deadlineCircle}>
            <Text style={styles.deadlineDate}>{date}</Text>
            <Text style={styles.deadlineDay}>{day}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleTaskCompletion(task.id)}
          style={styles.taskContainer}
        >
          <View style={styles.iconContainer}>
            {task.completed ? (
              <Ionicons name="checkmark-circle" size={28} color="#4CAF50" /> // Green check for completed
            ) : (
              <Ionicons name="ellipse-outline" size={28} color="#cccccc" /> // Hollow circle for not completed
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, task.completed && styles.completed]}>
              {task.text.toUpperCase()}
            </Text>
            <Text style={styles.priorityText}>Priority: {task.priority}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="#FF3D00" />
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#f9f9f9",
    elevation: 3,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  priorityText: {
    fontSize: 16,
    color: "#555",
  },
  descriptionText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  dueDateText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  deadlineCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deadlineCircle: {
    borderRadius: 100,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  deadlineDate: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  deadlineDay: {
    fontSize: 18,
    color: "#fff",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
  },
});

export default TaskItem;
