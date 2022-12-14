import React, { useEffect, useState} from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel'
import { CarouselCards } from '../../components/CarouselCards';

/**
 * This component is rendered for both "music trace" and "nearby music"
 * Props are passed into this component to:
 * - allow this modal to be open/closed
 * - handles navigation requests
 * - distinguish whether this is a "music trace" or "nearby music"
 */
export const NearbyMusicDisplay = ({nearbyMusicProps}) => {
  const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
  const deviceWidth = Dimensions.get("window").width;

  /**
   * As there are multiple music traces or nearby musics, each of them is displayed in a carousel card
   * User can swipte screen left and right to visualize different cards
   */
  const renderCarouselCards = ({ item, index }) => {
    var propsData = {
      index: index,
      navigationCallback: () => {nearbyMusicProps.profileNavigationCallBack()},
      setVisibilityCallBack: () => {nearbyMusicProps.setVisibilityCallBack(false)}
    }
    return <CarouselCards data={propsData} />
  }

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          nearbyMusicProps.setVisibilityCallBack(false)
        }}>
        <View style={styles.cardStyle}>
          <View style={styles.headDisplayStyle}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{nearbyMusicProps.isNearbyMusic? "Nearby Musics": "Music Trace"}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => { nearbyMusicProps.setVisibilityCallBack(false)}}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Close</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              data={nearbyMusics}
              renderItem={renderCarouselCards}
              sliderWidth={deviceWidth - 10}
              itemWidth={320}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({
  headDisplayStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: "#cad5d8",
    flexDirection: 'row',
  },
  cardStyle: {
    height: '55%',
    marginTop: 'auto',
    backgroundColor: 'white'
  },
  closeButton: {
    backgroundColor: "#e4b1a5",
    paddingHorizontal: 5,
    borderRadius: 4
  },
})