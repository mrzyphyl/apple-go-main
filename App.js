import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens';
import McDonaldsMenu from './src/Fastfoods/McDonaldsMenu';
import KFC from './src/Fastfoods/KFC';
import Subway from './src/Fastfoods/Subway';
import ProfileIcon from './src/screens/ProfileIcon';
import CartIcon from './src/screens/CartIcon';
import SDashboard from './src/screens/SDashboard';
import SProfileIcon from './src/screens/SProfileIcon';
import SCartIcon from './src/screens/SCartIcon';
import { CartProvider } from './CartContext';
import SMcDonaldsMenu from './src/SFastfoods/SMcDonaldsMenu';
import SKFC from './src/SFastfoods/SKFC';
import SSubway from './src/SFastfoods/SSubway';

import Seller from './src/SFastfoods/Seller';
import FastFoodBox from './src/screens/FastFoodBox';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="McDonaldsMenu" component={McDonaldsMenu} />
            <Stack.Screen name="KFC" component={KFC} />
            <Stack.Screen name="Subway" component={Subway} />
            <Stack.Screen name="ProfileIcon" component={ProfileIcon} />
            <Stack.Screen name="CartIcon" component={CartIcon} />

            <Stack.Screen name="SDashboard" component={SDashboard} />
            <Stack.Screen name="SCartIcon" component={SCartIcon} />
            <Stack.Screen name="SProfileIcon" component={SProfileIcon} />

            <Stack.Screen name="SMcDonaldsMenu" component={SMcDonaldsMenu} />
            <Stack.Screen name="SKFC" component={SKFC} />
            <Stack.Screen name="SSubway" component={SSubway} />
            
            <Stack.Screen name="Seller" component={Seller} />
            
            <Stack.Screen name="FastFoodBox" component={FastFoodBox} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CartProvider>
  );
}