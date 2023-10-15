import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default function StartScreen({ navigation }) {
  return (
    <Background style={styles.background}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.header}>AppleGo</Text>
        <Text style={styles.description}>
          Explore, Order, Enjoy.
        </Text>
        <Button
          style={[styles.loginButton, styles.button]} // Common button style
          onPress={() => navigation.navigate('LoginScreen')}
          mode="contained"
        >
          Login
        </Button>
        <Button
          style={[styles.signupButton, styles.button]} // Common button style
          onPress={() => navigation.navigate('RegisterScreen')}
          mode="outlined"
        >
          Sign Up
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F0F0F0', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333', 
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#555', 
  },
  loginButton: {
    backgroundColor: '#C70039', 
    marginTop: 20,
    color: 'white',
  },
  signupButton: {
    borderColor: '#C70039', 
    borderWidth: 2,
    marginTop: 10,
    color: '#F0A500', 
  },
  button: {
    width: 200, 
    height: 50, 
    justifyContent: 'center',
  },
});
