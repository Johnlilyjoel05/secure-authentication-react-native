

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const checkLockout = async () => {
      const lockoutTime = await AsyncStorage.getItem(`lockoutTime_${email}`);
      if (lockoutTime) {
        const currentTime = Date.now();
        if (currentTime < parseInt(lockoutTime)) {
          setIsLocked(true);
          startCountdown(parseInt(lockoutTime) - currentTime); // Start countdown
        } else {
          setIsLocked(false);
          setFailedAttempts(0); // Reset failed attempts after lockout expires
          await AsyncStorage.removeItem(`lockoutTime_${email}`);
        }
      }
    };
    if (email) {
      checkLockout();
    }
  }, [email]);

  const startCountdown = (timeRemaining) => {
    setRemainingTime(timeRemaining);
    const interval = setInterval(() => {
      timeRemaining -= 1000;
      setRemainingTime(timeRemaining);

      // Log the remaining time in the terminal
      console.log(`Time remaining: ${Math.ceil(timeRemaining / 1000)} seconds`);

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setIsLocked(false);
        setFailedAttempts(0);
        AsyncStorage.removeItem(`lockoutTime_${email}`);
        console.log("Lockout expired. User can try logging in again.");
      }
    }, 1000);
  };

  const handleLogin = async () => {
    if (isLocked) {
      Alert.alert("Account Locked", "Too many failed attempts. Please try again later.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
      const user = userCredential.user;
      if (user.emailVerified) {
        Alert.alert("Success", "Login successful!");
        setFailedAttempts(0); 
      } else {
        Alert.alert("Error", "Please verify your email before logging in.");
        AUTH.signOut();
      }
    } catch (error) {
      setFailedAttempts((prev) => prev + 1);
      if (failedAttempts + 1 >= 2) {
        lockUser();
      } else {
        Alert.alert("Error", "Invalid email or password. Please try again.");
      }
    }
  };

  const lockUser = async () => {
    const lockoutTime = Date.now() + 2 * 60 * 1000; // Lock for 2 minutes
    await AsyncStorage.setItem(`lockoutTime_${email}`, lockoutTime.toString());
    setIsLocked(true);
    startCountdown(2 * 60 * 1000); // Start countdown for 2 minutes
    Alert.alert("Account Locked", "Too many failed attempts. Please try again in 2 minutes.");
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#00879E" }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F9FF",
  },
  textInput: {
    height: 40,
    margin: 12,
    width: 300,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    color: "white",
  },
});