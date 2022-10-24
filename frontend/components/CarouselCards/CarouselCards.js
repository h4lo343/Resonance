import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';
import { Box, Input, Button, FlatList } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';

export const CarouselCards = (index) => {
    console.log("--- index3: " + index.data);
    // console.log("--- index: " + Object.entries(index));
    const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);

    var nearbyMusic = nearbyMusics[index.data];
    console.log(`nearby music: ` + Object.entries(nearbyMusic));
    var songImageUri = nearbyMusic.song.songImageUrl;
    console.log(songImageUri);
    var songSharer = nearbyMusic.sharer;
    var sharerId = nearbyMusic.id;
    var songName = nearbyMusic.song.name;
    console.log(songName);
    var songArtist = nearbyMusic.song.artist;
    console.log(songArtist);
    var songUrl = nearbyMusic.song.songUrl;
    console.log(songUrl);
    var comments = nearbyMusic.comments;
    var timestamp = nearbyMusic.timestamp;
    console.log(timestamp);

    const [spinnerEnabled, setSpinnerEnableFlag] = useState(false);


    return (
        // <View style={styles.row}>

        //     <Image source={{uri: nearbyMusics[index.data].song.songImageUrl}} size={50} />
        // </View>

        <View>
            <View style={{ display: "flex", justifyContent: "space-between", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
                <Image style={{ width: 70, height: 70 }} resizeMode="contain" source={{ uri: songImageUri }} alt={songName} />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>sharer: {songSharer}</Text>
                    <Text>{timestamp}</Text>
                    <Text>song:{songName}</Text>
                    <Text>artist: {songArtist}</Text>
                    <Text>{songUrl}</Text>
                </View>
            </View>
            {/* <View style={styles.container}>
                <ScrollView>
                    <View>
                        {comments.map((content) => {
                            return (
                            <View key = {content.id}>
                                <Text style={styles.item}>{content.user} - {content.timestamp}</Text>
                                <Text style={styles.item}>{content.comment}</Text>
                            </View>
                            );
                        })}
                    </View>
                </ScrollView> */}
                <View>
                <ScrollView nestedScrollEnabled={true}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        // style={{ backgroundColor: "#f0f0f0", zIndex: 30 }}
                        renderItem={({ item }) => (
                                <View>
                                    <Text>user - {item.user}</Text>
                                    <Text>Hello - {item.timestamp}</Text>
                                    <Text>{item.comment}</Text>
                                    <Text>fjaioaej sifjoisejafljeasljefalsejfl;asejflasejfl sea efaselkfj
                                        a ejlsjefleijfalesjalesfjsalk fjalskjflsje fjaes;lkfjse;alk fjalsekfj
                                        fj asejfl;ksjflkesjflksajfklajeklajlejflakjeflkjslk;aajf;esalk f
                                         jaslfj;alse kjflsekjfl;sakjfklsaejkflajs;ekfje
                                          jakl;sfj;ealskjflksejlkfja;lesjfse;alfjkes'false eakl;sjf;lkfjse\
                                          jaioaej sifjoisejafljeasljefalsejfl;asejflasejfl sea efaselkfj
                                        a ejlsjefleijfalesjalesfjsalk fjalskjflsje fjaes;lkfjse;alk fjalsekfj
                                        fj asejfl;ksjflkesjflksajfklajeklajlejflakjeflkjslk;aajf;esalk f
                                         jaslfj;alse kjflsekjfl;sakjfklsaejkflajs;ekfje
                                          jakl;sfj;ealskjflksejlkfja;lesjfse;alfjkes'false eakl;sjf;lkfjse\
                                    </Text>
                                </View>
                            )
                        }
                        // renderItem={({ item }) => (
                        //     <View style={{ display: "flex", justifyContent: "flex-start", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
                        //             <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
                        //             <Text>{item.timestamp}</Text>
                        //             <Text>{item.comment}</Text>
                        //     </View>
                        //     <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
                        // )}
                    ></FlatList>
                </ScrollView>

                </View>

            {/* </View> */}
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
    container: {
        padding: 50,
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 15,
        marginTop: 5,
    }
})