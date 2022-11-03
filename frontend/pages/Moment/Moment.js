import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, Linking} from 'react-native';
import { updateFollowedUsers } from '../../redux/follower/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageOverlay from "react-native-image-overlay";
import { Box, Button, FlatList } from 'native-base';

/**
 * This page displays followings' latest music traces
 */
export const Moment = ({ navigation }) => {
    const dispatch = useDispatch();
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const musicsFromFollowers = useSelector((state) => state.follower.musicLists);
    const [momentSpinnerFlag, setMomentSpinnerFlag] = useState(true);

    /**
     * Retrieve followings' latest music traces from backend
     */
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

            var data = result.followedUser;
            dispatch(updateFollowedUsers({ data }));
            setMomentSpinnerFlag(false);

        } catch (e) {
            console.log(e);
            setMomentSpinnerFlag(false);
        }

    }

    useEffect(() => {
        // this is to ensure that this page would refresh to get new user data from backend
        const focusHandler = navigation.addListener('focus', () => {
            setMomentSpinnerFlag(true);
            fetchFollowedUser().then().catch((e) => { console.log("error: " + e) });
        });

        // this return is to unsubscribe handler from the event
        return focusHandler;
    }, [navigation]);

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View style={styles.profileSpinnerStyle}>
                <Spinner
                    visible={momentSpinnerFlag}
                    textContent={'Retrieving music traces...'}
                    textStyle={{ color: '#fff', fontSize: 16  }}
                />
            </View>

            <ImageOverlay
                source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/follower_page.jpg')).uri }}
                height={120}
                overlayAlpha={0.05}
                contentPosition="center">
                <View style={{alignItems: "center"}}>
                    <Text style={styles.userDataFontTitle}>Moment</Text>
                    <Text style={styles.userDataFontText}>Check out latest music traces</Text>
                    <Text style={styles.userDataFontText}>shared by your following</Text>
                </View>
            </ImageOverlay>

            <View style={{ height: 380, width: 360, alignItems: "center", paddingLeft: 15 }}>
                <FlatList
                    data={musicsFromFollowers}
                    keyExtractor={(item) => item.userId}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ marginTop: 10, width: 70, height: 60 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
                            <View style={{ marginLeft: 15 }}>
                                <View style={styles.musicListHeader}>
                                    <Text style={{ fontSize: 14, color: '#795C34' }}>{item.userFollowed}</Text>
                                </View>
                                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>Song: {item.song.name}</Text>
                                <Text style={{ fontSize: 13 }}>Artist: {item.song.artist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(item.song.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    )
                    }
                ></FlatList>
            </View>

            <ImageOverlay
                source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/follower_page.jpg')).uri }}
                height={260}
                overlayAlpha={0.05}
                contentPosition="bottom">
            </ImageOverlay>
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
    userDataFontTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'white',
    },
    userDataFontText: {
        fontSize: 16,
        color: 'white',
        fontWeight: "bold"
    },
    profileSpinnerStyle: {
        backgroundColor: '#cad5d8',
    },
    musicListHeader: {
        backgroundColor: "#cad5d8",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingBottom: 2,
        paddingHorizontal: 5,
        width: 200,
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
        fontSize: 13
    },
})
