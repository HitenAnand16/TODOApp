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
import { useRecoilState } from "recoil";
import { userProfileState } from "../recoil/userProfileAtom";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { defaultStyles } from "../constants/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const UserProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  useEffect(() => {
    // Load profile from AsyncStorage if it exists
    const loadUserProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("userProfile");
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setUserProfile(parsedProfile);
          setName(parsedProfile.name);
          setImage(parsedProfile.picture);
          navigation.navigate("MainTabs");
        }
      } catch (error) {
        console.log("Failed to load profile:", error);
      }
    };
    loadUserProfile();
  }, [navigation, setUserProfile]);

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

  const handleSubmit = async () => {
    const profileData = { name, picture: image };
    setUserProfile(profileData);
    try {
      // Save profile to AsyncStorage
      await AsyncStorage.setItem("userProfile", JSON.stringify(profileData));
      navigation.navigate("MainTabs");
    } catch (error) {
      console.log("Failed to save profile:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create Your Profile</Text>
            <TextInput
              style={[styles.input, styles.inputStyle]}
              placeholder="Enter your name"
              placeholderTextColor="#CCC"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity
              style={[defaultStyles.btn, styles.btnDark]}
              onPress={pickImage}
            >
              <Ionicons
                name="image"
                size={20}
                style={styles.btnIcon}
                color={"#fff"}
              />
              <Text style={styles.btnDarkText}>Pick an image</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity
              style={[defaultStyles.btn, styles.btnDark]}
              onPress={handleSubmit}
            >
              <Ionicons
                name="checkmark"
                size={20}
                style={styles.btnIcon}
                color={"#fff"}
              />
              <Text style={styles.btnDarkText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: 20, width: "100%" },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 40,
    alignItems: "center",
    paddingBottom: "10%",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f9f9f9",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#A0D468",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: "100%",
    backgroundColor: "#f9f9f9",
    color: "black",
    fontSize: 16,
  },
  inputStyle: {
    backgroundColor: "#fff",
    color: "#000",
  },
  btnDark: {
    backgroundColor: Colors.grey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },
  btnIcon: {
    paddingRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
    margin: 10,
    borderColor: "#A0D468",
    borderWidth: 2,
  },
});

export default UserProfileScreen;
