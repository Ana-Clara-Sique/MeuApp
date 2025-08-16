import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import RegisterProductScreen from './screens/RegisterProductScreen';

import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="RegisterProduct" component={RegisterProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </AuthProvider>
  );
}
