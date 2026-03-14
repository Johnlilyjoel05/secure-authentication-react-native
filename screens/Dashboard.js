import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (!AUTH.currentUser || !AUTH.currentUser.emailVerified) {
            Alert.alert("Access Denied", "Please verify your email to access the dashboard.");
        }
    }, []);

    const handleLogout = async () => {
        try {
            await AUTH.signOut();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };
    return (
        <><View style={styles.container}>
            <View style={styles.header}></View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        <View style={styles.content}>
                <Text style={styles.welcomeText}>Welcome to the Dashboard!</Text>
                <Text style={styles.infoText}>
                    Here you can manage your account, view analytics, and more.
                </Text>
            </View>
        </View>
        </>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "lightblue",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 20,
        alignSelf: "flex-end",
    },
    logoutButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
    },
});
