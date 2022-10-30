import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Linking} from 'react-native';
import { Callout } from 'react-native-maps';
import { WebView } from 'react-native-webview';


export const MarkerCallOut = ({markerId, songName, songUrl, songAuthor, songVisual}) => {

    return <Callout tooltip>
        <View>
            <View style = {styles.bubble}>
                <View>
                    <WebView style={{ height: 64 , width: 64, backgroundColor: 'transparent'}} source={{uri:songVisual}} />
                </View>
                <View style={styles.songInformation}>
                    <View>
                        <Text style = {styles.songName}>Name: {songName}</Text>
                        <Text style = {styles.songName}>Artist: {songAuthor}</Text>
                    </View>
                </View>
            </View>
            <View style = {styles.arrowBorder}></View> 
            <View style = {styles.arrow}></View> 
            
      
        </View>
    </Callout>
  }

const styles = StyleSheet.create({
        bubble: {
            display: 'flex',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                backgroundColor: '#fff',
                borderRadius: 6,
                borderColor: "#e4b1a5",
                borderWidth: 0.5,
                padding: 15,
                marginLeft: 30,
                width: 250
        },
        songInformation: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginTop: 10,
        },
        songName: {
            fontSize: 16,
            marginBottom: 3
        },
        arrow: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#fff',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -32,
            marginLeft: 30
        },
        arrowBorder: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#e4b1a5',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -0.5,
            marginLeft: 30,
        },
    })

MarkerCallOut.propTypes = {
        // markerId: PropTypes.string.isRequired,
        songName: PropTypes.string.isRequired,
            songVisual: PropTypes.string.isRequired
    }