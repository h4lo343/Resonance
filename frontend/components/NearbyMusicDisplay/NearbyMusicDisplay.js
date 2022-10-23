import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Box, Input, Button } from 'native-base'
export const NearbyMusicDisplay = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        this.setShowModal(false)
      }}>
      <View
        style={{
          height: '30%',
          marginTop: 'auto',
          backgroundColor: 'blue'
        }}>
        <View style={styles.footer}>
          <Text style={styles.headerText}>This is Half Modal</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {setShowModal(false);}}>
          <Text style={styles.addButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
})