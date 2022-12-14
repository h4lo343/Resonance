import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { PasswordReset } from '../PasswordReset/PasswordReset';
import { UserProfile } from '../UserProfile/UserProfile';
import { EditProfile } from '../EditProfile/EditProfile';
import { MapViewPage } from '../MapViewPage/MapViewPage';
import { Moment } from '../Moment/Moment';
import { AnotherUserProfile } from '../AnotherUserProfile/AnotherUserProfile';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="MapViewPage" component={MapViewPage} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AnotherUserProfile" component={AnotherUserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Moment" component={Moment} />
    </Stack.Navigator>
  );
};


export default StackNavigator;