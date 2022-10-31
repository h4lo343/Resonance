import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  musics: [
        {
            "id": "635e7a15bea2205814f2346c",
            "sharer": {
                "id": "63564f921ba6d1ff21217914",
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
            "timestamp": "2022-10-16T11:39:45.315Z",
            "comments": [
                {
                    "id": "634bed9121f7aeaa54a80166",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "AUDIO",
                    "timestamp": "2022-10-16T11:40:01.809Z",
                    "comment": "https://firebasestorage.googleapis.com/v0/b/dev-voice-364306.appspot.com/o/file%3A%2Fdata%2Fuser%2F0%2Fcom.yourmusic%2Fcache%2F6820454a-5a4a-4927-b7a3-85ecd64b3a00.mp4?alt=media&token=ac891e3a-b1e6-4a55-91c8-00865125cc3a"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-16T11:40:01.809Z",
                    "comment": "hello world1"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-17T11:40:01.809Z",
                    "comment": "sajlfkdsjkfjaslkdjfkdlfj;kdsajfldkjasl;kdjfl;kadsjl;fkdja;fkdlj;fkladfj;dkla;jfalk;jfakldfj;adlkfakjds;klfjdlkasjfl;dksf"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-18T11:40:01.809Z",
                    "comment": "sajlfkdsjkfjaslkdjfkdlfj;kdsajfldkjasl;kdjfl;kadsjl;fkdja;fkdlj;fkladfj;dkla;jfalk;jfakldfj;adlkfakjds;klfjdlkasjfl;dksf"
                }
            ],
            "location": {
                "latitude": 6.5693754,
                "longitude": 103.2656823
            }
        },
        {
            "id": "634bed8121f7aeaa54a80155",
            "sharer": {
                "id": "63564f921ba6d1ff21217915",
                "username": "test2"
            },
            "song": {
                "_id": "634423ed5f9d5e2e4c7109dg",
                "name": "testSong2",
                "songUrl": "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
                "artist": "testArtist2",
                "songImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png",
                "__v": 0
            },
            "timestamp": "2022-11-16T11:39:45.315Z",
            "comments": [
                {
                    "id": "634bed9121f7aeaa54a80166",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-11-16T11:40:01.809Z",
                    "comment": "hello world2"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-16T11:40:01.809Z",
                    "comment": "hello world1"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-17T11:40:01.809Z",
                    "comment": "sajlfkdsjkfjaslkdjfkdlfj;kdsajfldkjasl;kdjfl;kadsjl;fkdja;fkdlj;fkladfj;dkla;jfalk;jfakldfj;adlkfakjds;klfjdlkasjfl;dksf"
                },
                {
                    "id": "634bed9121f7aeaa54a80168",
                    "user": {
                        "id":"635be9d54c46cb8bfab2bf4f",
                        "name": "test0",
                    },
                    "type": "TEXT",
                    "timestamp": "2022-10-18T11:40:01.809Z",
                    "comment": "sajlfkdsjkfjaslkdjfkdlfj;kdsajfldkjasl;kdjfl;kadsjl;fkdja;fkdlj;fkladfj;dkla;jfalk;jfakldfj;adlkfakjds;klfjdlkasjfl;dksf"
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
              state.musics = actions.payload;
          },
      }
  })