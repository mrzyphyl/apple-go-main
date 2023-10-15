import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SDashboard({ navigation }) {
  const [scaleValue] = useState(new Animated.Value(1));
  const [editableText, setEditableText] = useState("click this text to edit");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadEditableText = async () => {
      try {
        const text = await AsyncStorage.getItem('editableText');
        if (text) {
          setEditableText(text);
        }
      } catch (error) {
        console.error('Error reading editableText from AsyncStorage:', error);
      }
    };
    loadEditableText();
  }, []);

  const toggleSProfileIcon = () => {
    navigation.navigate('SProfileIcon');
  };

  const toggleSCartIcon = () => {
    navigation.navigate('SCartIcon');
  };

  const handlePlusButtonPress = () => {
    if (isEditing) {
      AsyncStorage.setItem('editableText', editableText);
    }
    setIsEditing(!isEditing);
  };

  const handlePress = (menu) => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      if (menu === 'SMcDonalds') {
        navigation.navigate(menu + 'Menu');
      } else if (menu === 'SSubway') {
        navigation.navigate(menu);
      } else if (menu === 'SKFC') {
        navigation.navigate(menu);
      } else if (menu === 'Seller' && isEditing) {
        setEditableText(editableText);
      }
    });
  };

  const cartItems = [];

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Background>
        <Logo />
        <View style={styles.headerContainer}>
          <Header style={styles.welcomeText}>Welcome to APPLEGO Express</Header>
         
        </View> 

        <TouchableOpacity style={styles.profileButton} onPress={toggleSProfileIcon}>
          <View style={styles.iconCircle}>
            <Icon name="user" size={30} color="#FFF" />
          </View>
        </TouchableOpacity>
        
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <TouchableOpacity style={styles.plusButton} onPress={handlePlusButtonPress}>
            <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit"}</Text>
          </TouchableOpacity>
              {isEditing ? (
                <TextInput
                  style={styles.editableText}
                  onChangeText={text => setEditableText(text)}
                  value={editableText}
                />
              ) : (
                <Text style={styles.brandButtonText1}>{editableText}</Text>
              )}
            </View>
            <Icon name="arrow-right" size={30} color="#007BFF"  onPress={() => navigation.navigate('Seller')}/>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress('SMcDonalds')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>McDonald's</Text>
              <Text style={styles.salesQuote}>
                "I'm lovin' it!" - McDonald's
              </Text>
              
              <Text style={styles.additionalInfo}>
                Serving Happiness Since 1955
              </Text>
              <Text style={styles.additionalInfo}>
                Find us at 1234 Fast Food Lane
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#007BFF" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handlePress('SSubway')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>Subway</Text>
              <Text style={styles.salesQuote}>
                "Eat Fresh!" - Subway
              </Text>
              <Text style={styles.additionalInfo}>
                Fresh Subs and Sandwiches
              </Text>
              <Text style={styles.additionalInfo}>
                Visit us at 8765 Sub Avenue
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#007BFF" />
          </Animated.View>
        </TouchableWithoutFeedback>
        

        <TouchableWithoutFeedback onPress={() => handlePress('SKFC')}>
          <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
            <View>
              <Text style={styles.brandButtonText}>KFC</Text>
              <Text style={styles.salesQuote}>
                "Finger Lickin' Good!" - KFC
              </Text>
              <Text style={styles.additionalInfo}>
                Original Recipe Chicken since 1939
              </Text>
              <Text style={styles.additionalInfo}>
                Visit us at 4321 Fried Chicken Street
              </Text>
            </View>
            <Icon name="arrow-right" size={30} color="#007BFF" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableOpacity style={styles.cartButton} onPress={toggleSCartIcon}>
          <View style={styles.iconCircle}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartItems.length > 0 && (
              <Text style={styles.cartItemCount}>{cartItems.length}</Text>
            )}
          </View>
        </TouchableOpacity>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  editableText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 40,
  }, 
   plusButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    padding: 10,
    width: 50,
    borderRadius: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 19,
    color: '#007BFF',
  },
  brandButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10, // Adjust the border radius as needed
    marginBottom: 20,
    height: 180,
    width: 300,
    borderWidth: 1, // Adjust the border width as needed
    borderColor: '#ccc', // Adjust the border color as needed
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  brandButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  brandButtonText1: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 40,
  },
  salesQuote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  additionalInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  cartButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'transparent',
  },
  cartIcon: {
    fontSize: 24,
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
  profileButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C7E8CA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

