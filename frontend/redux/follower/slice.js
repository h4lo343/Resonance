import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    followedUsers: [],
    musicLists: [],
}

export const updateFollowedUsers = createAsyncThunk(
    "follower/updateFollowedUsers",
    async ({data}, thunkAPI) => {
      var followedUsersList = []
      var musicList = []

      data.forEach(user => {
            followedUsersList.push(user._id);
            musicList.push({
                userId: user._id,
                userFollowed: user.username,
                song: user.trace.song
            });
      });
      thunkAPI.dispatch(followerSlice.actions.setFollowedUsers(followedUsersList))
      thunkAPI.dispatch(followerSlice.actions.setMusicLists(musicList))
    }
  )

export const followerSlice = createSlice({
    name: "follower",
    initialState,
    reducers: {
        setFollowedUsers: (state, actions) => {
            console.log("actions payload users: " + actions.payload);
              state.followedUsers = actions.payload;
          },
          setMusicLists: (state, actions) => {
            console.log("actions payload musics: " + actions.payload[0].userFollowed);
            state.musicLists = actions.payload;
        },
        cleanUp: (state) => {
          state.followedUsers =[]
          state.musicLists=[]
        }
      }
  })