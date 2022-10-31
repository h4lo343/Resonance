import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid, FormControl, ScrollView, Pressable } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Box, Input, Button } from 'native-base';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserProfile } from '../UserProfile';
import RNFetchBlob from "rn-fetch-blob";
import Spinner from 'react-native-loading-spinner-overlay';
import ImageOverlay from "react-native-image-overlay";
import DrawerNavigator from '../Navigation/DrawerNavigator';

export const EditProfile = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  const currentUsername = useSelector((state) => state.userProfile.username);
  const avatarUri = useSelector((state) => state.userProfile.avatarUri);
  const avatarBase64 = useSelector((state) => state.userProfile.avatarBase64);
  const avatarType = useSelector((state) => state.userProfile.avatarType);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const currentFullName = useSelector((state) => state.userProfile.fullName);
  const [newAvatar, setNewAvatar] = useState({ type: '', uri: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [profileSpinnerFlag, setProfileSpinnerFlag] = useState(false);

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
        await RNFetchBlob.fs.readFile(newAvatar.uri, 'base64').then(async (data) => {
          // data is the avatar content in base64 format
          requestBody["updates"]["avatar"]["base64image"] = data;
          requestBody["updates"]["avatar"]["avatarType"] = newAvatar.type;

        }).catch((e) => { console.log("error: " + e) })
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

  uploadPhoto = () => {
    requestCameraPermission();

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Reports Error: ', response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {

        const imageUri = response.assets[0].uri;
        const imageType = imageUri.split(".").pop();

        setNewAvatar({ type: imageType, uri: imageUri })
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
          textStyle={{ color: '#fff' }}
        />
      </View>

      <ImageOverlay
        source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_headset.jpg')).uri }}
        height={160}
        overlayAlpha={0.05}
        contentPosition="center">
        <View>
          <Avatar.Image source={{ uri: newAvatar.uri === '' ? avatarUri : newAvatar.uri }} size={110} />
        </View>
      </ImageOverlay>


      <Box alignItems="center" style={{ marginTop: 10 }}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
            },
            { top: '25%', width: "35%", height: 40, paddingLeft: 30, paddingTop: 9, borderRadius: 2 },
          ]}
          onPress={(e) => uploadPhoto(e)}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Take Photo</Text></Pressable>
      </Box>

      <ScrollView>
        <View style={styles.userrow}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Current Username: {currentUsername}</Text>
        </View>

        <Box alignItems="center" style={{ marginTop: 15, justifyContent: "space-between", flexDirection: "row" }}>
          <Input variant="outline" placeholder="New Username" fontSize={16} onChangeText={setNewUsername} />
        </Box>

        <View style={styles.userrow}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Current Full Name: {currentFullName}</Text>
        </View>

        <Box alignItems="center" style={{ marginTop: 15, justifyContent: "space-between", flexDirection: "row" }}>
          <Input variant="outline" placeholder="New Full Name" fontSize={16} onChangeText={setNewFullname} />
        </Box>

        <Box alignItems="center" style={styles.saveProfile}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
              },
              { top: '15%', width: "35%", height: 40, paddingLeft: 50, paddingTop: 9, borderRadius: 2 },
            ]}
            onPress={(e) => save(e)}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Save</Text></Pressable>
        </Box>

      </ScrollView>


      <ImageOverlay
        source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_headset.jpg')).uri }}
        height={160}
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
    marginTop: 20,
    justifyContent: 'center'
  },
  userDataFont: {
    color: '#795C34',
  },
  saveProfile: {
    marginTop: 20,
    marginBottom: 60
  },
  profileSpinnerStyle: {
    backgroundColor: '#cad5d8',
  },
});