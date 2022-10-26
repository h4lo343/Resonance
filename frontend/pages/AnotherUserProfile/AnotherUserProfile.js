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

            <View style={styles.musicListHeader}>
                <Text style={{fontSize: 16, color: '#795C34'}}>Music Lists:</Text>
            </View>

            <View style={{ marginLeft: 70, marginTop: 10, height: 200, width: 310}}>
                <FlatList
                    data={musicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listStyle}>
                            <Image style={{ width: 70, height: 70, marginBottom: 5 }} resizeMode="contain" source={{ uri: item.song.songImageUrl }} alt={item.song.name} />
                            <View style={{marginLeft: 15}}>
                                <Text style={{fontWeight: 'bold'}}>Song: {item.song.name}</Text>
                                <Text>Artist: {item.song.artist}</Text>
                                <Text style={styles.link} onPress={() => { Linking.openURL(item.song.songUrl) }}>music spotify link</Text>
                            </View>
                        </View>
                    )
                    }
                ></FlatList>
            </View>

            <Box alignItems="center" style={{ marginTop: 20 }}>
                <Button onPress={(e) => backToMap(e)} style={{backgroundColor: "#e4b1a5"}}><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Back To Map</Text></Button>
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
    userrow: {
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center'
    },
    musicListHeader: {
        backgroundColor: "#cad5d8",
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center',
        paddingBottom: 5,
    },
    userDataFont: {
        fontSize: 16,
        color: '#795C34',
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