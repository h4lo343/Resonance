import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Box, Input, Button, FlatList } from 'native-base'

export const NearbyMusicDisplay = (setVisibility) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setVisibility.setVisibility(false)
      }}>
      <View
        style={styles.viewStyle}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {setVisibility.setVisibility(false);}}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    height: '40%',
    marginTop: 'auto',
    backgroundColor: 'white'
  },
  closeButton: {
    backgroundColor: "#e4b1a5",
    width: "15%",
  },
})