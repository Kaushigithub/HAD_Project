import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EmailVerificationScreen from '../emailVerificationScreen/EmailVerificationScreen';
const RegistrationScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState(''); // Added state variable for middle name
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Added state variable for gender
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = async () => {
      // TODO: Send registration details to the backend, then navigate to the verification screen
      const registrationEndpoint = 'https://yourbackend.com/api/register';  
      const userDetails = {
        firstName,
        middleName,
        lastName,
        mobileNumber,
        age,
        gender,
        password,
        confirmPassword,
      };
      try {
        // Send a POST request to your backend server using Axios
        const response = await axios.post(registrationEndpoint, userDetails);
    
        // Assuming your backend sends back a JSON response
        // Check if the registration is successful based on your backend response
        if (response.status === 200 || response.status === 201) {
          // If registration is successful, navigate to the EmailVerificationScreen
          navigation.navigate('EmailVerificationScreen');
        } else {
          // If the server responds with an error status, handle it here
          console.error('Registration failed:', response.data.message);
          // Optionally show an error message to the user...
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Network or server error:', error.response ? error.response.data : error.message);
        // Optionally show a network error message to the user...
      }
    // navigation.navigate(EmailVerificationScreen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonText} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
          style={styles.input}
        />
        <TextInput
          value={middleName}
          onChangeText={setMiddleName}
          placeholder="Enter Middle Name" // Added input for middle name
          style={styles.input}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
          style={styles.input}
        />
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter Mobile Number"
          style={styles.input}
        />
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Enter Age"
          style={styles.input}
        />
       <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" /> 
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Others" value="others" />
        </Picker>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleRegistration}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#f0f0f0',
    // justifyContent: 'space-between', 

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
    bottom: -1,
    right: 10,
    color: '#7f3db5', // Blue color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#7f3db5'
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#7f3db5', // Purple color
    padding: 15,
    borderRadius: 30, // Slightly rounded corners
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegistrationScreen;