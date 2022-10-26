import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Box, Button, FlatList } from 'native-base';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-native';

export const AnotherUserProfile = () => {
    const username = useSelector((state) => state.anotherUserProfile.username);
    const musicList = useSelector((state) => state.anotherUserProfile.musicList);
    const avatarUri = useSelector((state) => state.anotherUserProfile.avatarUri);

    const backToMap = () => {
        Navigate("/MapViewPage");
    }
    
    const Navigate = useNavigate();

    return (
        <View >
            <View style={styles.row}>
                <Avatar.Image source={{ uri: avatarUri }} size={100} />
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Username: {username}</Text>
            </View>

            <View style={styles.userrow}>
                <Text style={styles.userDataFont}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 80, marginTop: 10, height: 300, width: 280}}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.displayStyle}>
                            <Image style={{ width: 70, height: 70 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
                            <View>
                                <Text>song:{item.song.name}</Text>
                                <Text>artist: {item.song.artist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(item.song.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    )
                    }
                ></FlatList>
            </View>

            <Box alignItems="center" style={{ marginTop: 20 }}>
                <Button onPress={(e) => backToMap(e)} style={styles.backButtonProfile}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>Back To Map</Text></Button>
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
        marginTop: 20,
        justifyContent: 'center'
    },
    userDataFont: {
        fontSize: 20,
        color: '#795C34',
    },
    backButtonProfile: {
        backgroundColor: "#e4b1a5",
        width: "50%",
    },
    displayStyle: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 30,
    },
    link: {
        color: "#63C5DA",
        textDecorationLine: 'underline',
    },
});