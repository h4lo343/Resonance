import React, { useState, useEffect  } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid, FormControl, ScrollView, Pressable } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Box, Input, Button } from 'native-base';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageOverlay from "react-native-image-overlay";
import DrawerNavigator from '../Navigation/DrawerNavigator';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';


export const EditProfile = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const currentUsername = useSelector((state) => state.userProfile.username);
  const avatarUri = useSelector((state) => state.userProfile.avatarUri);
  const avatarBase64 = useSelector((state) => state.userProfile.avatarBase64);
  const avatarType = useSelector((state) => state.userProfile.avatarType);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const currentFullName = useSelector((state) => state.userProfile.fullName);
  const [newAvatar, setNewAvatar] = useState({ type: '', uri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri });
  const [newUsername, setNewUsername] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [profileSpinnerFlag, setProfileSpinnerFlag] = useState(false);
  const [photoSpinnerFlag, setPhotoSpinnerFlag] = useState(false);

  useEffect(() => {
    // this is to ensure that this page would refresh to get new user data from backend
    const focusHandler = navigation.addListener('focus', () => {
          auth().signInAnonymously().then(() => { console.log("firebase signed in") });
    });
    return focusHandler;
}, [navigation]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "Would you like to give This App Camera Access?",
          buttonNegative: "No",
          buttonPositive: "Yes",
          buttonNeutral: "Later",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("User granted camera permission.");
      } else {
        console.log("Failed to get camera permission");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const postToBackend = async () => {
    try {
      var requestBody =
      {
        "updates":
        {
          "username": currentUsername, "fullName": currentFullName,
          "avatar":
            { "avatarType": avatarType, "base64image": avatarBase64 }
        },

      };

      if (newUsername != '' && newUsername != currentUsername) {
        requestBody["updates"]["username"] = newUsername;
      }

      if (newFullname != '' && newFullname != currentFullName) {
        requestBody["updates"]["fullName"] = newFullname;
      }

      if (newAvatar.type != '') {
          requestBody["updates"]["avatar"]["base64image"] = newAvatar.uri;
          requestBody["updates"]["avatar"]["avatarType"] = newAvatar.type;
      }

      const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/updateUserInfo",
        {
          headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
          method: 'POST',
          body: JSON.stringify(requestBody)
        }
      )

    } catch (error) {
      console.error(error)
    }
  }

  const clickedPhotoUpload = () => {
    uploadPhoto().then(() => {});
  }

  const uploadPhoto = async () => {
    requestCameraPermission();

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

     launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Reports Error: ', response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        setPhotoSpinnerFlag(true);

        const imageUri = response.assets[0].uri;

        const imageType = imageUri.split(".").pop();

        const reference = storage().ref(imageUri);
        await reference.putFile(imageUri);
        let savedUrl = await reference.getDownloadURL();
        console.log("saved url: " + savedUrl);
        setNewAvatar({ type: imageType, uri: savedUrl });
        setPhotoSpinnerFlag(false);
      }
    });
  }

  const save = () => {
    setProfileSpinnerFlag(true);
    postToBackend().then(() => {
      setProfileSpinnerFlag(false);
      navigation.navigate("DrawerNavigator");
    }).catch((error) => {
      console.log("error: " + error);
    })
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Drawer.Navigator>
        <Drawer.Screen name="Profile" component={DrawerNavigator} />
      </Drawer.Navigator>
      <View style={styles.profileSpinnerStyle}>
        <Spinner
          visible={profileSpinnerFlag}
          textContent={'Saving user profile updates...'}
          textStyle={{ color: '#fff', fontSize: 16 }}
        />
      </View>
      <View style={styles.profileSpinnerStyle}>
        <Spinner
          visible={photoSpinnerFlag}
          textContent={'Uploading photo...'}
          textStyle={{ color: '#fff', fontSize: 16  }}
        />
      </View>

      <ImageOverlay
        source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_headset.jpg')).uri }}
        height={130}
        overlayAlpha={0.05}
        contentPosition="center">
        <View style={{alignItems: "center"}}>
          <Avatar.Image source={{ uri: newAvatar.uri == ""? avatarUri : newAvatar.uri }} size={100} />
        </View>
      </ImageOverlay>


      <Box alignItems="center" style={{ marginTop: 10 }}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
            },
            { height: 30, borderRadius: 2, alignContent: "center", alignItems: "center", paddingTop: 4, paddingHorizontal: 5 },
          ]}
          onPress={(e) => clickedPhotoUpload(e)}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Take Photo</Text></Pressable>
      </Box>

      <ScrollView>
        <View style={styles.userrow}>
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Current Username: {currentUsername}</Text>
        </View>

        <Box alignItems="center" style={{ marginTop: 5, justifyContent: "space-between", flexDirection: "row" }}>
          <Input variant="outline" placeholder="New Username" fontSize={13} onChangeText={setNewUsername} />
        </Box>

        <View style={styles.userrowsecond}>
          <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Current Full Name: {currentFullName}</Text>
        </View>

        <Box alignItems="center" style={{ marginTop: 5, justifyContent: "space-between", flexDirection: "row" }}>
          <Input variant="outline" placeholder="New Full Name" fontSize={13} onChangeText={setNewFullname} />
        </Box>

        <Box alignItems="center" style={styles.saveProfile}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
              },
              { top: '15%', height: 30, borderRadius: 2, alignContent: "center", alignItems: "center", paddingHorizontal: 5, paddingTop: 4 },
            ]}
            onPress={(e) => save(e)}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Save</Text></Pressable>
        </Box>

      </ScrollView>


      <ImageOverlay
        source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_headset.jpg')).uri }}
        height={310}
        overlayAlpha={0.05}
        contentPosition="bottom">
      </ImageOverlay>

    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 30,
    justifyContent: 'center'
  },
  userrow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center'
  },
  userrowsecond: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center'
  },
  userDataFont: {
    color: '#795C34',
  },
  saveProfile: {
    marginTop: 10,
    marginBottom: 20
  },
  profileSpinnerStyle: {
    backgroundColor: '#cad5d8',
  },
});