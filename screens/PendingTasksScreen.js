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
import { MaterialIcons } from "@expo/vector-icons"; // Importing MaterialIcons
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
        {pendingTasks.length > 0 ? (
          <FlatList
            data={pendingTasks}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                {/* Changed the icon to an hourglass to represent pending */}
                <MaterialIcons
                  name="hourglass-empty"
                  size={28}
                  color="#6a1b9a"
                />
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
      <MotivationalQuote />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#181C14", // Original background color retained
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerText: {
    fontSize: 35, // Reduced size for better alignment
    fontWeight: "bold",
    color: "#F2F1EB",
    marginBottom: 20,
    alignSelf: "center",
  },
  taskContainer: {
    backgroundColor: "#FFF3E0", // Light orange background for the tasks
    borderRadius: 15,
    width: "100%", // Adjusted width to create padding
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  taskDetails: {
    marginLeft: 10,
  },
  task: {
    fontSize: 18, // Slightly smaller for better alignment with container size
    color: "#424242",
  },
  deadline: {
    fontSize: 14,
    color: "#FF7043", // Muted red-orange for deadlines
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noTasksText: {
    fontSize: 22,
    color: "#F2F1EB",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyDescription: {
    fontSize: 18,
    color: "#388e3c",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default PendingTasksScreen;
