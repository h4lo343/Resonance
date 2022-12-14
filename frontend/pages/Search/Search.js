import { FlatList, View, Input } from "native-base";
import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, Alert, TextInput, TouchableWithoutFeedback, ScrollView, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

/**
 * This is the search bar displayed when user clicks Leave Trace
 */
const Search = ({ longitude, latitude, finished }) => {
  const AccessToken = useSelector((state) => state.auth.accessToken)
  const jwtToken = useSelector((s) => s.auth.jwtToken)
  const [key, setKey] = useState("")
  const [searchMusicHeight, setSearchMusicHeight] = useState(0)
  const [result, setResult] = useState([]);

  const searchHeightStyle = function() {
    return {
      height: searchMusicHeight,
      width: 260
    }
  }

  const chooseSong = (e) => {
    Alert.alert(
      "Confirm",
      `Are you sure to leave the song: ${e.tracks.name} here?`,
      [
        {
          text: "yes",
          onPress: () => sendTrace(e)
        },
        {
          text: "no"
        }
      ]
    )

  }

  /**
   * Send user selected music trace to backend
   */
  const sendTrace = async (e) => {
    setKey("")
    const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/trace/addTrace", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        song: {
          name: e.tracks.name,
          songUrl: e.tracks.external_urls.spotify,
          artist: e.artists.name,
          songImageUrl: e.tracks.album.images[0].url
        },
        location: {
          latitude: longitude,
          longitude: latitude
        }
      })
    })
    const result = await response.json()
    console.log(result);
    if (response.status == 201) {
      Alert.alert(
        "Share Successful",
        "Your music trace has been recorded"
      );
      finished(true)
    }
    else {

      Alert.alert(
        "Share Failed",
        result.message
      );

    }
  }
  const getResult = useCallback(async () => {

    const url = `https://api.spotify.com/v1/search?q=${key}&type=track,artist`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          'Content-type': 'application/json',
        },
      })
      const result = await response.json();
      const resultArray = result.tracks.items.map((item, index) => {
        return { tracks: item, artists: result.artists.items[index] }
      })
      setResult(resultArray)
    } catch (e) {
      console.log(e)
    }

  }, [key])

  useEffect(() => {
    getResult()
  }, [getResult])

  return (
    <View >
      <TextInput
        style={{ backgroundColor: "white", width: 300 }}
        onChangeText={(key) => { setKey(key);
          if (key.length == 0) {
            setSearchMusicHeight(0);
          } else {
            setSearchMusicHeight(320);
          }

        }}
        placeholder="search your song"
        value={key}
      >
      </TextInput>
      <View style={searchHeightStyle()}>
        <FlatList
          data={key.length > 0 ? result : ""}
          keyExtractor={item => item.tracks.id}
          style={{ backgroundColor: 'rgba(255,255,255, 0.8)', zIndex: 10, width: "115%" }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => chooseSong(item)} >
              <View style={{ display: "flex", justifyContent: "flex-start", flexWrap: "nowrap", flexDirection: "row", alignItems: "center", paddingTop: 2 }}>
                <Image style={{ width: 70, height: 70 }} resizeMode="contain" source={{ uri: item.tracks.album.images[0].url }} alt={item.tracks.name} />
                <View style={{marginLeft: 10}}>
                  <Text style={{ fontWeight: 'bold' }}>{item.tracks.name}</Text>
                  {item.artists ? <Text>{item.artists.name}</Text> : <></>}
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  )
}

export default memo(Search)

const style = StyleSheet.create({
  header: {
    backgroudColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },

})
