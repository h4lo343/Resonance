import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Linking} from 'react-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/userProfile/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageOverlay from "react-native-image-overlay";

export const UserProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const stateUsername = useSelector((state) => state.userProfile.username);
    const stateFullName = useSelector((state) => state.userProfile.fullName);
    const stateAvatarUri = useSelector((state) => state.userProfile.avatarUri);
    const musicList = useSelector((state) => state.userProfile.musicList);
    const [profileSpinnerFlag, setProfileSpinnerFlag] = useState(true);
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        // this is to ensure that this page would refresh to get new user data from backend
        const focusHandler = navigation.addListener('focus', () => {
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

        var data = {};

        if (!(result.avatar == {} || result.avatar.base64image == "" || result.avatar.base64image == undefined)) {
            data = {
                username: result.username,
                fullName: result.fullName,
                uri: result.avatar.base64image,
                musicList: result.traces
            }
        } else {
            data = {
                username: result.username,
                fullName: result.fullName,
                uri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
                musicList: result.traces
            }
        }

        console.log("backend uri: " + result.avatar.base64image);

        dispatch(getUserProfile({ data }))
    
        setProfileSpinnerFlag(false);

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
                    textStyle={{ color: '#fff', fontSize: 16  }}
                />
            </View>

            <ImageOverlay
                source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_1.png')).uri }}
                height={180}
                overlayAlpha={0.05}
                contentPosition="center">
                <Avatar.Image style={{ marginBottom: 5}} source={{ uri: stateAvatarUri }} size={100} />
                <Text style={styles.userDataFont}>Username: {stateUsername}</Text>
                <Text style={styles.userDataFont}>Full Name: {stateFullName}</Text>
            </ImageOverlay>

            <View style={styles.musicListHeader}>
                <Text style={{ fontSize: 16, color: '#795C34' }}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 50, marginTop: 5, height: 250, width: 310 }}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ width: 70, height: 60}} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
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
                        {height: 30, borderRadius: 2, justifyContent: "center", alignItems: "center", paddingHorizontal: 5 },
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
        paddingTop: 5,
        fontSize: 16,
        color: '#795C34',
    },
    profileSpinnerStyle: {
        backgroundColor: '#cad5d8',
    },
    musicListHeader: {
        backgroundColor: "#cad5d8",
        flexDirection: 'row',
        marginTop: 10,
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
