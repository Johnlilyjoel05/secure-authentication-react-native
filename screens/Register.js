


import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isPasswordStrong = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const hasNoContinuousSeries = (password) => {
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        for (let i = 0; i < lowerCase.length - 3; i++) {
            const series = lowerCase.substring(i, i + 4);
            if (password.toLowerCase().includes(series)) {
                return false;
            }
        }

        for (let i = 0; i < upperCase.length - 3; i++) {
            const series = upperCase.substring(i, i + 4);
            if (password.includes(series)) {
                return false;
            }
        }

        for (let i = 0; i < numbers.length - 3; i++) {
            const series = numbers.substring(i, i + 4);
            if (password.includes(series)) {
                return false;
            }
        }

        return true;
    };

    const registerUser = async () => {
        if (!isPasswordStrong(password)) {
            Alert.alert(
                "Weak Password",
                "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }

        if (!hasNoContinuousSeries(password)) {
            Alert.alert(
                "Invalid Password",
                "Password must not contain continuous series like 'abcd', '1234', or similar patterns."
            );
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            Alert.alert("Success", "Verification email sent. Please verify your email before logging in.");

            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Register</Text>
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
            <TouchableOpacity onPress={registerUser} style={styles.button}>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    },
});