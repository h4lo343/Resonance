import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DrawerNavigator from './DrawerNavigator';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { PasswordReset } from '../PasswordReset/PasswordReset';
import { EditProfile } from '../EditProfile/EditProfile';
import { AnotherUserProfile } from '../AnotherUserProfile/AnotherUserProfile';
import { NearbyMusicDisplay } from '../../components/NearbyMusicDisplay';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }}/>  */}
      <Stack.Screen name="NearbyMusicDisplay" component={NearbyMusicDisplay} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      {/* <Stack.Screen name="MapViewPage" component={MapViewPage} /> */}
      <Stack.Screen name="AnotherUserProfile" component={AnotherUserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      {/* <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
};


export default StackNavigator;