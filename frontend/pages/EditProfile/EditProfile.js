import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid, FormControl } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Box, Input, Button } from 'native-base';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import RNFetchBlob from "rn-fetch-blob";
import { Navigate, useNavigate } from 'react-router-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const EditProfile = () => {
  const currentUsername = useSelector((state) => state.userProfile.username);
  const avatarUri = useSelector((state) => state.userProfile.avatarUri);
  const avatarBase64 = useSelector((state) => state.userProfile.avatarBase64);
  const avatarType = useSelector((state) => state.userProfile.avatarType);
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const currentFullName = useSelector((state) => state.userProfile.fullName);
  const [newAvatar, setNewAvatar] = useState({ type: '', uri: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newFullname, setNewFullname] = useState('');
  const [spinnerEnabled, setSpinnerEnableFlag] = useState(false);
  const Navigate = useNavigate();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "Give This App Camera Access",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Give permission");
      } else {
        console.log("Deny permission");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const postToBackend = async () => {
    // TODO: replace Authorization with real jwt token
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

      // newAvatar.uri != avatarUri && newAvatar.type != ''
      if (true) {
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
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {

        const imageUri = response.assets[0].uri;
        const imageType = imageUri.split(".").pop();

        setNewAvatar({ type: imageType, uri: imageUri })
      }
    });
  }

  const save = () => {
    setSpinnerEnableFlag(true);
    postToBackend().then(() => {
      setSpinnerEnableFlag(false);
      Navigate('/user-profile');
    }).catch((error) => {
      console.log("error: " + error);
    })
  }

  return (
    <View>
      <View style={styles.spinnerView}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={spinnerEnabled}
          //Text with the Spinner
          textContent={'Saving user profile updates...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerFontStyle}
        />
      </View>

      <View style={styles.row}>
        <Avatar.Image source={{ uri: newAvatar.uri === '' ? avatarUri : newAvatar.uri }} size={150} />
      </View>

      <Box alignItems="center" style={{ marginTop: 40 }}>
        <Button onPress={uploadPhoto} style={styles.editProfile}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>Take Photo</Text></Button>
      </Box>

      <View style={styles.userrow}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Current Username: {currentUsername}</Text>
      </View>
      
      <Box alignItems="center" style={{ marginTop: 30, justifyContent: "space-between", flexDirection: "row" }}>
        <Input variant="outline" placeholder="Username" fontSize={16} onChangeText={setNewUsername} />
      </Box>

      <View style={styles.userrow}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Current Full Name: {currentFullName}</Text>
      </View>

      <Box alignItems="center" style={{ marginTop: 30, justifyContent: "space-between", flexDirection: "row" }}>
        <Input variant="outline" placeholder="New Full Name" fontSize={16} onChangeText={setNewFullname} />
      </Box>

      <Box alignItems="center" style={{ marginTop: 40 }}>
        <Button onPress={(e) => save(e)} style={styles.editProfile}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>Save</Text></Button>
      </Box>

    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 30,
    justifyContent: 'center'
  },
  userrow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center'
  },
  userDataFont: {
    color: '#795C34',
  },
  editProfile: {
    backgroundColor: "#e4b1a5",
    width: "50%",
  },
  spinnerView: {
    paddingTop: 20,
    backgroundColor: '#cad5d8',
    padding: 8,
  },
  spinnerFontStyle: {
    color: '#fff',
  },
});