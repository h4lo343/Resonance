import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel'
import { CarouselCards } from '../../components/CarouselCards';

export const NearbyMusicDisplay = (setVisibility) => {
  const nearbyMusics = useSelector((state) => state.nearbyMusic.musics);
  const deviceWidth = Dimensions.get("window").width;

  const renderCarouselCards = ({ item, index }) => {
    return <CarouselCards data={index} />
  }

  return (
    <KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          console.log("onRequestClose")
          setVisibility.setVisibility(false)
        }}>
        <View style={styles.cardStyle}>
          <View style={styles.headDisplayStyle}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nearby Musics</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => { setVisibility.setVisibility(false); }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Close</Text>
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
    paddingHorizontal: 5
  },
})