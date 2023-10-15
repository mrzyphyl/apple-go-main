import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Axios from 'axios'; // Import Axios
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    username: '',
    password: '',
    isValidUser: true,
    isValidPassword: true,
    checkTextInputChange: true,
  });

  const textUsernameChange = (val) => {
    if (val.length >= 4) {
      setState({
        ...state,
        username: val,
        checkTextInputChange: true,
      });
    } else {
      setState({
        ...state,
        username: val,
        checkTextInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.length >= 6) {
      setState({
        ...state,
        password: val,
        isValidPassword: true,
      });
    } else {
      setState({
        ...state,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleUser = (val) => {
    if (val.trim().length >= 4) {
      setState({
        ...state,
        isValidUser: true,
      });
    } else {
      setState({
        ...state,
        isValidUser: false,
      });
    }
  };

  const resetTextFields = () => {
    setState({
      ...state,
      username: '',
      password: '',
      isValidUser: true,
      isValidPassword: true,
      checkTextInputChange: true,
    });
  };

  const handleLogout = () => {
    resetTextFields();
    navigation.navigate('LoginScreen');
  };

  const LoginData = () => {
    console.log("username", state.username);
    console.log("password", state.password);
    Axios.post("http://localhost:8000/data/signin", {
      username: state.username,
      password: state.password,
    })
      .then(async (response) => {
        if (response.data.status === "success") {
          // Save the login status in local storage
          await AsyncStorage.setItem('isLoggedIn', 'true');
  
          // Save the response data in local storage
          await AsyncStorage.setItem('userData', JSON.stringify(response.data));
  
          // Navigate to the Dashboard screen
          navigation.push("Dashboard", { username: state.username });
          resetTextFields();
        } else {
          alert("Username and Password do not match");
        }
        console.log("response", response);
      })
      .catch((e) => {
        alert("Unsuccessful attempt");
      });
  };


  return (
    <View>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Animatable.View animation="rubberBand" duration={1000}>
            <View style={styles.data}>
              <View style={styles.logoContainer}>
                <Logo style={styles.logo} />
              </View>
              <Text style={styles.applego}>AppleGo</Text>
              <Text style={styles.userdata}>Username</Text>
              <TextInput
                placeholder="Enter Username"
                style={styles.username}
                onChangeText={(e) => textUsernameChange(e)}
                onEndEditing={(e) => handleUser(e.nativeEvent.text)}
                value={state.username}
              />
              {state.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.error}>Username should be 4 characters long</Text>
                </Animatable.View>
              )}

              <Text style={styles.userdata}>Password</Text>
              <TextInput
                secureTextEntry
                placeholder="Password"
                style={styles.username}
                onChangeText={(e) => handlePasswordChange(e)}
                value={state.password}
              />
              {state.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.error}>Password should be 6 characters long</Text>
                </Animatable.View>
              )}

              <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={['#C70039', '#C70039']}
                  style={styles.LoginUser}
                >
                  <Text
                    style={[styles.Button1, { fontWeight: 'bold', color: 'white' }]}
                    onPress={LoginData}
                    // onPress={() => {navigation.navigate('Dashboard'), resetTextFields()}}
                  >
                    Login
                  </Text>
                </LinearGradient>
                <Text
                  style={styles.signup}
                  onPress={() => navigation.navigate('RegisterScreen')}
                >
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E6D5B8',
  },
  data: {
    marginTop: 60,
    backgroundColor: '#fff',
    height: 700,
    paddingTop: 80,
    alignSelf: 'center',
    width: '95%',
    borderRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  username: {
    fontFamily: 'sans-serif',
    alignSelf: 'center',
    padding: 15,
    textAlign: 'center',
    borderBottomColor: 'rgba(100,50,40,0.2)',
    borderBottomWidth: 1,
    width: '80%',
    backgroundColor: '#d8dbd7',
    fontSize: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  error: {
    color: 'red',
    fontSize: 15,
    paddingLeft: 80,
  },
  LoginUser: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    width: '80%',
    borderRadius: 10,
  },
  Button1: {
    alignSelf: 'center',
    fontSize: 20,
    justifyContent: 'space-between',
  },
  userdata: {
    paddingTop: 20,
    paddingBottom: 10,
    alignSelf: 'center',
    color: '#080808',
    fontSize: 20,
    justifyContent: 'center',
  },
  applego: {
    paddingBottom: 20,
    alignSelf: 'center',
    color: '#111211',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    
  },
  signup: {
    paddingTop: 10,
    color: '#080808',
    fontSize: 17,
    alignSelf: 'center',
  },
  forgotPassword: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 10,
  },
});
