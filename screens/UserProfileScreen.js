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
import AnimatedHeader from "../components/AnimatedHeader"; // Import the AnimatedHeader component\
import IntroInputs from "../components/IntroInputs";

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
          <AnimatedHeader />
          <IntroInputs />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});

export default UserProfileScreen;
