import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-native';
import { Box, Input, Button, FlatList } from 'native-base'
import { getAnotherUserProfile } from '../../redux/anotherUserProfile/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from "rn-fetch-blob";

export const CarouselCards = (index) => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const [anotherUserSpinnerFlag, SetAnotherUserSpinnerFlag] = useState(false);
    const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
    const [musicData, setMusicData] = useState({});
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        console.log("CarouseCards useEffect called")
        const musicDataArray = Object.values(nearbyMusics);
        processMusicData(musicDataArray[index.data])
    }, [nearbyMusics])

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

    const Navigate = useNavigate();

    const goToAnotherUserProfile = () => {
        SetAnotherUserSpinnerFlag(true);
        getAnotherUserInfo().then(() => {
            Navigate("/another-user-profile");
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

        console.log(Object.values(result.traces))

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

    const add = () => {
        // can save comment here
    }

    return (
        <View>
            <View>
                <Spinner
                    visible={anotherUserSpinnerFlag}
                    textContent={'Retrieving user profile...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
            <View>
                <View style={styles.wrapperStyle}>
                    <Image style={{ width: 70, height: 70, marginLeft: 20 }} resizeMode="contain" source={{ uri: musicData.songImageUri }} alt={musicData.songName} />
                    <View>
                        <Text style={styles.sharerLink} onPress={() => goToAnotherUserProfile()}>Sharer: {musicData.songSharerUsername}</Text>
                        <Text style={styles.textInList}>{musicData.timestamp}</Text>
                        <Text style={styles.textInList}>Song:{musicData.songName}</Text>
                        <Text style={styles.textInList}>Artist: {musicData.songArtist}</Text>
                        <Text style={styles.link} onPress={() => { Linking.openURL(musicData.songUrl) }}>music spotify link</Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <Button onPress={(e) => add(e)} style={styles.addButton}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Submit Comment</Text></Button>
                    <Input variant="underlined" placeholder="Type New Comment" fontSize={14} onChangeText={setNewComment} />
                </View>
                <View style={{ height: 160 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginVertical: 3 }}>Comments</Text>
                    <ScrollView nestedScrollEnabled={true} style={{ marginTop: 5 , backgroundColor: "#f0f0f0"}}>
                        <FlatList
                            data={musicData.comments}
                            keyExtractor={(item) => item.id + item.timestamp}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={{fontWeight: 'bold', marginLeft: 5, fontSize: 14.5 }}>{item.user} - {item.timestamp}</Text>
                                    <Text style={{marginLeft: 5, fontSize: 14.5 }}>{item.comment}</Text>
                                </View>
                            )
                            }
                        ></FlatList>
                    </ScrollView>
                </View>
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