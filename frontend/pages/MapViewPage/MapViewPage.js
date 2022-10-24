import React, { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps';
import Search from '../Search/Search';
import { Box, FormControl, Input, WarningOutlineIcon, Stack, MaterialIcons, Pressable, Icon, Button, Checkbox } from 'native-base';
import { getHistoryTrace } from '../../service/MapperService';
import { MarkerCallOut } from '../../components/MarkerCallOut';
import { NearbyMusicDisplay } from '../../components/NearbyMusicDisplay';
import { useSelector, useDispatch } from "react-redux";
import { getNearbyMusic } from '../../redux/nearbyMusic/slice';

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width


export const MapViewPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.3882733,
    longitude: -122.0867283 // default values
  });
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,//initial region
  });

  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const [nearbyLocation, setNearbyLocation] = useState({
    latitude: 37.3882733,
    longitude: -122.0867283 // default values
  });

  const [showUserLocationDot, setUserLocationDot] = useState(true);
  const [showSearchBar, setshowSearchBar] = React.useState(false);
  useEffect(() => {
    console.log("check permission")
    _checkPermission()
    setInitialRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    loadHistoryMarkers()
  }, [])
  const [currentCategory, setCurrentCategory] = React.useState('Initial');

  const requireNearbyMusic = (latitude, longitude) => {
    setNearbyLocation({
      latitude: latitude,
      longitude: longitude
    })
    setShowModal(true);
    // fetchNearbyMusic().then(() => {
    //   setShowModal(true);
    // })
    }

  const fetchNearbyMusic = async () => {
    const url = `https://comp90018-mobile-computing.herokuapp.com/trace/getNearbyTraces`;
    // console.log(nearbyLocation)
    var requestBody = {
      "location": {
        "latitude": 6.5693754,
        "longitude":103.2656823
      }
    }

    console.log(JSON.stringify(requestBody))
    try {
      const response = await fetch(url,
        {
          headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      )
      const result = await response.json();

      if ("traces" in result) {
        console.log("result traces: " + result.traces);
        var data = result.traces;
        dispatch(getNearbyMusic({data}));
      }
      // const resultArray = result.tracks.items.map((item, index) => {
      //   return { tracks: item, artists: result.artists.items[index] }
      // })
      // setResult(resultArray)
    } catch (e) {
      console.log(e)
    }

  }

  const getCurrentLocation = () => {

    Geolocation.getCurrentPosition(
      (position) => {
        console.log("get current location")
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const [historyMarkers, setHistoryMarkers] = React.useState([])
  const loadHistoryMarkers = () => [
    getHistoryTrace().then(response => {
      setHistoryMarkers(response);
      console.log("length: " + response.length)
    }).catch(err => console.log(err))
  ]
  const leaveTrace = async () => {
    getCurrentLocation()
    setCurrentCategory('highLightUserLocation')
    setUserLocationDot(false)
    setshowSearchBar(true)
  }

  const getMarkers = () => {
    switch (currentCategory) {
      case 'Initial': return [...attachHistoryMarker];
      case 'highLightUserLocation': return [leaveTraceMarker];
      // case 'commerce': return afficheCommerce;
      // default: return [...afficheHotel, ...afficheRestaurant, ...afficheCommerce];
    }
    return leaveTraceMarker
  }

  const setVisibility = (value) => {
    setShowModal(false);
  }

  const leaveTraceMarker = <Marker
    coordinate={{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude
    }}
    key={1}
  >
    <Image source={require('../../assets/imgs/mapMarkerCurrent.png')} style={{ height: 50, width: 50 }} />
  </Marker>
  const attachHistoryMarker = historyMarkers.map((history) => (
    <Marker
      coordinate={{
        latitude: history.coordinate.latitude,
        longitude: history.coordinate.longitude
      }}
      id={history.id}
      key={history.id}
      onPress={()=> requireNearbyMusic(history.coordinate.latitude, history.coordinate.longitude)}
    >
    <Image source={require('../../assets/imgs/mapMarkerPast.png')} style={{height: 50, width:50 }} />
    <MarkerCallOut songName={history.info.songName} songVisual={history.info.visualUrl}></MarkerCallOut>

  </Marker>
))


  const _checkPermission = async () => {
    

    try {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (result == true) {
        getCurrentLocation()
      }
      else if (result == false) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          rationale = {
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
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={showUserLocationDot}
        followsUserLocation
        initialRegion={initialRegion}
      >
        {getMarkers()}
      </MapView>
      <TouchableOpacity style={styles.overlay}>
        <Button
          style={{ position: "absolute", top: 600, width: "100%", backgroundColor: '#e4b1a5' }}
          onPress={leaveTrace} >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Leave Trace</Text></Button>
        {
          showSearchBar && <Search />
        }

      </TouchableOpacity>
      {
        showModal &&   <NearbyMusicDisplay setVisibility={(value) => setVisibility(value)}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
    width: deviceWidth,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    top: 30,
    width: "50%",
    alignItems: 'center'
  },
  searchContainer: {
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    width: "80%",
    alignItems: 'center'
  },

});