import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
  const toggleCartIcon = () => {
    navigation.navigate('CartIcon');
  };

  const handleLogout = async () => {
    try {
      // // Remove the 'isLoggedIn' key from AsyncStorage
      // await AsyncStorage.removeItem('isLoggedIn');
      // Navigate to the 'LoginScreen'
      await AsyncStorage.clear()
      navigation.navigate('LoginScreen');
    } catch (error) {
      // Handle any errors that may occur during AsyncStorage removal
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartButton} onPress={toggleCartIcon}>
        <Text style={styles.cartIcon}>🛒</Text>
      </TouchableOpacity>

      <Icon
        name="arrow-left" 
        size={24}
        color="blue"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />

      <Text style={styles.title}>User Profile</Text>
      <View style={styles.profileBox}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📷</Text>
        </View>
        <Text style={styles.name}>ChuchuNesssxdxd</Text>
        <Text style={styles.contactNumber}>Contact: +1234567890</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginTop:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'lightgray',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  contactNumber: {
    fontSize: 16,
    marginTop: 5,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  cartButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'transparent',
  },
  cartIcon: {
    fontSize: 24,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red', // Change the background color to your preference
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
