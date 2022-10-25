import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Input, Button, FlatList } from 'native-base'

export const CarouselCards = (index) => {
    const [newComment, setNewComment] = useState('');
    const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
    const [musicData, setMusicData] = useState({});

    useEffect(() => {
        console.log("useEffect")
        nearbyMusics.map((nearbyMusic, currentIndex) => {
            // console.log("currentIndex: " + currentIndex + " | index: " + index);
            if (index.data == currentIndex) {
                var nearbyMusic = nearbyMusics[index.data];
                var songImageUri = nearbyMusic.song.songImageUrl;
                var songSharer = nearbyMusic.sharer;
                var sharerId = nearbyMusic.id;
                var songName = nearbyMusic.song.name;
                var songArtist = nearbyMusic.song.artist;
                var songUrl = nearbyMusic.song.songUrl;
                var comments = nearbyMusic.comments;
                var timestamp = nearbyMusic.timestamp;
                setMusicData({
                    songImageUri: songImageUri,
                    songSharer: songSharer,
                    sharerId: sharerId,
                    songName: songName,
                    songArtist: songArtist,
                    songUrl: songUrl,
                    comments: comments,
                    timestamp: timestamp
                })
            }
        })
    }, [musicData])

    const add = () => {
        // can save comment here
    }

    return (
        <View>
            <View>
                <View style={styles.displayStyle}>
                    <Image style={{ width: 70, height: 70 }} resizeMode="contain" source={{ uri: musicData.songImageUri }} alt={musicData.songName} />
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>sharer: {musicData.songSharer}</Text>
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
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 30,
        justifyContent: 'center'
    },
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
    }

})