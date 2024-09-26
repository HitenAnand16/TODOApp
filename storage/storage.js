// src/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@tasks";

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load tasks from storage:", e);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save tasks to storage:", e);
  }
};
