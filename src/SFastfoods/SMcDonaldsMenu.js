import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext'; 

export default function SMcDonalds() {
  const navigation = useNavigation();
  const { cartItems, addToCart, removeFromCart } = useCart(); 

  const menuItems = [
    { name: 'Big Mac', price: '$5.99' },
    { name: 'Chicken McNuggets', price: '$4.99' },
    { name: 'Quarter Pounder', price: '$6.99' },
    { name: 'French Fries', price: '$2.99' },
  ];
  const [pressedMenuItem, setPressedMenuItem] = useState(null);

  const toggleSCartIcon = () => {
    navigation.navigate('SCartIcon');
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton} onPress={toggleSCartIcon}>
      <Text style={styles.cartIcon}>
          🛒
          {cartItems.length > 0 && (
            <Text style={styles.cartItemCount}>{cartItems.length}</Text>
          )}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>McDonalds Menu</Text>
      <ScrollView style={styles.foodItemsContainer}>
        {menuItems.map((item, itemIndex) => (
          <TouchableHighlight
            key={itemIndex}
            style={[
              styles.foodItem,
              { backgroundColor: pressedMenuItem === item.name ? '#FFD700' : '#fff' },
            ]}
            underlayColor="#FFD700"
            onPress={() => {
              navigation.navigate('FoodItemDetails', { item });
            }}
            onShowUnderlay={() => setPressedMenuItem(item.name)}
            onHideUnderlay={() => setPressedMenuItem(null)}
          >
            <>
              <Text style={styles.foodItemName}>{item.name}</Text>
              <Text style={styles.foodItemPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </>
          </TouchableHighlight>
        ))}
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 19,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  foodItemsContainer: {
    flex: 1,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  foodItemName: {
    fontSize: 18,
  },
  foodItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 4, 
    paddingVertical: 2,
    fontSize: 10,
  },
  cartIcon: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'transparent',
    fontSize: 24,
    marginTop: 10,
  },
  cartButton: {
    position: 'absolute',
    right: 20,
    top: 5,
    backgroundColor: 'transparent',
  },
  cartContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeFromCartButton: {
    backgroundColor: '#FF5733',
    padding: 5,
    borderRadius: 5,
  },
  removeFromCartButtonText: {
    color: 'white',
    fontSize: 14,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#007AFF', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 5, 
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center', 
  },
});
