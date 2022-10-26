import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navigate, useNavigate } from 'react-router-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/userProfile/slice';
import RNFetchBlob from "rn-fetch-blob";
import { useLocation } from 'react-router-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const stateUsername = useSelector((state) => state.userProfile.username);
    const stateFullName = useSelector((state) => state.userProfile.fullName);
    const stateAvatarUri = useSelector((state) => state.userProfile.avatarUri);
    const [spinnerEnabled, setSpinnerEnableFlag] = useState(true);
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const location = useLocation();
    const Navigate = useNavigate();

    const getUserInfo = (async () => {
        console.log("user effect called");
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/updateUserInfo",
            {
                headers: { Authorization: "Bearer " + jwtToken },
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

                dispatch(getUserProfile({ data }))

                setSpinnerEnableFlag(false);

            }).catch((e) => { 
                console.log("error " + e);
                setSpinnerEnableFlag(false);
            });
    })

    const editProfile = () => {
        Navigate("/edit-profile");
    }

    useEffect(() => {
        // Update the document title using the browser API
        getUserInfo().then().catch((e) => { console.log("error: " + e) });
    }, [location.key]);

    return (
        <View>
            <View style={styles.spinnerView}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={spinnerEnabled}
                    //Text with the Spinner
                    textContent={'Updating user profile...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerFontStyle}
                />
            </View>
            <View style={styles.row}>
                <Avatar.Image source={{ uri: stateAvatarUri }} size={150} />
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Username: {stateUsername}</Text>
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Full Name: {stateFullName}</Text>
            </View>

            <Box alignItems="center" style={{ marginTop: 40 }}>
                <Button onPress={(e) => editProfile(e)} style={styles.editProfile}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Profile</Text></Button>
            </Box>
        </View>

    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'center'
    },
    userrow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    userDataFont: {
        fontSize: 20,
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
        paddingTop: 10,
    },
});