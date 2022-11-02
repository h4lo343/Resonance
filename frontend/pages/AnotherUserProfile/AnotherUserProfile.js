import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking, Pressable, Alert } from 'react-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { updateFollowedUsers } from '../../redux/follower/slice';
import { useSelector, useDispatch } from 'react-redux';
import ImageOverlay from "react-native-image-overlay";
import Spinner from 'react-native-loading-spinner-overlay';

export const AnotherUserProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const defaultUri = Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri;
    const username = useSelector((state) => state.anotherUserProfile.username);
    const musicList = useSelector((state) => state.anotherUserProfile.musicList);
    const avatarUri = useSelector((state) => state.anotherUserProfile.avatarUri);
    const currentUserId = useSelector((state) => state.anotherUserProfile.userId);
    const followedUsersList = useSelector((state) => state.follower.followedUsers);
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const [followSpinnerFlag, setFollowSpinnerFlag] = useState(false);

    const [showFollowButton, setShowFollowButton] = useState(false);

    const backToMap = () => {
        navigation.navigate("DrawerNavigator");
    }

    useEffect(() => {
        console.log("another user profile useEffect called")
        checkUser();
    }, [username])

    const checkUser = () => {
        var notFollowed = true;
        followedUsersList.forEach(user => {
            console.log("current user id: " + currentUserId);
            console.log("followed user id: " + user);
            if (currentUserId == user) {
                notFollowed = false;
            }
        });

        setShowFollowButton(notFollowed);
    }

    const followUser = async () => {
        var requestBody = {
            userId: currentUserId
        }
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/followUser", {
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
            method: 'POST',
            body: JSON.stringify(requestBody)
        })
        const result = await response.json();

        var data = result.followedUser;
        dispatch(updateFollowedUsers({ data }));
    }

    const updateFollowUser = () => {
        setFollowSpinnerFlag(true);
        followUser().then(
            () => {
                setFollowSpinnerFlag(false);
                Alert.alert(
                    "Successfully followed!",
                );
                setShowFollowButton(false);
            }
        ).catch((e) => {
            setFollowSpinnerFlag(false);
            console.log("error: " + e);
            Alert.alert(
                "Failed to follower user.",
            );
        })
    }

    return (
        <View>
            <View style={styles.profileSpinnerStyle}>
                <Spinner
                    visible={followSpinnerFlag}
                    textContent={'Processing following request...'}
                    textStyle={{ color: '#fff', fontSize: 16 }}
                />
            </View>
            <Text style={{ padding: 5, backgroundColor: '#5F9F9F', color: "#fff", fontSize: 18, fontWeight: "bold" }}>Profile</Text>

            <ImageOverlay
                source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/music_2.jpg')).uri }}
                height={190}
                overlayAlpha={0.1}
                contentPosition="center">
                <View style={{alignItems: "center"}}>
                    <Avatar.Image style={{ marginBottom: 2,}} source={{ uri: avatarUri == undefined ? defaultUri : avatarUri }} size={100} />
                    <Text style={styles.userDataFont}>Username: {username}</Text>
                    {showFollowButton &&
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
                                },
                                { top: '4%', height: 30, borderRadius: 2, justifyContent: "center", alignItems: "center", paddingHorizontal: 5 },
                            ]}
                            onPress={(e) => updateFollowUser(e)}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Follow</Text></Pressable>
                    }
                </View>

            </ImageOverlay>

            <View style={styles.musicListHeader}>
                <Text style={{ fontSize: 16, color: '#795C34' }}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 70, marginTop: 10, height: 250, width: 310 }}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ width: 70, height: 60, marginBottom: 5 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
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

            <Box alignItems="center" style={{ marginTop: 20 }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#f0f0f0' : '#e4b1a5',
                        },
                        { top: '20%', height: 30, borderRadius: 2, justifyContent: "center", alignItems: "center", paddingHorizontal: 5 },
                    ]}
                    onPress={(e) => backToMap(e)}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Back To Map</Text></Pressable>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 5,
        justifyContent: 'center'
    },
    profileSpinnerStyle: {
        backgroundColor: '#cad5d8',
    },
    userrow: {
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center'
    },
    musicListHeader: {
        backgroundColor: "#cad5d8",
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    userDataFont: {
        fontSize: 16,
        color: '#795C34',
        backgroundColor: 'white',
        paddingHorizontal: 5,
        marginTop: 10
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