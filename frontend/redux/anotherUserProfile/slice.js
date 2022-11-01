import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Image } from 'react-native';

const initialState = {
    userId: "",
    username: "UserA",
    avatarType: "",
    avatarUri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
    avatarBase64: "",
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

export const getAnotherUserProfile = createAsyncThunk(
    "anotherUserProfile/getAnotherUserProfile",
    async ({ data }, thunkAPI) => {
        console.log("data.userId: " + data.userId);
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setUserId(data.userId))
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setMusicList(data.musicList))
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setAvatarUri(data.uri))
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setUsername(data.username))
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setAvatarType(data.type))
        thunkAPI.dispatch(anotherUserProfileSlice.actions.setAvatarBase64(data.base64))
    }
)

export const anotherUserProfileSlice = createSlice({
    name: "anotherUserProfile",
    initialState,
    reducers: {
        setUserId: (state, actions) => {
            state.userId = actions.payload
        },
        setUsername: (state, actions) => {
            state.username = actions.payload
        },
        setAvatarType: (state, actions) => {
            state.avatarType = actions.payload
        },
        setAvatarUri: (state, actions) => {
            state.avatarUri = actions.payload
        },
        setAvatarBase64: (state, actions) => {
            state.avatarBase64 = actions.payload
        },
        setMusicList: (state, actions) => {
            state.musicList = actions.payload
        },
    }
})