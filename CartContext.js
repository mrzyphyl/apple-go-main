import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CartContext = createContext();
import axios from 'axios'; // Import Axios

export function CartProvider({ children }) { 
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function getUsernameFromStorage() {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUsername(parsedUserData.username); // Set the username from local storage
        }
      } catch (error) {
        console.error('Error retrieving data from local storage:', error);
      }
    }

    getUsernameFromStorage();
  }, []);

  const addToCart = (item) => {
    axios.post('http://localhost:8000/cart/addcart', {
      username: 'wal@gmail.com',
      cartItemPrice: item.price,
      cartItemName: item.name
    })
    .then(result => {
      console.log(result)
      setCartItems([...cartItems, item])
    })
    .catch(err => console.log(err))
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        // Data was found in local storage, parse it as JSON
        const parsedUserData = JSON.parse(userData);
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
  
  
  useEffect(() => {
    axios.get("http://localhost:8000/cart/getCartData")
    .then(result => {
      console.log(result.data)
      console.log(result)
    })
    .catch(err => console.log(err))
  }, [])
  

  const removeFromCart = (item) => {
    const indexOfItemToRemove = cartItems.findIndex((cartItem) => cartItem.name === item.name);
    if (indexOfItemToRemove !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(indexOfItemToRemove, 1);
      setCartItems(updatedCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
