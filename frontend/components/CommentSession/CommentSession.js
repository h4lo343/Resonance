import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Linking,
    Platform,
    PermissionsAndroid,
    TouchableWithoutFeedback, Alert, Modal, TouchableOpacity
} from 'react-native';
import {Button, FlatList, Input, Pressable} from 'native-base'
import AudioRecorderPlayer from "react-native-audio-recorder-player/index";
import RNFetchBlob from "rn-fetch-blob";
import {useSelector} from "react-redux";
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';


export const CommentSession = ({musicData, setMusicData}) => {

    const [isRecording, setIsRecording] = React.useState(false);
    const [recordings, setRecordings] = React.useState();
    const [confirmationWindow, setConfirmationWindow] = React.useState(false);
    const [newComment, setNewComment] = useState('');
    const [recordingTime, setRecordingTime] = React.useState();
    const [audioRecorderPlayer, setAudioRecorderPlayer] = React.useState(new AudioRecorderPlayer());
    const [pausedPlay, setPausedPlay] = React.useState(true);
    const [currentPositionSec, setCurrentPositionSec] = React.useState();
    const [currentDurationSec, setCurrentDurationSec] = React.useState();
    const [playTime, setPlayTime] = React.useState("00:00:00");
    const [playPath, setPlayPath] = React.useState();
    const [duration, setDuration] = React.useState();
    const [pathToRecord, setPath] = React.useState();
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    const requestAudioRecordingPermission = async () => {
        try {
            const grants = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);

            console.log('write external stroage', grants);

            if (
                grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
                grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
                grants['android.permission.RECORD_AUDIO'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Permissions granted');
            } else {
                console.log('All required permissions not granted');
                return;
            }
        } catch (err) {
            console.warn(err);
            return;
        }
    }


    /**
     * path to where audio file saved in device
     * **/
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
        ios: 'hello.m4a',
        android: `${dirs.CacheDir}/`,
    });

    const onStartRecord = async () => {
        await auth().signInAnonymously().then(()=> {console.log("signed in")});
        let fileId = uuid.v4();
        let filePath = path + fileId + ".mp4"
        try{
            await requestAudioRecordingPermission();
            const result = await audioRecorderPlayer.startRecorder(filePath);
            setPath(result);
            setPlayPath(result);
            setIsRecording(true);
            audioRecorderPlayer.addRecordBackListener((e) => {
                // setRecordingTime(e.currentPosition)
                setRecordingTime(audioRecorderPlayer.mmssss(
                    Math.floor(e.currentPosition),
                ))
                setDuration(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            });
        }catch (e){
            console.log(e);
            console.log("unable to record");
        }

    };

    const onStopRecord = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            setConfirmationWindow(true);
            setRecordings(result);
            audioRecorderPlayer.removeRecordBackListener();
            setRecordingTime(0);
            console.log(result);
        }catch(e){
            console.log(e)
        }
    };

    const onStartPlay = async () => {
        console.log('onStartPlay');
        setPausedPlay(!pausedPlay);
        const msg = await audioRecorderPlayer.startPlayer(playPath);
        audioRecorderPlayer.addPlayBackListener(e => {
            setCurrentPositionSec(e.currentPosition);
            setCurrentDurationSec(e.duration);
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
            if (e.currentPosition === e.duration) {
                onStopPlay();
            }
        });
        // audioRecorderPlayer.addPlayBackListener();
        console.log(msg);
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        await audioRecorderPlayer.stopPlayer();
        setPausedPlay(true);
        setCurrentPositionSec(0);
        setPlayTime(0)
        audioRecorderPlayer.removePlayBackListener();
    };

    const saveMessage = async () => {
        console.log(musicData.traceId);
        console.log("jwtToken" + jwtToken);
        console.log("comment = " + newComment);
        try{
            var requestBody = {
                "type": "TEXT",
                "traceId": musicData.traceId,
                "comment": newComment,
            }
            let response = await fetch("https://comp90018-mobile-computing.herokuapp.com/trace/addComment",
                {
                    headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
                    method: 'POST',
                    body: JSON.stringify(requestBody)
                })
            setNewComment("");
            console.log(musicData)
            let res = await  response.json()
            let updateMusicData = {...musicData};
            updateMusicData.comments = res.trace.comments
            setMusicData(updateMusicData);
            console.log(updateMusicData);

        }catch{
            console.log("error can't save to backend")
        }

    }

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
        setPausedPlay(true);
    };

    const onPlayComment = async (trackUrl) => {
        setPlayPath(trackUrl);
        await onStartPlay();
    }

    const saveVoiceComment = async () => {
        console.log("saving Voice Comment in path :" + path);
        setConfirmationWindow(false);
        const reference = storage().ref(pathToRecord);
        await reference.putFile(pathToRecord);
        let savedUrl = await reference.getDownloadURL();
        console.log(savedUrl)
        try{
            console.log("in try")
            let requestBody = {
                "type": "AUDIO",
                "traceId": musicData.traceId,
                "comment": savedUrl,
            }
            let response = await fetch("https://comp90018-mobile-computing.herokuapp.com/trace/addComment",
                {
                    headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + jwtToken },
                    method: 'POST',
                    body: JSON.stringify(requestBody)
                })
            console.log(musicData)
            let res = await  response.json()
            let updateMusicData = {...musicData};
            updateMusicData.comments = res.trace.comments
            setMusicData(updateMusicData);
            console.log(updateMusicData);

        }catch{
            console.log("error can't save to backend")
        }
    }
    return (
        <View >
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmationWindow}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setConfirmationWindow(!confirmationWindow);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{width:200}}>
                            <View style={styles.audioPlayerContainer}>
                                { !pausedPlay ? (
                                    <TouchableOpacity onPress={onPausePlay}>
                                        <Image source={require('../../assets/imgs/video-pause-button.png')}></Image>
                                    </TouchableOpacity>
                                    // <Button title={'Pause'} onPress={onPausePlay} >Pause</Button>
                                ) : (
                                    <TouchableOpacity onPress={onStartPlay}>
                                        <Image source={require('../../assets/imgs/play.png')}></Image>
                                    </TouchableOpacity>
                                    // <Button title={'Start'} onPress={onStartPlay} >Start</Button>
                                )}
                                <View style={styles.progressIndicatorContainer}>
                                    <View
                                        style={[
                                            styles.progressLine,
                                            {
                                                width: `${(currentPositionSec / currentDurationSec) * 100}%`,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={styles.progressDetailsContainer}>
                                <Text style={styles.progressDetailsText}>Progress: {playTime}</Text>
                                <Text style={styles.progressDetailsText}>Duration: {duration}</Text>
                            </View>
                        </View>
                        <View style ={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={saveVoiceComment}
                            >
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setConfirmationWindow(!confirmationWindow)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{flexDirection:"row"}}>
                <TouchableWithoutFeedback
                    onPressIn={onStartRecord}
                    onPressOut={onStopRecord}
                >
                    <Image style={styles.record_button} source={require('../../assets/imgs/microphone.png')}/>
                </TouchableWithoutFeedback>
                <View style = {{marginLeft:10}}>
                    <Button onPress={(e) => saveMessage(e)} style={styles.addButton}><Text style={{ fontWeight: 'bold', fontSize: 14 }}>Submit Comment</Text></Button>
                </View>
            </View>
            {!isRecording ?
                (
                    <View>
                        <Input variant="underlined" placeholder="Type New Comment" fontSize={14} onChangeText={setNewComment} />
                    </View>
                ) :
                (
                    <View style={styles.flex}>
                        <Text>Recording Voice {recordingTime}</Text>
                    </View>
                )
            }
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginVertical: 3 }}>Comments</Text>
                <View style={{ marginTop: 5 , backgroundColor: "#f0f0f0"}}>
                    <FlatList
                        data={musicData.comments}
                        keyExtractor={(item) => item.id + item.timestamp}
                        renderItem={({ item }) => (
                            item.type === "TEXT" ? (
                                <View>
                                    <Text style={{fontWeight: 'bold', marginLeft: 5, fontSize: 14.5 }}>{item.user.name} - {(new Date(item.timestamp)).toDateString()}</Text>
                                    <Text style={{marginLeft: 5, fontSize: 14.5 }}>{item.comment}</Text>
                                </View>
                            ):(
                                <View>
                                    <Text style={{fontWeight: 'bold', marginLeft: 5, fontSize: 14.5 }}>{item.user.name} - {(new Date(item.timestamp)).toDateString()}</Text>
                                    <View style={{width:200}}>
                                        <View style={styles.audioPlayerContainer}>
                                            { !pausedPlay ? (
                                                <TouchableOpacity onPress={onPausePlay}>
                                                    <Image source={require('../../assets/imgs/video-pause-button.png')}></Image>
                                                </TouchableOpacity>
                                                // <Button title={'Pause'} onPress={onPausePlay} >Pause</Button>
                                            ) : (
                                                <TouchableOpacity onPress = {()=>onPlayComment(item.comment)}>
                                                    <Image source={require('../../assets/imgs/play.png')}></Image>
                                                </TouchableOpacity>
                                                // <Button title={'Start'} onPress={onStartPlay} >Start</Button>
                                            )}
                                            <View style={styles.progressIndicatorContainer}>
                                                <View
                                                    style={[
                                                        styles.progressLine,
                                                        {
                                                            width: `${(currentPositionSec / currentDurationSec) * 100}%`,
                                                        },
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.progressDetailsContainer}>
                                            <Text style={styles.progressDetailsText}>Progress: {playTime}</Text>
                                            <Text style={styles.progressDetailsText}>Duration: {duration}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        )
                        }
                    ></FlatList>
                </View>
            </View>
        </View>

    );

}

const styles = StyleSheet.create(
    {
        testButtonStyle: {
            display: "flex",
            flexDirection: "row",
        },
        addButton: {
            backgroundColor: "#e4b1a5",
            display: "flex",
            paddingVertical: 2,
            height: 40,
            justifyContent: "space-between",
            width: 136
        },
        record_button: {
            height:40,
            width:40,
            marginLeft: 5,
            borderRadius: 30,
            borderWidth:1,
            backgroundColor:"#e4b1a5"
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginLeft: 5
        },

        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        audioPlayerContainer: {
            flexDirection: 'row', alignItems: 'center'
        },
        progressIndicatorContainer: {
            marginLeft:3,
            flex: 1,
            backgroundColor: '#e2e2e2',
        },
        progressLine: {
            borderWidth: 1,
            borderColor: 'black',
        },
        progressDetailsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        progressDetailsText: {
            paddingHorizontal: 5,
            color: 'grey',
            fontSize: 10,
        },
        modalButtons :{
            flexDirection: "row",
            marginTop: 10,
        }

    }


)