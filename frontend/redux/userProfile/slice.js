import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Image } from 'react-native';

const initialState = {
  username: "",
  fullName: "",
  avatarType: "",
  avatarUri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
  musicList: [
    {
      "id": "635656b49de315afa9caf0e9",
      "sharer": {
        "id": "634414f7505472f68e36ab33",
        "username": "test"
      },
      "song": {
        "_id": "634423ed5f9d5e2e4c7109da",
        "name": "testSong",
        "songUrl": "https://open.spotify.com/",
        "artist": "testArtist",
        "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
        "__v": 0
      },
      "timestamp": "2022-10-24T09:11:16.934Z",
      "comments": [],
      "location": {
        "latitude": 6.5693754,
        "longitude": 103.2656823
      }
    },
    {
      "id": "635656b49de315afa9caf010",
      "sharer": {
        "id": "634414f7505472f68e36ab33",
        "username": "test"
      },
      "song": {
        "_id": "634423ed5f9d5e2e4c7109da",
        "name": "testSong0",
        "songUrl": "https://open.spotify.com/",
        "artist": "testArtist",
        "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
        "__v": 0
      },
      "timestamp": "2022-10-24T09:11:16.934Z",
      "comments": [],
      "location": {
        "latitude": 6.5693754,
        "longitude": 103.2656823
      }
    },
    {
      "id": "635656b49de315afa9caf011",
      "sharer": {
        "id": "634414f7505472f68e36ab33",
        "username": "test"
      },
      "song": {
        "_id": "634423ed5f9d5e2e4c7109da",
        "name": "testSong1",
        "songUrl": "https://open.spotify.com/",
        "artist": "testArtist",
        "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
        "__v": 0
      },
      "timestamp": "2022-10-24T09:11:16.934Z",
      "comments": [],
      "location": {
        "latitude": 6.5693754,
        "longitude": 103.2656823
      }
    },
    {
      "id": "635656b49de315afa9caf012",
      "sharer": {
        "id": "634414f7505472f68e36ab33",
        "username": "test"
      },
      "song": {
        "_id": "634423ed5f9d5e2e4c7109da",
        "name": "testSong2",
        "songUrl": "https://open.spotify.com/",
        "artist": "testArtist",
        "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
        "__v": 0
      },
      "timestamp": "2022-10-24T09:11:16.934Z",
      "comments": [],
      "location": {
        "latitude": 6.5693754,
        "longitude": 103.2656823
      }
    },
    {
      "id": "635656b49de315afa9caf014",
      "sharer": {
        "id": "634414f7505472f68e36ab33",
        "username": "test"
      },
      "song": {
        "_id": "634423ed5f9d5e2e4c7109da",
        "name": "testSong4",
        "songUrl": "https://open.spotify.com/",
        "artist": "testArtist",
        "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
        "__v": 0
      },
      "timestamp": "2022-10-24T09:11:16.934Z",
      "comments": [],
      "location": {
        "latitude": 6.5693754,
        "longitude": 103.2656823
      }
    }
  ]
}

export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async ({ data }, thunkAPI) => {
    thunkAPI.dispatch(userProfileSlice.actions.setMusicList(data.musicList))
    thunkAPI.dispatch(userProfileSlice.actions.setAvatarUri(data.uri))
    thunkAPI.dispatch(userProfileSlice.actions.setUsername(data.username))
    thunkAPI.dispatch(userProfileSlice.actions.setFullName(data.fullName))
    thunkAPI.dispatch(userProfileSlice.actions.setAvatarType(data.type))
  }
)

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUsername: (state, actions) => {
      state.username = actions.payload
    },
    setFullName: (state, actions) => {
      state.fullName = actions.payload
    },
    setAvatarType: (state, actions) => {
      state.avatarType = actions.payload
    },
    setAvatarUri: (state, actions) => {
      state.avatarUri = actions.payload
    },
    setMusicList: (state, actions) => {
      state.musicList = actions.payload
  },
  }
})