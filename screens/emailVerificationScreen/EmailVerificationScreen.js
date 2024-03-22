import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
const EmailVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  
  const handleVerifyCode = async(code) => {
    const verifyEndpoint = 'https://yourbackend.com/api/verify'; // Replace with your actual API endpoint

    try {
      const response = await axios.post(verifyEndpoint, { code });
      
      if (response.data.success) { // Assuming your API responds with { success: true } on success
        Alert.alert("Verification Successful", "Your email has been verified!", [
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]);
      } else {
        Alert.alert("Verification Failed", response.data.message || "The code you entered is not valid.");
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      Alert.alert("Verification Error", error.response?.data.message || "An error occurred during verification.");
    }
  };
  const handleResendCode = async (email) => {
    const resendEndpoint = 'https://yourbackend.com/api/resend-code'; // Replace with your actual API endpoint
  
    try {
      const response = await axios.post(resendEndpoint, { email });
      
      if (response.data.success) { // Assuming your API responds with { success: true } on success
        Alert.alert("Code Sent", "A new verification code has been sent to your email.");
      } else {
        Alert.alert("Failed", response.data.message || "Failed to resend the verification code.");
      }
    } catch (error) {
      console.error('Error resending code:', error);
      Alert.alert("Resend Error", error.response?.data.message || "An error occurred while trying to resend the code.");
    }
  };
  const headerHeight = useHeaderHeight();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.backButtonText, { top: headerHeight }]} onPress={() => navigation.navigate('RegistrationScreen')}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter Confirmation Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the 6-digit code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendText}>Resend code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10, 
    borderRadius: 5, 
  },
  backButtonText: {
    fontSize: 20,
    bottom: 260,
    right: 80,
    color: '#7f3db5', // Blue color
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7f3db5',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#7f3db5',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resendText: {
    color: '#4630EB',
    marginTop: 15,
  },
});

export default EmailVerificationScreen;
