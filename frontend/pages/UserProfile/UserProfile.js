import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native';
import { Box } from 'native-base';
import {Avatar} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/userProfile/slice';
import RNFetchBlob from "rn-fetch-blob";
import { useLocation } from 'react-router-native';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const stateUsername = useSelector((state) => state.userProfile.username);
    const stateFullName = useSelector((state) => state.userProfile.fullName);
    const stateAvatarUri = useSelector((state) => state.userProfile.avatarUri);
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const location = useLocation();

    const getUserInfo = (async () => {
        console.log("user effect called");
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/getUserInfo",
            {
                headers: {Authorization: "Bearer " + jwtToken},
                method: 'GET'
            }
        )
        const result = await response.json();

        const dirs = RNFetchBlob.fs.dirs;

        const imageType = result.avatar.avatarType;

          var path = dirs.DCIMDir + "/user-avatar." + imageType;
    
        RNFetchBlob.fs.writeFile(path, result.avatar.base64image, 'base64')
        .then((res) => {
            var uri = "file://" + path;
            console.log("get uri from base64: " + uri);
            const data = {
              username: result.username,
              fullName: result.fullName,
              type: imageType,
              uri: uri,
              base64: result.avatar.base64image
            }

            dispatch(getUserProfile({data}))

        }).catch((e) => {console.log("error " + e)});
    })

    useEffect(() => {
        console.log("user effect called")
        // Update the document title using the browser API
        getUserInfo().then().catch((e) => {console.log("error: " + e)});
      }, [location.key]);

  return (
    <View>
        <View style={styles.row}>
            <Avatar.Image source={{uri: stateAvatarUri}} size={80}/>
        </View>

        <View style={styles.row}>
            <Text style={styles.userDataFont}>Username: {stateUsername}</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.userDataFont}>Full Name: {stateFullName}</Text>
        </View>

        <Box alignItems="center" style={{ marginTop: 40 }}>
            <Link to="/edit-profile" underlayColor="#f0f4f7" ><Text style={styles.editLinkFont}> Edit Profile </Text></Link>
         </Box>

    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center'
    },
    userDataFont: {
        color: '#795C34',
    },
    editLinkFont: {
        fontSize: 20,
        fontWeight: "bold"
      },
});