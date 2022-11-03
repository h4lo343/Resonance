import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAnotherUserProfile } from '../../redux/anotherUserProfile/slice';
import Spinner from 'react-native-loading-spinner-overlay';
import { CommentSession } from "../CommentSession/CommentSession";

/**
 * Cards are displaying when "music trace" or "nearby music" are requested
 * Information like music, sharer or comments are displayed in card
 * User can post text or audio comments
 * User can also clicks on "sharer" link to see another user's profile
 * If there are multiple cards, user can swipe screen from left-to-right or right-to-left
 * User can also scroll the page to see all comments
 */
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

    /**
     * When user clicks on the "sharer" link, user will be guided to sharer's profile page
     */
    const goToAnotherUserProfile = () => {
        SetAnotherUserSpinnerFlag(true);
        getAnotherUserInfo().then(() => {
            propsData.data.setVisibilityCallBack();
            propsData.data.navigationCallback();
        }).catch(() => {
            SetAnotherUserSpinnerFlag(false);
        })
    }

    /**
     * Fetch another user's info from backend
     */
    const getAnotherUserInfo = (async () => {
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

        var data = {};

        // if that user does not have avatar photo, default avatar will be displayed
        if (!(result.avatar == {} || result.avatar.base64image == "" || result.avatar.base64image == undefined)) {
            data = {
                userId: musicData.songSharerId,
                username: result.username,
                musicList: result.traces,
                uri: result.avatar.base64image,
            }
        } else {
            data = {
                userId: musicData.songSharerId,
                username: result.username,
                musicList: result.traces,
                uri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
            }
        }

        dispatch(getAnotherUserProfile({ data }))

        SetAnotherUserSpinnerFlag(false);
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
            <View style={{height: 330, width: 330}}>
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
        fontSize: 13,
        color: "#5F9F9F",
        textDecorationLine: 'underline',
    },
    link: {
        color: "#5F9F9F",
        fontSize: 13,
        textDecorationLine: 'underline',
    },
    textInList: {
        fontSize: 13
    },
    spinnerTextStyle: {
        color: '#FFF',
        paddingTop: 10,
        fontSize: 16
    },
})