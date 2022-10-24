import { FlatList,   View, Input  } from "native-base";
import React, { memo, useCallback, useEffect, useState   } from "react";
import { StyleSheet, TouchableOpacity, Text, Image, Alert, TextInput } from "react-native";
import { useSelector } from "react-redux";

  const Search = ({longitude, latitude, finished}) => {
  const AccessToken = useSelector((state) => state.auth.accessToken)
  const jwtToken = useSelector( (s) => s.auth.jwtToken)
  const [key, setKey] = useState("")
  const [result, setResult] = useState([]);

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

  const sendTrace = async  (e) => {
    setKey("")
    const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/trace/addTrace", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        song : {
          name: e.tracks.name,
          songUrl: e.tracks.external_urls.spotify,
          artist: e.artists.name,
          songImageUrl: e.tracks.album.images[0].url
        },
        location: {
          latitude,
          longitude
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
    <View style={style.header}>
      <TextInput
        style={{backgroundColor:"white", width:300}}
        onChangeText={(key) => { setKey(key) }}
        placeholder="search your song"
        value={key}
      >
      </TextInput>
      <FlatList
        data={key.length > 0 ? result : ""}
        keyExtractor={item => item.tracks.id}
        style={{backgroundColor:"#f0f0f0", zIndex:10, width:"115%"}}
        renderItem={({ item }) => (
          <TouchableOpacity  onPress={()=> chooseSong(item)} >
            <View style={{ display: "flex", justifyContent: "flex-start", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 70, height: 70 }}  resizeMode="contain"  source={{uri: item.tracks.album.images[0].url}} alt={item.tracks.name} />
              <View>
                <Text style={{fontWeight: 'bold'}}>{item.tracks.name}</Text>
                { item.artists? <Text>{item.artists.name}</Text> : <></> }
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
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
