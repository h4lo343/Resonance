 
import { StyleSheet, Text, View, Image, CheckBox } from 'react-native';
import React from 'react'
import { Outlet, Link } from 'react-router-native'

export const Main = () => {
  return (
    <View>
      <Text>this is main page:</Text>
      <Outlet/>
      <Link to="/main/map"><Text>to map</Text></Link>
    </View>
  )
}