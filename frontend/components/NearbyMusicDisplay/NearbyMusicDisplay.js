import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Box, Input, Button } from 'native-base'
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
        <View style={styles.footer}>
          <Text style={styles.headerText}>This is Half Modal</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {setVisibility.setVisibility(false);}}>
          <Text style={styles.addButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    height: '30%',
    marginTop: 'auto',
    backgroundColor: 'white'
  },
})