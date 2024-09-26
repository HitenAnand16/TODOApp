import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Helper function to style based on priority
const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return {
        borderColor: "#F2F1EB",
        borderWidth: 2,
        backgroundColor: "#FF9B9B",
        // height: 80,
      };
    case "Medium":
      return {
        borderColor: "#F2F1EB",
        borderWidth: 2,
        backgroundColor: "#FCDC94",
        // height: 80,
      };
    case "Low":
      return {
        borderColor: "#F2F1EB",
        borderWidth: 2,
        backgroundColor: "#D1E9F6",
        // height: 80,
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
    <View style={styles.gridItem}>
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
              <Ionicons name="checkmark-circle" size={20} color="#79AC78" /> // Green check for completed
            ) : (
              <Ionicons name="ellipse-outline" size={20} color="gray" /> // Hollow circle for not completed
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, task.completed && styles.completed]}>
              {task.text.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.priorityText}>Priority: {task.priority}</Text>
          <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
            <Ionicons name="trash" size={18} color="#FF3D00" />
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row", // Align children horizontally
    flexWrap: "wrap", // Allow children to wrap onto the next line
    // alignItems: "flex-start", // Align items at the top
    // justifyContent: "space-between", // Adjust space between items
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: "#f9f9f9",
    elevation: 3,
  },
  gridItem: {
    width: "50%",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginVertical: 15,
  },
  iconContainer: {
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#333",
    fontWeight: "800",
  },
  priorityText: {
    fontSize: 14,
    color: "#333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  dueDateText: {
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },
  deadlineCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deadlineCircle: {
    borderRadius: 100,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
  },
  deadlineDate: {
    fontSize: 12,
    color: "#444",
    fontWeight: "bold",
  },
  deadlineDay: {
    fontSize: 12,
    color: "#444",
    fontWeight: "bold",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#F2F1EB",
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
