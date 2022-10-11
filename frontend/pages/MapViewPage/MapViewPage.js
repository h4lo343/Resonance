import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image ,Dimensions,TouchableOpacity} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps';
import  Search  from '../Search/Search';
import { Box, FormControl, Input, WarningOutlineIcon, Stack, MaterialIcons, Pressable, Icon, Button, Checkbox } from 'native-base';
const deviceHeight =Dimensions.get("window").height
const deviceWidth =Dimensions.get("window").width


export const MapViewPage = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.3882733,
    longitude: -122.0867283 // default values
  });
  const [showUserLocationDot, setUserLocationDot] = useState(true);
  useEffect(() => {
     _checkPermission()
  }, [])
  const [currentCategory, setCurrentCategory] = React.useState('None');

  const getCurrentLocation = () => {
   
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        console.log("current: " +  currentLocation.longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }

  const leaveTrace = async () => {
    getCurrentLocation()
    setCurrentCategory('highLightUserLocation')
    console.log("update: " +  currentLocation.longitude);
    setUserLocationDot(false)
  }

  const getMarkers = () => {
    switch (currentCategory) {
        case 'None': return [];
        case 'highLightUserLocation': return leaveTraceMarker;
        // case 'commerce': return afficheCommerce;
        // default: return [...afficheHotel, ...afficheRestaurant, ...afficheCommerce];
    }
    return leaveTraceMarker
  }

  const leaveTraceMarker =<Marker
  coordinate={{ 
    latitude :  currentLocation.latitude,
    longitude : currentLocation.longitude }} 
  >
  <Image source={require('../../assets/imgs/mapMarkerCurrent.png')} style={{height: 50, width:50 }} />
</Marker>

  const _checkPermission = async () => {

    try {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        console.log('result', typeof result)
        console.log('result', result)

        if (result == true) {
          getCurrentLocation()
        }
        else if (result == false) {
            const status = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              rationale ={
                title: "App location Permission",
                message: "App needs access to your location ",
                buttonPositive: "OK"
              }
              )
            if (status === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('permission granted')
              getCurrentLocation()
            } 
        }

    } catch (error) {
        console.log('error', error)
    }
  }

  return (
    <View  style={styles.container}>
       
    <Search/>
       
    <MapView
      provider={PROVIDER_GOOGLE} 
      style={styles.map}
      showsUserLocation = {showUserLocationDot}
      followsUserLocation>
      {getMarkers()}
    </MapView>
    <TouchableOpacity style={styles.overlay}>
      <Button 
      style={{position: "absolute", top: 600, width: "100%" ,backgroundColor: '#e4b1a5'}} 
      onPress={leaveTrace} >
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Leave Trace</Text></Button>
    </TouchableOpacity>
    </View>
)}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
    width: deviceWidth,

    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
    
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#e4b1a5',
    display: 'flex',
    width: "50%",
    alignItems: 'center'
  },
 });