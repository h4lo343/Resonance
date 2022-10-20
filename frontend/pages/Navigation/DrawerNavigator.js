import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native-svg';
import {Home} from '../TestPage/Home';
import {Profile} from '../TestPage/Profile';
import { MapViewPage } from '../MapViewPage/MapViewPage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>

        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Map" component={MapViewPage} />
      </Drawer.Navigator>
    );
  };
  
  
  export default DrawerNavigator;