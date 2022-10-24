import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native-svg';
import { MapViewPage } from '../MapViewPage/MapViewPage';
import { UserProfile } from '../UserProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Map" component={MapViewPage} />
        <Drawer.Screen name="Profile" component={UserProfile} />
      </Drawer.Navigator>
    );
  };
  
  
  export default DrawerNavigator;