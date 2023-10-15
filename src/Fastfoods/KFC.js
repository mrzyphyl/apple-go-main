import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../CartContext';

import origImage from '../assets/orig.png';
import tenderImage from '../assets/tender.png';
import zigImage from '../assets/zig.png';
import kfcmashImage from '../assets/kfcmash.png';

export default function KFC() {
  const navigation = useNavigation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const menuItems = [
    { name: 'Original Recipe', price: '$8.99', image: origImage },
    { name: 'Chicken Tenders', price: '$7.49', image: tenderImage },
    { name: 'Zinger Burger', price: '$6.99', image: zigImage },
    { name: 'Mashed Potatoes', price: '$2.99', image: kfcmashImage },
  ];

  const toggleCartIcon = () => {
    navigation.navigate('CartIcon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>KFC Menu</Text>
        <TouchableOpacity style={styles.cartButton} onPress={toggleCartIcon}>
          {cartItems.length > 0 && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCount}>{cartItems.length}</Text>
            </View>
          )}
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.foodItemsContainer}>
        {menuItems.map((item, itemIndex) => (
          <View key={itemIndex} style={styles.foodItem}>
            <>
              <Image source={item.image} style={styles.foodItemImage} />
              <Text style={styles.foodItemName}>{item.name}</Text>
              <Text style={styles.foodItemPrice}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </>
          </View>
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
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C70039',
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  foodItemsContainer: {
    flex: 1,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  foodItemName: {
    fontSize: 20,
    width: 104,
  },
  foodItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemCountContainer: {
    position: 'absolute',
    top: 0,
    right: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cartItemCount: {
    color: 'black',
    fontSize: 10,
  },
  cartIcon: {
    backgroundColor: 'transparent',
    fontSize: 24,
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: 'transparent',
  },
  foodItemImage: {
    width: 80,
    height: 80,
  },
  addToCartButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 15,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: 'white',
  },
});
