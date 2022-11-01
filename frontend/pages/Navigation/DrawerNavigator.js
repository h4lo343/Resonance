import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapViewPage } from '../MapViewPage/MapViewPage';
import { Moment } from '../Moment/Moment';
import { UserProfile } from '../UserProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Map" component={MapViewPage} />
        <Drawer.Screen name="Profile" component={UserProfile} />
        <Drawer.Screen name="Moment" component={Moment} />
      </Drawer.Navigator>
    );
  };


  export default DrawerNavigator;
