import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image ,Dimensions,TouchableOpacity} from 'react-native';
import { Callout } from 'react-native-maps';


export const MarkerCallOut = (props) => {
    // const [source, setSource] = useState({uri: props.uri})
    const markerId = props.markerId 
    const songName = props.songName 
    const songVisual = props.songVisual
    return <Callout tooltip>
        <View>
            <View style = {styles.bubble}>
                <Text style = {styles.songName}>{songName}</Text>
                <Image
                    style = {styles.image}
                    source={{uri: songVisual}}
                    alt={songName} 
                ></Image>
            </View>
            <View style = {styles.arrowBorder}></View> 
            <View style = {styles.arrow}></View> 
            
      
        </View>
    </Callout>
  }

const styles = StyleSheet.create({
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: "#e4b1a5",
        borderWidth: 0.5,
        padding: 15,
        width: 200
    },
    songName: {
        fontSize: 16,
        marginBottom: 2
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#e4b1a5',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    image: {
        width: 50,
        height: 50
    }
})

MarkerCallOut.propTypes = { 
    // markerId: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
    songVisual: PropTypes.string.isRequired
}
