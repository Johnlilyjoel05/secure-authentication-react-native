import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import TouchID from "react-native-touch-id";
import * as Keychain from "react-native-keychain";

const BiometricAuth = () => {
    const [pin, setPin] = useState("");

    const handleBiometricAuth = async () => {
        try {
            const success = await TouchID.authenticate("Authenticate with Biometrics");
            if (success) {
                Alert.alert("Success", "Biometric authentication successful!");
            }
        } catch (error) {
            Alert.alert("Biometric Failed", "Please enter your PIN as a fallback.");
        }
    };

    const handlePinAuth = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials && credentials.password === pin) {
                Alert.alert("Success", "PIN authentication successful!");
            } else {
                Alert.alert("Error", "Invalid PIN. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to authenticate with PIN.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Biometric Authentication</Text>
            <TouchableOpacity onPress={handleBiometricAuth} style={styles.button}>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>Use Biometrics</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                placeholder="Enter PIN"
                value={pin}
                onChangeText={(text) => setPin(text)}
                secureTextEntry={true}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={handlePinAuth} style={styles.button}>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>Authenticate with PIN</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BiometricAuth;

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
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
});