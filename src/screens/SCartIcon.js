import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext'; 
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SCartIcon() {
  const navigation = useNavigation();
  const { cartItems, removeFromCart } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0);
  };

  const handleBuy = () => {
    console.log('Buy button clicked');
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('SDashboard')} 
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
          <Text style={styles.cartTotal}>-----------------------Total: ${calculateTotalPrice().toFixed(2)}</Text>
          <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 50,
    marginLeft: 20,
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
  buyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
