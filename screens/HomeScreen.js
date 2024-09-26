// HomeScreen.js
import React, { useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { StatusBar } from "expo-status-bar";
import { taskListState } from "../recoil/atoms";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import NoTaskUI from "../components/NoTaskUi";
import FloatingActionButton from "../components/FloatingActionButton";
import TaskModal from "../components/TaskModal";

const HomeScreen = ({ userProfile }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low"); // State for priority
  const [tasks, setTasks] = useRecoilState(taskListState);
  const [isAdding, setIsAdding] = useState(false);
  const rotation = useState(new Animated.Value(0))[0];

  const addTask = (newTask) => {
    if (newTask.text) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now().toString(),
          text: newTask.text,
          completed: false,
          priority: newTask.priority,
          deadline: newTask.deadline, // Include the deadline
        },
      ]);
      setTask(""); // Clear task input after adding
      setIsAdding(false); // Close the modal after adding
      rotateIcon(); // Rotate icon for animation
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const rotateIcon = () => {
    Animated.timing(rotation, {
      toValue: isAdding ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {tasks.length === 0 ? (
        <NoTaskUI userProfile={userProfile} />
      ) : (
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      )}
      <TaskModal
        visible={isAdding}
        task={task}
        setTask={setTask}
        addTask={addTask}
        setPriority={setPriority} // Pass setPriority to TaskModal
        onClose={() => {
          setIsAdding(false);
          setTask(""); // Clear task input when closing
          setPriority("Low"); // Reset priority when closing
        }}
      />
      <FloatingActionButton
        isAdding={isAdding}
        rotateInterpolate={rotateInterpolate}
        onPress={() => {
          setIsAdding(!isAdding);
          rotateIcon();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181C14" },
});

export default HomeScreen;
