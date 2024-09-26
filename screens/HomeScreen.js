// HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { StatusBar } from "expo-status-bar";
import { taskListState } from "../recoil/atoms";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import NoTaskUI from "../components/NoTaskUi";
import FloatingActionButton from "../components/FloatingActionButton";
import TaskModal from "../components/TaskModal";
import { getTasks, saveTasks } from "../storage/storage"; // Import the storage functions

const HomeScreen = ({ userProfile }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [tasks, setTasks] = useRecoilState(taskListState);
  const [isAdding, setIsAdding] = useState(false);
  const rotation = useState(new Animated.Value(0))[0];

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await getTasks();
      setTasks(savedTasks);
    };

    loadTasks();
  }, []); // Empty dependency array to run only once

  // Save tasks to local storage whenever the task list updates
  useEffect(() => {
    const saveTasksToStorage = async () => {
      await saveTasks(tasks);
    };

    saveTasksToStorage();
  }, [tasks]); // Runs every time tasks change

  const addTask = (newTask) => {
    if (newTask.text) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now().toString(),
          text: newTask.text,
          completed: false,
          priority: newTask.priority,
          deadline: newTask.deadline,
        },
      ]);
      setTask("");
      setIsAdding(false);
      rotateIcon();
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
        setPriority={setPriority}
        onClose={() => {
          setIsAdding(false);
          setTask("");
          setPriority("Low");
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
