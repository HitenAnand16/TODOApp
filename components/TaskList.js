import React from "react";
import { FlatList, View, Text } from "react-native";
import TaskItem from "./TaskItem";
import Greeting from "./Greeting";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <SafeAreaView>
      <Greeting />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default TaskList;
