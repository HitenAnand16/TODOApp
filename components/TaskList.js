import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";
import Greeting from "./Greeting";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  const numColumns = 2; // Define a constant number of columns

  return (
    <SafeAreaView style={styles.container}>
      <Greeting />
      <FlatList
        data={tasks}
        key={numColumns} // Use numColumns as the key to force re-render when columns change
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        )}
        numColumns={numColumns} // Set the number of columns
        columnWrapperStyle={styles.row} // Additional styling for row
        contentContainerStyle={styles.flatListContainer} // For padding and spacing
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  row: {
    justifyContent: "space-between", // Ensure spacing between columns
    // marginBottom: 10, // Space between rows
  },
  flatListContainer: {
    paddingBottom: 20, // Add padding at the bottom to avoid cutting off items
  },
});

export default TaskList;
