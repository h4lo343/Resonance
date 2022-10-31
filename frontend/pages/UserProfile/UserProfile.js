import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/userProfile/slice';
import RNFetchBlob from "rn-fetch-blob";
import Spinner from 'react-native-loading-spinner-overlay';


export const UserProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const stateUsername = useSelector((state) => state.userProfile.username);
    const stateFullName = useSelector((state) => state.userProfile.fullName);
    const stateAvatarUri = useSelector((state) => state.userProfile.avatarUri);
    const musicList = useSelector((state) => state.anotherUserProfile.musicList);
    const [profileSpinnerFlag, setProfileSpinnerFlag] = useState(true);
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        // this is to ensure that this page would refresh to get new user data from backend
        const focusHandler = navigation.addListener('focus', () => {
            console.log('user profile use effact called')
            getUserInfo().then().catch((e) => {
                console.log("error: " + e);
                backToMapProfile();
                setProfileSpinnerFlag(false);
            });
        });

        // this return is to unsubscribe handler from the event
        return focusHandler;
    }, [navigation]);

    const getUserInfo = (async () => {
        setProfileSpinnerFlag(true);

        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/getUserInfo",
            {
                headers: { Authorization: "Bearer " + jwtToken },
                method: 'GET'
            }
        )
        const result = await response.json();

        const dirs = RNFetchBlob.fs.dirs;

        const imageType = result.avatar.avatarType;

        var path = dirs.DCIMDir + "/user-avatar." + imageType;

        if (!(imageType == undefined || result.avatar == {})) {
            RNFetchBlob.fs.writeFile(path, result.avatar.base64image, 'base64')
                .then((res) => {
                    var uri = "file://" + path;
                    console.log("get uri from base64: " + uri);
                    const data = {
                        username: result.username,
                        fullName: result.fullName,
                        type: imageType,
                        uri: uri,
                        base64: result.avatar.base64image,
                        musicList: result.traces
                    }

                    dispatch(getUserProfile({ data }))

                    setProfileSpinnerFlag(false);

                }).catch((e) => {
                    console.log("error " + e);
                    const data = {
                        username: result.username,
                        fullName: result.fullName,
                        uri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
                        type: "png",
                        musicList: result.traces
                    }
                    console.log("username: " + data.username);

                    dispatch(getUserProfile({ data }))

                    setProfileSpinnerFlag(false);
                });
        } else {
            const data = {
                username: result.username,
                fullName: result.fullName,
                uri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
                type: "png",
                musicList: result.traces
            }

            console.log("image invalid: username: " + data.username);
            dispatch(getUserProfile({ data }))

            setProfileSpinnerFlag(false);
        }
    })

    const editProfile = () => {
        navigation.navigate("EditProfile");
    }

    const backToMapProfile = () => {
        navigation.navigate("DrawerNavigator");
    }

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.profileSpinnerStyle}>
                <Spinner
                    visible={profileSpinnerFlag}
                    textContent={'Updating user profile...'}
                    textStyle={{ color: '#fff' }}
                />
            </View>
            <View style={styles.row}>
                <Avatar.Image source={{ uri: stateAvatarUri }} size={100} />
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Username: {stateUsername}</Text>
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Full Name: {stateFullName}</Text>
            </View>

            <View style={styles.musicListHeader}>
                <Text style={{ fontSize: 16, color: '#795C34' }}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 70, marginTop: 10, height: 200, width: 310 }}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ width: 70, height: 70, marginBottom: 5 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontWeight: 'bold' }}>Song: {item.song.name}</Text>
                                <Text>Artist: {item.song.artist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(item.song.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    )
                    }
                ></FlatList>
            </View>

            <Box alignItems="center" style={{ marginTop: 20, marginBottom: 250 }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
                        },
                        { top: '20%', width: "35%", height: 40, paddingLeft: 30, paddingTop: 9, borderRadius: 2 },
                    ]}
                    onPress={(e) => editProfile(e)}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text></Pressable>
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
        marginTop: 10,
        justifyContent: 'center'
    },
    userDataFont: {
        fontSize: 16,
        color: '#795C34',
    },
    profileSpinnerStyle: {
        backgroundColor: '#cad5d8',
    },
    musicListHeader: {
        backgroundColor: "#cad5d8",
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    listStyle: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        marginRight: 10,
    },
    link: {
        color: "#5F9F9F",
        textDecorationLine: 'underline',
    },
});
