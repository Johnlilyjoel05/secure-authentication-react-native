// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const SetPin = () => {
//     const [pin, setPin] = useState("");
//     const [confirmPin, setConfirmPin] = useState("");

//     const handleSetPin = async () => {
//         if (pin !== confirmPin) {
//             Alert.alert("Error", "PINs do not match. Please try again.");
//             return;
//         }

//         try {
//             // Store the PIN securely
//             await SecureStore.setItemAsync("userPin", pin);
//             Alert.alert("Success", "PIN has been set successfully!");
//         } catch (error) {
//             console.error("Error setting PIN:", error); // Log the error
//             Alert.alert("Error", "Failed to set PIN. Please try again.");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={{ fontWeight: "bold", fontSize: 25 }}>Set Your PIN</Text>
//             <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter PIN"
//                 value={pin}
//                 onChangeText={(text) => setPin(text)}
//                 secureTextEntry={true}
//                 keyboardType="numeric"
//             />
//             <TextInput
//                 style={styles.textInput}
//                 placeholder="Confirm PIN"
//                 value={confirmPin}
//                 onChangeText={(text) => setConfirmPin(text)}
//                 secureTextEntry={true}
//                 keyboardType="numeric"
//             />
//             <TouchableOpacity onPress={handleSetPin} style={styles.button}>
//                 <Text style={{ fontWeight: "bold", fontSize: 22 }}>Set PIN</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default SetPin;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textInput: {
//         height: 40,
//         margin: 12,
//         width: 300,
//         padding: 5,
//         borderWidth: 1,
//     },
//     button: {
//         backgroundColor: "blue",
//         padding: 10,
//         borderRadius: 5,
//         alignItems: "center",
//         marginTop: 20,
//     },
// });



import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SetPin = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSetPin = async () => {
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match. Please try again.');
      return;
    }

    try {
      await SecureStore.setItemAsync('userPin', pin); // Store the PIN securely
      Alert.alert('Success', 'PIN has been set successfully!');
      navigation.navigate('Dashboard'); // Redirect to Dashboard after setting the PIN
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'Failed to set PIN. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Set Your PIN</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter PIN"
        value={pin}
        onChangeText={(text) => setPin(text)}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm PIN"
        value={confirmPin}
        onChangeText={(text) => setConfirmPin(text)}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleSetPin} style={styles.button}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Set PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    width: 300,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});