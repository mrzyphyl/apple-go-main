import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FastFoodBox({
  scaleValue,
  isEditing,
  handlePlusButtonPress,
  editableText,
  setEditableText,
  navigation,
}) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Seller')}>
      <Animated.View style={[styles.brandButton, { transform: [{ scale: scaleValue }] }]}>
        <View>
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
        <Icon name="arrow-right" size={30} color="#007BFF" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  brandButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 1.1,
    marginBottom: 20,
    height: 180,
    width: 300,
    borderWidth: 0.1,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  brandButtonText1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  editableText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    borderColor: 'transparent',
  },
});
