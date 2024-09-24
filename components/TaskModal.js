import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // Assuming this is used for picking date/time

const TaskModal = ({ visible, onClose, addTask, task, setTask }) => {
  const [priority, setPriority] = useState("Low"); // Default priority
  const [deadline, setDeadline] = useState(null); // State for deadline (null or date)
  const [showDatePicker, setShowDatePicker] = useState(false); // State to show/hide date picker
  const [isNaSelected, setIsNaSelected] = useState(false); // State to track 'NA' selection

  const handlePriorityChange = (level) => {
    setPriority(level);
  };

  const handleAddTask = () => {
    const newTask = {
      text: task,
      priority: priority, // or your current priority state
      deadline, // Pass the selected deadline
    };
    addTask(newTask);
    setTask(""); // Clear task input after adding
    setDeadline(new Date()); // Reset deadline
    onClose(); // Close the modal
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeadline(selectedDate); // Store the selected date
      setIsNaSelected(false); // Unselect 'NA' if a date is chosen
      console.log("Selected deadline:", selectedDate); // Log the selected date
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Task description..."
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#888"
        />

        {/* Priority Buttons */}
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === "Low" && styles.selectedPriority,
            ]}
            onPress={() => handlePriorityChange("Low")}
          >
            <Text style={styles.priorityText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === "Medium" && styles.selectedPriority,
            ]}
            onPress={() => handlePriorityChange("Medium")}
          >
            <Text style={styles.priorityText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === "High" && styles.selectedPriority,
            ]}
            onPress={() => handlePriorityChange("High")}
          >
            <Text style={styles.priorityText}>High</Text>
          </TouchableOpacity>
        </View>

        {/* Deadline selection */}
        <View style={styles.deadlineContainer}>
          <TouchableOpacity
            onPress={showDateTimePicker}
            style={styles.deadlineButton}
          >
            <Text style={styles.deadlineText}>
              {deadline
                ? `Deadline: ${deadline.toLocaleString()}`
                : "Select Deadline"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsNaSelected(true);
              setDeadline(null); // Reset the deadline if 'NA' is selected
            }}
            style={[
              styles.deadlineButton,
              isNaSelected && styles.selectedNaButton,
            ]}
          >
            <Text style={styles.deadlineText}>No Deadline (NA)</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()} // This can be adjusted to a default value
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FF3D00" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F2F1EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  addButton: {
    backgroundColor: "#388e3c",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  closeButton: {
    padding: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedPriority: {
    backgroundColor: "#388e3c",
    borderColor: "#388e3c",
  },
  priorityText: {
    fontWeight: "bold",
    color: "#333",
  },
  deadlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  deadlineButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  deadlineText: {
    fontWeight: "bold",
    color: "#333",
  },
  selectedNaButton: {
    backgroundColor: "#ffcccc", // Highlight when NA is selected
  },
});

export default TaskModal;
