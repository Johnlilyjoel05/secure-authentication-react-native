


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import CustomHeader from './components/Header';
import ForgotPassword from './screens/ForgotPassword';
import { AUTH } from './FirebaseConfig';
import { Alert, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'; 

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState(false);

  function onAuthStateChanged(user) {
    if (user) {
      if (user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
        alert('Please verify your email before logging in.');
        AUTH.signOut();
      }
    } else {
      setUser(null);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = AUTH.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricAvailable) {
        Alert.alert('Biometric Authentication', 'Biometric authentication is not available on this device.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Biometric Authentication', 'No biometric authentication methods are enrolled.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setIsBiometricAuthenticated(true);
      } else {
        Alert.alert('Authentication Failed', 'Biometric authentication failed. Please try again.', [
          {
            text: 'OK',
            onPress: () => AUTH.signOut(),
          },
        ]);   
      }
    } catch (error) {
      console.error('Biometric Authentication Error:', error);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  useEffect(() => {
    if (user && !isBiometricAuthenticated) {
      handleBiometricAuth();
    }
  }, [user]);

  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <CustomHeader name="THREESTEP" />,
            headerStyle: { backgroundColor: '#A6F1E0', height: 100, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 25 },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <CustomHeader name="THREESTEP" />,
            headerStyle: { backgroundColor: '#A6F1E0', height: 100, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 25 },
          }}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{
            headerTitle: () => <CustomHeader name="THREESTEP" />,
            headerStyle: { backgroundColor: '#A6F1E0', height: 100, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 25 },
          }} 
        />
      </Stack.Navigator>
    );
  }

  if (user && !isBiometricAuthenticated) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <CustomHeader name="Dashboard" />,
          headerStyle: { backgroundColor: '#A6F1E0', height: 100, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 25 },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};