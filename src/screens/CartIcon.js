import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Button, Alert, ActivityIndicator, Modal } from 'react-native'; // Import Modal
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

export default function CartIcon() {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, resetCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderOnTheWay, setIsOrderOnTheWay] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
 
  const [parsedUser, setParsedUser] = useState([])

  const addToCart = (item) => {
    useCart().addToCart(item.name, item.price);
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        // Data was found in local storage, parse it as JSON
        const parsedUserData = JSON.parse(userData)
        setParsedUser(parsedUserData)
        return parsedUserData;
      } else {
        // Data was not found in local storage
        return null;
      }
    } catch (error) {
      // Error retrieving data
      console.error("Error retrieving data from local storage:", error);
      return null;
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0);
  };

  const handleBuy = () => {
    if (cartItems.length > 0) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsOrderOnTheWay(true);
        clearCart();

        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }, 2000); 
    } else {
      Alert.alert('Empty Cart', 'Your cart is empty. Please add items to your cart before purchasing.');
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {cartItems.length > 0 ? (
        <ScrollView style={styles.cartItemsContainer}>
          <View style={styles.cartTitle}>
            <Text style={styles.cartTitleText}>CART</Text>
            <View style={styles.cartTitleLine}></View>
          </View>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>{item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.cartTotal}>Total: ${calculateTotalPrice().toFixed(2)}</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007BFF" />
          ) : isOrderOnTheWay ? (
            <Text style={styles.orderOnTheWayText}>Your order is on the way!</Text>
          ) : (
            <Button title="Buy" onPress={handleBuy} />
          )}
        </ScrollView>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => {
          setShowSuccessModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.successModalText}>Your order is on the way!</Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 35,
    marginLeft: 10,
  },
  purchaseCompleteText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  successModalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cartItemsContainer: {
    marginTop: 160,
  },
  cartTitle: {
    alignItems: 'center',
  },
  cartTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartTitleLine: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: 1110,
    marginTop: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  cartItemName: {
    fontSize: 20,
    flex: 1,
  },
  cartItemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20,
  },
  removeButton: {
    backgroundColor: '#FF5733',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  emptyCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 180,
    textAlign: 'center',
  },
});
