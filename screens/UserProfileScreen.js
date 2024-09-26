// screens/UserProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userProfileState } from "../recoil/userProfileAtom"; // Import the user profile atom

const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const userProfile = useRecoilValue(userProfileState); // Get current user profile state
  const setUserProfile = useSetRecoilState(userProfileState); // To update user profile

  useEffect(() => {
    // If user profile is already set, navigate to MainTabs
    if (userProfile.name && userProfile.picture) {
      navigation.navigate("MainTabs");
    }
  }, [userProfile, navigation]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setUserProfile({ name, picture: image });
    navigation.navigate("MainTabs"); // Navigate to MainTabs after setting the profile
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Create Your Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#CCC" // Placeholder text in a lighter gray
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181C14", // Dark background color
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f9f9f9", // Text color for header
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: "#f9f9f9", // Text color for sub-header
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#A0D468", // Light green border color
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#f9f9f9",
    color: "black",
    fontSize: 16,
  },
  pickButton: {
    backgroundColor: "#f9f9f9", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#f9f9f9", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#1A1A1A", // Text color for buttons
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 20,
    borderColor: "#A0D468", // Border color matching the logo
    borderWidth: 2,
  },
});

export default UserProfileScreen;
