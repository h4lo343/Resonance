import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAnotherUserProfile } from '../../redux/anotherUserProfile/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from "rn-fetch-blob";
import { CommentSession } from "../CommentSession/CommentSession";

export const CarouselCards = (propsData) => {
    const dispatch = useDispatch();
    const [anotherUserSpinnerFlag, SetAnotherUserSpinnerFlag] = useState(false);
    const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
    const [musicData, setMusicData] = useState({});
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        console.log("CarouseCards useEffect called")
        const musicDataArray = Object.values(nearbyMusics);
        processMusicData(musicDataArray[propsData.data.index])
    }, [nearbyMusics])

    useEffect(() => {
        console.log("musicData Updated")
    }, [musicData])

    const processMusicData = (nearbyMusic) => {
        var traceId = nearbyMusic.id;
        var songImageUri = nearbyMusic.song.songImageUrl;
        var songSharerId = nearbyMusic.sharer.id;
        var songSharerUsername = nearbyMusic.sharer.username;
        var songName = nearbyMusic.song.name;
        var songArtist = nearbyMusic.song.artist;
        var songUrl = nearbyMusic.song.songUrl;
        var comments = nearbyMusic.comments;
        var timestamp = nearbyMusic.timestamp;
        setMusicData({
            traceId: traceId,
            songImageUri: songImageUri,
            songSharerUsername: songSharerUsername,
            songSharerId: songSharerId,
            songName: songName,
            songArtist: songArtist,
            songUrl: songUrl,
            comments: comments,
            timestamp: timestamp
        })
    }

    const goToAnotherUserProfile = () => {
        console.log("navigation callback");
        SetAnotherUserSpinnerFlag(true);
        getAnotherUserInfo().then(() => {
            propsData.data.setVisibilityCallBack();
            propsData.data.navigationCallback();
        }).catch(() => {
            SetAnotherUserSpinnerFlag(false);
        })
    }

    const getAnotherUserInfo = (async () => {
        console.log("received sharer id: " + musicData.songSharerId);
        var requestBody = {
            id: musicData.songSharerId
        }
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/retrieveOtherUserInfo",
            {
                headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
                method: 'POST',
                body: JSON.stringify(requestBody)
            }
        )

        const result = await response.json();

        const dirs = RNFetchBlob.fs.dirs;

        const imageType = result.avatar.avatarType;

        var path = dirs.DCIMDir + "/user-avatar." + imageType;

        if (!(result.avatar == {} || imageType == undefined)) {
            RNFetchBlob.fs.writeFile(path, result.avatar.base64image, 'base64')
                .then((res) => {
                    var uri = "file://" + path;
                    console.log("get uri from base64: " + uri);
                    const data = {
                        username: result.username,
                        musicList: result.traces,
                        type: imageType,
                        uri: uri,
                        base64: result.avatar.base64image
                    }
                    dispatch(getAnotherUserProfile({ data }))

                    SetAnotherUserSpinnerFlag(false);

                }).catch((e) => {
                    console.log("error " + e);
                    const data = {
                        username: result.username,
                        musicList: result.traces,
                    }
                    dispatch(getAnotherUserProfile({ data }))
                    SetAnotherUserSpinnerFlag(false);
                });
        } else {
            const data = {
                username: result.username,
                musicList: result.traces,
            }
            dispatch(getAnotherUserProfile({ data }))
            SetAnotherUserSpinnerFlag(false);
        }
    })

    return (
        <View>
            <View>
                <Spinner
                    visible={anotherUserSpinnerFlag}
                    textContent={'Retrieving user profile...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
            <View style={{height: 350, width: 330}}>
                <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1, paddingRight: 12 }}>
                    <View >
                        <View style={styles.wrapperStyle}>
                            <Image style={{ width: 70, height: 70, marginLeft: 20 }} resizeMode="contain" source={{ uri: musicData.songImageUri }} alt={musicData.songName} />
                            <View>
                                <Text style={styles.sharerLink} onPress={() => goToAnotherUserProfile()}>Sharer: {musicData.songSharerUsername}</Text>
                                <Text style={styles.textInList}>{(new Date(musicData.timestamp).toDateString())}</Text>
                                <Text style={styles.textInList}>Song: {musicData.songName}</Text>
                                <Text style={styles.textInList}>Artist: {musicData.songArtist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(musicData.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <CommentSession
                            musicData={musicData}
                            setMusicData={setMusicData}
                        ></CommentSession>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperStyle: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    addButton: {
        backgroundColor: "#e4b1a5",
        display: "flex",
        paddingVertical: 2,
        height: 40,
        justifyContent: "space-between",
        width: 136
    },
    sharerLink: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#5F9F9F",
        textDecorationLine: 'underline',
    },
    link: {
        color: "#5F9F9F",
        fontSize: 14.5,
        textDecorationLine: 'underline',
    },
    textInList: {
        fontSize: 14.5
    },
    spinnerTextStyle: {
        color: '#FFF',
        paddingTop: 10,
    },
})