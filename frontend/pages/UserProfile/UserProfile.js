import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Navigate, useNavigate } from 'react-router-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/userProfile/slice';
import RNFetchBlob from "rn-fetch-blob";
import { useLocation } from 'react-router-native';
import Spinner from 'react-native-loading-spinner-overlay';


export const UserProfile = ({navigation}) => {
    const dispatch = useDispatch();
    const stateUsername = useSelector((state) => state.userProfile.username);
    const stateFullName = useSelector((state) => state.userProfile.fullName);
    const stateAvatarUri = useSelector((state) => state.userProfile.avatarUri);
    const musicList = useSelector((state) => state.anotherUserProfile.musicList);
    const [profileSpinnerFlag, setProfileSpinnerFlag] = useState(true);
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const location = useLocation();
    const Navigate = useNavigate();

    const getUserInfo = (async () => {
        console.log("user effect called");
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/getUserInfo",
            {
                headers: { Authorization: "Bearer " + jwtToken },
                method: 'GET'
            }
        )
        const result = await response.json();

        console.log("result: " + result.username);

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
                    musicList: result.traces
                }

                dispatch(getUserProfile({ data }))

                setProfileSpinnerFlag(false);
            });
        } else {
            const data = {
                username: result.username,
                fullName: result.fullName,
                musicList: result.traces
            }

            console.log("image invalid: username: " + username);
            dispatch(getUserProfile({ data }))

            setProfileSpinnerFlag(false);
        }
    })

    const editProfile = () => {
        Navigate("/edit-profile");
    }

    useEffect(() => {
        getUserInfo().then().catch((e) => { console.log("error: " + e) });
    }, [location.key]);

    return (
        <View>
            <View style={styles.profileSpinnerStyle}>
                <Spinner
                    visible={profileSpinnerFlag}
                    textContent={'Updating user profile...'}
                    textStyle={{color: '#fff'}}
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
                <Text style={{fontSize: 16, color: '#795C34'}}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 70, marginTop: 10, height: 200, width: 310}}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ width: 70, height: 70, marginBottom: 5 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
                            <View style={{marginLeft: 15}}>
                                <Text style={{fontWeight: 'bold'}}>Song: {item.song.name}</Text>
                                <Text>Artist: {item.song.artist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(item.song.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    )
                    }
                ></FlatList>
            </View>

            <Box alignItems="center" style={{ marginTop: 20 }}>
                <Button onPress={(e) => editProfile(e)} style={styles.editProfile}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text></Button>
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
    editProfile: {
        backgroundColor: "#e4b1a5",
    },
    profileSpinnerStyle: {
        paddingTop: 20,
        backgroundColor: '#cad5d8',
        padding: 8,
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
