import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(AUTH, email);
            Alert.alert("Success", "Password reset email sent! Please check your inbox.", [
                { text: "OK", onPress: () => navigation.navigate("Login") }
            ]);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Forgot Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>Send Reset Link</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;

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