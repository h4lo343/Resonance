import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  musics: [
        {
            "id": "634bed8121f7aeaa54a8015c",
            "sharer": "test",
            "song": {
                "_id": "634423ed5f9d5e2e4c7109da",
                "name": "testSong",
                "songUrl": "tesSongUrl",
                "artist": "testArtist",
                "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
                "__v": 0
            },
            "timestamp": "2022-10-16T11:39:45.315Z",
            "comments": [
                {
                    "id": "634bed9121f7aeaa54a80166",
                    "user": "test0",
                    "timestamp": "2022-10-16T11:40:01.809Z",
                    "comment": "hello world0"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": "test1",
                    "timestamp": "2022-10-16T11:40:01.809Z",
                    "comment": "hello world1"
                }
            ],
            "location": {
                "latitude": 6.5693754,
                "longitude": 103.2656823
            }
        },
        {
            "id": "634bed8121f7aeaa54a80155",
            "sharer": "test2",
            "song": {
                "_id": "634423ed5f9d5e2e4c7109dg",
                "name": "testSong2",
                "songUrl": "tesSongUrl2",
                "artist": "testArtist2",
                "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
                "__v": 0
            },
            "timestamp": "2022-11-16T11:39:45.315Z",
            "comments": [
                {
                    "id": "634bed9121f7aeaa54a80166",
                    "user": "test2",
                    "timestamp": "2022-11-16T11:40:01.809Z",
                    "comment": "hello world2"
                }
            ],
            "location": {
                "latitude": 6.5693754,
                "longitude": 103.2656823
            }
        }
    ]
}

export const getNearbyMusic = createAsyncThunk(
    "nearbyMusic/nearbyMusic",
    async ({data}, thunkAPI) => {
      thunkAPI.dispatch(nearbyMusicSlice.actions.setMusics(data))
    }
  )

export const nearbyMusicSlice = createSlice({
    name: "nearbyMusic",
    initialState,
    reducers: {
        setMusics: (state, actions) => {
              state.musics = actions.payload
          },
      }
  })