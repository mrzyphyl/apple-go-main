import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SProfile({ navigation }) {
 

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };
  

  const [productFastfoodName, setProductFastfoodName] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    if (productName && productPrice && productFastfoodName) {
      const newProduct = {
        fastfoodName: productFastfoodName,
        name: productName,
        price: productPrice,
      };

      setProducts([...products, newProduct]);
      setProductFastfoodName('');
      setProductName('');
      setProductPrice('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      
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

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="blue" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    top:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    top: 10,
    left: 20,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    top:5,
    backgroundColor: 'transparent',
  },
  cartIcon: {
    fontSize: 24,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productForm: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  productItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
