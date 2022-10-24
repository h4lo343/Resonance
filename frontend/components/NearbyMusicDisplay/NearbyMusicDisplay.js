import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity, Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel'
import { Link } from 'react-router-native';
import { Box, Input, Button, FlatList } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';
import { CarouselCards } from '../../components/CarouselCards';

export const NearbyMusicDisplay = (setVisibility) => {
  const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
  const deviceWidth = Dimensions.get("window").width;

  const renderCarouselCards = ({item, index}) => {
    return <CarouselCards data={index}/>
  }

  const [spinnerEnabled, setSpinnerEnableFlag] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setVisibility.setVisibility(false)
      }}>
      <View style={styles.viewStyle}>
        <View style={styles.headStyle}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Nearby Musics</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {setVisibility.setVisibility(false);}}>
            <Text style={{ fontWeight: 'bold', fontSize: 18}}>Close</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Carousel
            ref={(carousel) => {this._carousel = carousel;}}
            data={nearbyMusics}
            renderItem={renderCarouselCards}
            sliderWidth={deviceWidth - 10}
            itemWidth={300}
        />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  headStyle: {
    flexDirection: 'row',
    margin: 15,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: "#cad5d8",
  },
  viewStyle: {
    height: '40%',
    marginTop: 'auto',
    backgroundColor: 'white'
  },
  closeButton: {
    backgroundColor: "#e4b1a5",
    paddingHorizontal: 5
  },
})