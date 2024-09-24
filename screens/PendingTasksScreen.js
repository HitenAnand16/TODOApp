import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useRecoilValue } from "recoil";
import { pendingTasksState } from "../recoil/selector";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import MotivationalQuote from "../components/MotivationalQuote"; // Import the motivational quote component

const PendingTasksScreen = () => {
  const pendingTasks = useRecoilValue(pendingTasksState);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Pending Tasks</Text>
        <MotivationalQuote />
        {pendingTasks.length > 0 ? (
          <FlatList
            data={pendingTasks}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <MaterialIcons name="task" size={24} color="#424242" />
                <View style={styles.taskDetails}>
                  <Text style={styles.task}>{item.text}</Text>
                  {item.deadline && (
                    <Text style={styles.deadline}>
                      Deadline: {new Date(item.deadline).toLocaleString()}
                    </Text>
                  )}
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.noTasksText}>No pending tasks</Text>
            <Text style={styles.emptyDescription}>
              Create your first task to get started!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#181C14",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#F2F1EB",
    marginBottom: 20,
  },
  taskContainer: {
    backgroundColor: "#F2F1EB",
    borderRadius: 10,
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  taskDetails: {
    marginLeft: 10,
  },
  task: {
    fontSize: 22,
    color: "#424242",
  },
  deadline: {
    fontSize: 16,
    color: "#666",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noTasksText: {
    fontSize: 22,
    color: "#F2F1EB",
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#F2F1EB",
    marginTop: 10,
    textAlign: "center",
  },
});

export default PendingTasksScreen;
