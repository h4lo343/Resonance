import { FlatList, Input, View, Image } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";

export const Search = () => {
  const AccessToken = useSelector((state) => state.auth.accessToken)
  const [key, setKey] = useState("")
  const [result, setResult] = useState([]);

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
      <Input onChangeText={(key) => { setKey(key) }}></Input>
      <FlatList
        data={key.length > 0 ? result : ""}
        keyExtractor={item => item.tracks.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={{ display: "flex", justifyContent: "flex-start", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 70, height: 70 }} source={{ uri: item.tracks.album.images[0].url }} alt={item.tracks.name} />
              <View>
                <Text style={{fontWeight: 'bold'}}>{item.tracks.name}</Text>
                <Text>{item.artists.name}</Text>
              </View>


            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    backgroudColor: "#121212",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,

  }
})