import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native-svg';
import { MapViewPage } from '../MapViewPage/MapViewPage';
import { UserProfile } from '../UserProfile';
import { Login } from '../Login'


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Map" component={MapViewPage} />
        <Drawer.Screen name="Profile" component={UserProfile} />
        <Drawer.Screen name="Logout" component={Login} options={{ headerShown: false }}/>
      </Drawer.Navigator>
    );
  };


  export default DrawerNavigator;
