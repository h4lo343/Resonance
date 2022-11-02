import React, { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Marker } from 'react-native-maps';
import { Button } from 'native-base'
import Search from '../Search/Search';
import { getHistoryTrace } from '../../service/MapperService';
import { MarkerCallOut } from '../../components/MarkerCallOut';
import { NearbyMusicDisplay } from '../../components/NearbyMusicDisplay';
import { useSelector, useDispatch } from "react-redux";
import { getNearbyMusic } from '../../redux/nearbyMusic/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import RNShake from 'react-native-shake';
import { nightMapStyle } from '../../assets/mapStyle';
import { Appearance } from 'react-native';
import { updateFollowedUsers } from '../../redux/follower/slice';


export const MapViewPage = ({ navigation }) => {
  let resetNumber = false // for generating map marker id
  let mid = 0; // for generating map marker id
  const AccessToken = useSelector((state) => state.auth.jwtToken)
  const [renderNearbyMusicSpinnerFlag, setNearbyMusicSpinnerFlag] = useState(false);
  const dispatch = useDispatch();
  const [showNearbyMusicModal, setShowNearbyMusicModal] = useState(false)
  const [nearbyMusicProps, setNearbyMusicProps] = useState({})
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
  const [mapTheme, setMapTheme] = useState([])
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const [nearbyLocation, setNearbyLocation] = useState({
    latitude: 37.3882733,
    longitude: -122.0867283 // default values
  });

  const [showUserLocationDot, setUserLocationDot] = useState(true);
  const [showSearchBar, setshowSearchBar] = React.useState(false);
  const [spinnerMusicText, setSpinnerMusicText] = useState("Retrieving musics...")
  const [currentCategory, setCurrentCategory] = React.useState('Initial');

  const fetchFollowedUser = async () => {
    const url = `https://comp90018-mobile-computing.herokuapp.com/user/getFollowed`;

    try {
        const response = await fetch(url,
            {
                headers: { Authorization: "Bearer " + jwtToken },
                method: 'GET'
            }
        )
        const result = await response.json();

        console.log("result: " + Object.values(result));

        var data = result.followedUser;
        dispatch(updateFollowedUsers({ data }));

    } catch (e) {
        console.log(e);
    }

}

  useEffect(() => {
    // this is to ensure that this page would refresh to get new user data from backend
    const focusHandler = navigation.addListener('focus', async () => {
      console.log("check permission")
      await _checkPermission();
      setInitialRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      loadHistoryMarkers();
      fetchFollowedUser().then().catch((e) => { console.log("error: " + e) });
    });

    // If the device is configured to dark mode, change the map style
    Appearance.addChangeListener((event) => {
      if (Appearance.getColorScheme() === 'dark') {
        setMapTheme(nightMapStyle);
      } else {
        setMapTheme([]);
      }
    });

    // this return is to unsubscribe handler from the event
    return focusHandler;
  }, [navigation]);


  useEffect(()=>{
    // add lisnter event to display nearBy music when the user shake their devices
    const subscription = RNShake.addListener(()=>{
      console.log("shake shake");
      fetchFollowedUser().then().catch((e) => { console.log("error: " + e) });
      requireNearbyMusic(currentLocation.latitude,currentLocation.longitude)
    })
    return () => {
      subscription.remove()
    }
  })

   /**
   * update mapView when the user left a trace on the map
  */
  const leftTrace = () => {
    resetNumber = true
    loadHistoryMarkers()
    setUserLocationDot(true)
    setCurrentCategory('Initial')
  }

  /**
   * This function helps to disply multiple markers inside the mapView
   * as repetative elements require unique IDs.
  */
  const generateMarkerId = () => {
    if (resetNumber) {
      mid = 0
      resetNumber = false
    }
    mid += 1
    return mid
  }

  const requireNearbyMusic = (latitude, longitude) => {
    setSpinnerMusicText("Retrieving nearby musics...");
    setNearbyMusicSpinnerFlag(true);
    console.log("require nearby music called");
    console.log("requireNearbyMusic: latitude: " + latitude + " | longitude: " + longitude);
    setNearbyLocation({
      latitude: latitude,
      longitude: longitude
    })

    fetchNearbyMusic().then(() => {
      setNearbyMusicSpinnerFlag(false);
      // For shake shake, isNearbyMusic is set to true (which is to distinguish from music trace)
      setNearbyMusicProps({
        isNearbyMusic: true,
        profileNavigationCallBack: () => {
          navigation.navigate("AnotherUserProfile")
        },
        setVisibilityCallBack: (value) => setVisibility(value)
      });
      setShowNearbyMusicModal(true);
    }).catch((e) => {
      console.log("error: " + e);
      setNearbyMusicSpinnerFlag(false);
    })
  }

  const fetchNearbyMusic = async () => {
    const url = `https://comp90018-mobile-computing.herokuapp.com/trace/getNearbyTraces`;
    var requestBody = {
      "location": {
        "latitude": nearbyLocation.latitude,
        "longitude": nearbyLocation.longitude
      }
    }

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
        dispatch(getNearbyMusic({ data }));
      }
    } catch (e) {
      console.log(e)
    }

  }
  /**
   * get maker trace with trace id
   * display trace modal
   * **/
  const requireTrace = (trace_id) => {
    setSpinnerMusicText("Retrieving music trace...");
    setNearbyMusicSpinnerFlag(true);
    fetchMarkerTrace(trace_id).then(() => {
      setNearbyMusicSpinnerFlag(false);
      // For getting marker trace, isNearbyMusic is set to false (which is to distinguish from `shake shake`)
      setNearbyMusicProps({
        isNearbyMusic: false,
        profileNavigationCallBack: () => {
          navigation.navigate("AnotherUserProfile")
        },
        setVisibilityCallBack: (value) => setVisibility(value)
      });
      setShowNearbyMusicModal(true);
    }).catch((e) => {
      console.log("error: " + e);
      setNearbyMusicSpinnerFlag(false);
    })
  }

  /**
   * get marker trace with fetch
   * **/
  const fetchMarkerTrace = async (trace_id) => {
    console.log("enter fetch")
    const url = `https://comp90018-mobile-computing.herokuapp.com/trace/getTrace`;
    console.log("traceId", trace_id)
    let requestBody = {
      "traceId": trace_id
    }
    try {
      const response = await fetch(url,
        {
          headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      )
      const result = await response.json();
      console.log("result =", result)

      if ("trace" in result) {
        var data = [result.trace];
        dispatch(getNearbyMusic({ data }));
      }
    } catch (e) {
      console.log(e)
    }
  }

   /**
   * obtain user's current location
  */
  const getCurrentLocation = async () => {

    Geolocation.getCurrentPosition(
      (position) => {
        console.log("get current location")
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        console.log("current Location lat: " + position.coords.latitude + " long:" + position.coords.longitude);
      },
      (error) => {
        console.log("falls in error ");
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const [historyMarkers, setHistoryMarkers] = React.useState([])
  const loadHistoryMarkers = () => [
    getHistoryTrace(AccessToken).then(response => {
      setHistoryMarkers(response.traces);
      console.log("get history trace ")
      console.log("response: " + response)
    }).catch(err => console.log(err))
  ]
  const leaveTrace = async () => {
    await getCurrentLocation();
    console.log(currentLocation)
    setCurrentCategory('highLightUserLocation')
    setUserLocationDot(false)
    setshowSearchBar(true)
  }

  const getMarkers = () => {
    switch (currentCategory) {
      case 'Initial': return [...attachHistoryMarker]; // mapView1: displays all history traces
      case 'highLightUserLocation': return [leaveTraceMarker]; //mapView2: when user leave a trace, hide all the histrory traces
    }
    return leaveTraceMarker
  }

  const setVisibility = (value) => {
    setShowNearbyMusicModal(false);
  }

  const cancelTrace = () => {
    setshowSearchBar(false);
    setUserLocationDot(true);
    setCurrentCategory('Initial');
  }

  const Logout = () => {
    Alert.alert(
        "Confirm",
        `Are you sure to Logout?`,
        [
          {
            text: "yes",
            onPress: () => { navigation.navigate("Login")}
          },
          {
            text: "no"
          }
        ]
    )
  }

   /**
   * generate a leave trace marker (indicate users' current location)
  */
  const leaveTraceMarker = <Marker
    coordinate={{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude
    }}
    key={generateMarkerId()}
  >
    <Image source={require('../../assets/imgs/mapMarkerCurrent.png')} style={{ height: 50, width: 50 }} />
  </Marker>

 /**
   * generate history traces
  */
  const attachHistoryMarker = historyMarkers.map((history, i) => (
    <Marker
      coordinate={{
        latitude: history.location.latitude,
        longitude: history.location.longitude
      }}
      id={history.id}
      key={generateMarkerId()}
      onPress={() => requireTrace(history.id)}
    >
      <Image source={require('../../assets/imgs/mapMarkerPast.png')} style={{ height: 50, width: 50 }} />
      <MarkerCallOut
        songName={history.song.name}
        songUrl={history.song.songUrl}
        songAuthor={history.song.artist}
        songVisual={history.song.songImageUrl}></MarkerCallOut>
    </Marker>
  ))


  /**
   * grant location access from the user
   * **/
  const _checkPermission = async () => {


    try {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if (result == true) {

        await getCurrentLocation();
        console.log(currentLocation)
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
          await getCurrentLocation();
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
        customMapStyle={mapTheme}
      >
        {getMarkers()}
      </MapView>
      <TouchableOpacity style={styles.overlay}>
        {
          !showSearchBar && <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
              },
              { position: "absolute", top: '100%', paddingHorizontal:5, height: 30,  borderRadius: 2, alignItems: "center", justifyContent: "center" },
            ]}
            onPress={leaveTrace} >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Leave Trace</Text></Pressable>
        }
        {
          showSearchBar && <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
              },
              { position: "absolute", marginTop: 20, top: '100%', paddingHorizontal:5, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 2 },
            ]}
            onPress={cancelTrace} >
            <Text style={{ fontWeight: 'bold', fontSize: 16}}>Cancel</Text></Pressable>
        }
        {
          showSearchBar && <Search longitude={currentLocation.latitude} latitude={currentLocation.longitude} finished={leftTrace} />
        }
      </TouchableOpacity>
      <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
              },
              { position:"absolute", bottom: 130, left:30, borderRadius: 2, paddingHorizontal: 6, paddingVertical: 6, justifyContent: "center" },
            ]}
            onPress={Logout} >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Logout</Text></Pressable>
      <Spinner
        visible={renderNearbyMusicSpinnerFlag}
        textContent={spinnerMusicText}
        textStyle={styles.spinnerTextStyle}
      />
      {
        showNearbyMusicModal && <NearbyMusicDisplay nearbyMusicProps={nearbyMusicProps} />
      }
    </View>

  )
}

  /**
   * CSS Style
   * **/
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,

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
  spinnerTextStyle: {
    color: '#fff',
    paddingTop: 10,
    fontSize: 16
  },
});
