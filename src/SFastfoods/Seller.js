import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Seller() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [fastFoodMenu, setFastFoodMenu] = useState('');
  const [fastFoodPrice, setFastFoodPrice] = useState('');
  const [postedFastFoods, setPostedFastFoods] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the item being edited

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = () => {
    // Check if fastFoodPrice is a valid number
    if (isNaN(fastFoodPrice)) {
      alert('Please enter a valid number for the price.');
      return;
    }

    // Create a new array with the existing fast food items and add the new one
    if (editIndex === -1) {
      // If not editing, add a new item
      const newItem = {
        menu: fastFoodMenu,
        price: fastFoodPrice,
      };
      const updatedFastFoods = [...postedFastFoods, newItem];
      setPostedFastFoods(updatedFastFoods);
    } else {
      // If editing, update the existing item
      const updatedFastFoods = [...postedFastFoods];
      updatedFastFoods[editIndex] = {
        menu: fastFoodMenu,
        price: fastFoodPrice,
      };
      setPostedFastFoods(updatedFastFoods);
      setEditIndex(-1); // Reset the edit index
    }

    // Clear the input fields
    setFastFoodMenu('');
    setFastFoodPrice('');

    // Close the modal
    toggleModal();
  };

  const handleDelete = (index) => {
    const updatedFastFoods = [...postedFastFoods];
    updatedFastFoods.splice(index, 1);
    setPostedFastFoods(updatedFastFoods);
  };

  const handleEdit = (index) => {
    // Set the input fields with the item to be edited
    setFastFoodMenu(postedFastFoods[index].menu);
    setFastFoodPrice(postedFastFoods[index].price);
    setEditIndex(index);
    toggleModal();
  };

  useEffect(() => {
    const loadPostedFastFoods = async () => {
      try {
        const jsonPostedFastFoods = await AsyncStorage.getItem('postedFastFoods');
        if (jsonPostedFastFoods) {
          setPostedFastFoods(JSON.parse(jsonPostedFastFoods));
        }
      } catch (error) {
        console.error('Error loading postedFastFoods from AsyncStorage:', error);
      }
    };

    loadPostedFastFoods();
  }, []);

  useEffect(() => {
    const savePostedFastFoods = async () => {
      try {
        await AsyncStorage.setItem('postedFastFoods', JSON.stringify(postedFastFoods));
      } catch (error) {
        console.error('Error saving postedFastFoods to AsyncStorage:', error);
      }
    };

    savePostedFastFoods();
  }, [postedFastFoods]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Seller</Text>

      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <Text style={styles.buttonText}>
          {editIndex === -1 ? 'Post a Food' : 'Edit Fast Food'}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.fastFoodList}>
        {postedFastFoods.map((item, index) => (
          <View key={index} style={styles.fastFoodItem}>
            <Text style={styles.foodItemMenu}>{item.menu}</Text>
            <Text style={styles.foodItemPrice}>Price: $ {item.price}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editIndex === -1 ? 'Post Fast Food' : 'Edit Fast Food'}
          </Text>
          <TextInput
            placeholder="Fast Food Menu"
            onChangeText={(text) => setFastFoodMenu(text)}
            value={fastFoodMenu}
            style={styles.input}
          />
          <TextInput
            placeholder="Fast Food Price"
            onChangeText={(text) => setFastFoodPrice(text)}
            value={fastFoodPrice}
            style={styles.input}
            keyboardType="numeric" // This sets the keyboard to numeric
          />
          <Button title={editIndex === -1 ? 'Post' : 'Save'} onPress={handleSearch} />
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
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
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  fastFoodList: {
    marginTop: 10,
  },
  fastFoodItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodItemMenu: {
    fontSize: 18,
  },
  foodItemPrice: {
    fontSize: 16,
    color: 'green',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: 'black',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

