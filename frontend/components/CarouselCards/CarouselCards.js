import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-native';
import { Box, Input, Button, FlatList } from 'native-base'
import { getAnotherUserProfile } from '../../redux/anotherUserProfile/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from "rn-fetch-blob";

export const CarouselCards = (index) => {
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const [spinnerEnabled, setSpinnerEnableFlag] = useState(false);
    const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
    const [musicData, setMusicData] = useState({});
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    useEffect(() => {
        console.log("useEffect modal is false")
        console.log("index: " + index.data)
        const musicDataArray = Object.values(nearbyMusics);
        processMusicData(musicDataArray[index.data])
        console.log("-----------");
    }, [nearbyMusics])

    const processMusicData = (nearbyMusic) => {
        var traceId = nearbyMusic.id;
        console.log("trace id: " + traceId);
        var songImageUri = nearbyMusic.song.songImageUrl;
        var songSharerId = nearbyMusic.sharer.id;
        console.log("song sharer id: " + songSharerId);
        var songSharerUsername = nearbyMusic.sharer.username;
        console.log("song sharer user name: " + songSharerUsername);
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
        setSpinnerEnableFlag(true);
        getAnotherUserInfo().then(() => {
            console.log("navigate to a new page");
            Navigate("/another-user-profile");
        })
    }

    const getAnotherUserInfo = (async () => {
        console.log("received sharer id: " + musicData.songSharerId);
        var requestBody = {
            id: "634414f7505472f68e36ab33"
        }
        const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/user/retrieveOtherUserInfo",
            {
                headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
                method: 'POST',
                body: JSON.stringify(requestBody)
            }
        )

        const result = await response.json();

        console.log(`result: ${Object.entries(result)}`);

        console.log("avatar: " + result.avatar + " | " + (result.avatar == {}));
        console.log("image type: " + result.avatar.avatarType + " | " + (result.avatar.avatarType == undefined));

        const dirs = RNFetchBlob.fs.dirs;

        console.log(Object.values(result.traces))

        const imageType = result.avatar.avatarType;

        var path = dirs.DCIMDir + "/user-avatar." + imageType;
        console.log("path: " + path);

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

                console.log("username: " + username);

                dispatch(getAnotherUserProfile({ data }))

                setSpinnerEnableFlag(false);

            }).catch((e) => { 
                console.log("error " + e);
                setSpinnerEnableFlag(false);
            });
        } else {
            const data = {
                username: result.username,
                musicList: result.traces,
            }
            console.log("--image not valid:");
            console.log("data: " + Object.values(data));
            dispatch(getAnotherUserProfile({ data }))
            setSpinnerEnableFlag(false);
        }
    })
    
    const add = () => {
        // can save comment here
    }

    return (
        <View>
            <View style={styles.spinnerStyle}>
                <Spinner
                    visible={spinnerEnabled}
                    textContent={'Retrieving user profile...'}
                    textStyle={styles.spinnerTextStyle}
                />
            </View>
            <View>
                <View style={styles.displayStyle}>
                    <Image style={{ width: 70, height: 70 }} resizeMode="contain" source={{ uri: musicData.songImageUri }} alt={musicData.songName} />
                    <View>
                        <Text style={styles.link} onPress={() => goToAnotherUserProfile()}>sharer: {musicData.songSharerUsername}</Text>
                        <Text>{musicData.timestamp}</Text>
                        <Text>song:{musicData.songName}</Text>
                        <Text>artist: {musicData.songArtist}</Text>
                        <Text style={styles.link} onPress={()=>{Linking.openURL(musicData.songUrl)}}>music spotify link</Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <Button onPress={(e) => add(e)} style={styles.addButton}><Text style={{ fontWeight: 'bold', fontSize: 12 }}>Submit Comment</Text></Button>
                    <Input variant="underlined" placeholder="Type New Comment" fontSize={14} onChangeText={setNewComment} />
                </View>
                <View style = {{height: 200}}>
                    <ScrollView nestedScrollEnabled={true} style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>Comments</Text>
                        <FlatList
                            data={musicData.comments}
                            keyExtractor={(item) => item.id + item.timestamp}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={{ backgroundColor: "#f0f0f0", fontWeight: 'bold' }}>{item.user} - {item.timestamp}</Text>
                                    <Text style={{ backgroundColor: "#f0f0f0" }}>{item.comment}</Text>
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
    displayStyle: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        flexDirection: "row",
        alignItems: "center"
    },
    addButton: {
        backgroundColor: "#e4b1a5",
        display: "flex",
        justifyContent: "space-between",
        width: 120
    },
    link: {
        color: "#63C5DA",
        textDecorationLine: 'underline',
    },
    spinnerStyle: {
        // paddingTop: 20,
        backgroundColor: '#cad5d8',
        // padding: 8,
    },
    spinnerTextStyle: {
        color: '#fff',
        paddingTop: 10,
    },
})