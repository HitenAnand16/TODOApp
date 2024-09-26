import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { userProfileState } from "../recoil/userProfileAtom"; // Import the user profile atom

const Greeting = () => {
  // Get today's date
  const today = new Date();

  const userProfile = useRecoilValue(userProfileState); // Get user profile from Recoil

  // Function to format date
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Add suffix for day
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;

    return `${dayWithSuffix}, ${month} ${year}`;
  };

  // Function to get day suffix
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Catch 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <View style={styles.greetingContainer}>
      <View>
        <Text style={styles.noTaskText}>
          Hello 👋 {userProfile.name || "User"}
        </Text>
        <Text style={styles.addTask}>Welcome Back! - {formatDate(today)}</Text>
      </View>
      <View>
        {userProfile.picture ? (
          <Image
            source={{ uri: userProfile.picture }}
            style={styles.profileImage}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#F2F1EB",
  },
  greetingContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  noTaskText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F2F1EB",
  },
  addTask: {
    fontSize: 18,
    color: "#F2F1EB",
  },
  dateText: {
    fontSize: 18,
    color: "#F2F1EB",
    marginTop: 5,
  },
});

export default Greeting;
