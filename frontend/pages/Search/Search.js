import { FlatList, Input, View   } from "native-base";
import React, { memo, useCallback, useEffect, useState,   } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useSelector } from "react-redux";

  const Search = () => {
  const AccessToken = useSelector((state) => state.auth.accessToken)
  const [key, setKey] = useState("")
  const [result, setResult] = useState([]);

  const chooseSong = () => {
    console.log("test")
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
      <Text>Search Your Music Here</Text>
      <Input onChangeText={(key) => { setKey(key) }}  ></Input>
      <FlatList
        data={key.length > 0 ? result : ""}
        keyExtractor={item => item.tracks.id}
        style={{backgroundColor:"#f0f0f0", zIndex:10}}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={chooseSong}>
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
    zIndex: 10,

  }
})