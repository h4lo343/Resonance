import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MapViewPage } from '../MapViewPage/MapViewPage';
import { Moment } from '../Moment/Moment';
import { UserProfile } from '../UserProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator contentOptions={{labelStyle:{ fontWeight: 'normal', fontSize: 15 }}}>
        <Drawer.Screen name="Map" component={MapViewPage} options={{title: 'shake to discover nearby music'}}/>
        <Drawer.Screen name="Profile" component={UserProfile} />
        <Drawer.Screen name="Moment" component={Moment} />
      </Drawer.Navigator>
    );
  };


  export default DrawerNavigator;
