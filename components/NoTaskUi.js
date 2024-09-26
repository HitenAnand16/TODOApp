// NoTaskUI.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRecoilValue } from "recoil";
import { userProfileState } from "../recoil/userProfileAtom"; // Import the user profile atom

const NoTaskUI = () => {
  const userProfile = useRecoilValue(userProfileState); // Get user profile from Recoil

  return (
    <View style={styles.noTaskContainer}>
      <StatusBar style="dark" />
      <Text style={styles.noTaskText}>
        Hello 👋 {userProfile.name || "User"},
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          // marginLeft: 10,
        }}
      >
        {userProfile.picture ? (
          <Image
            source={{ uri: userProfile.picture }}
            style={styles.profileImage}
          />
        ) : null}
        <Text style={styles.addTask}>You haven't </Text>
      </View>
      <Text style={styles.addTask}>added any task yet!</Text>
      <Text style={styles.noTaskProgress}>Click + icon to add a task now</Text>
      <Text style={styles.noTaskEncouragement}>
        We are happy to welcome you
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noTaskContainer: {
    justifyContent: "center",
    backgroundColor: "#F2F1EB",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: "55%",
    paddingHorizontal: 45,
  },
  noTaskText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#424242",
  },
  noTaskProgress: {
    fontSize: 22,
    color: "#388e3c",
    marginTop: 25,
  },
  noTaskEncouragement: {
    fontSize: 22,
    color: "#616161",
  },
  addTask: {
    fontSize: 36,
    color: "#424242",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 8,
    borderWidth: 1,
  },
});

export default NoTaskUI;
