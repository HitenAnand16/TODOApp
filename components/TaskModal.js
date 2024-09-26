import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const TaskModal = ({ visible, onClose, addTask, task, setTask }) => {
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isNaSelected, setIsNaSelected] = useState(false);

  const handlePriorityChange = (level) => {
    setPriority(level);
  };

  const handleAddTask = () => {
    if (!task.trim()) {
      alert("Please add a task before proceeding.");
      return;
    }

    const newTask = {
      text: task,
      priority: priority,
      deadline,
    };

    addTask(newTask);
    setTask("");
    setDeadline(new Date());
    onClose();
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeadline(selectedDate);
      setIsNaSelected(false);
      console.log("Selected deadline:", selectedDate);
    }
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior="padding" // Adjusts based on the platform
          style={styles.keyboardAvoidingView}
        >
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
                  setDeadline(null);
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
                value={new Date()}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddTask}
              >
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#FF3D00" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    width: "90%",
  },
  card: {
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginVertical: 10,
  },
  deadlineButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  deadlineText: {
    fontWeight: "bold",
    color: "#333",
  },
  selectedNaButton: {
    backgroundColor: "#ffcccc",
  },
});

export default TaskModal;
