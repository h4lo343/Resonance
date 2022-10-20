import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DrawerNavigator from './DrawerNavigator';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { PasswordReset } from '../PasswordReset/PasswordReset';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};


export default StackNavigator;