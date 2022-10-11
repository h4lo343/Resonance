import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Image } from 'react-native';

const initialState = {
  username: "",
  fullName: "",
  avatarType: "",
  avatarUri: Image.resolveAssetSource(require('../../assets/imgs/robot_avatar.png')).uri,
  avatarBase64: ""
}

export const getUserProfile = createAsyncThunk(
    "userProfile/getUserProfile",
    async ({data}, thunkAPI) => {
      thunkAPI.dispatch(userProfileSlice.actions.setAvatarUri(data.uri))
      thunkAPI.dispatch(userProfileSlice.actions.setUsername(data.username))
      thunkAPI.dispatch(userProfileSlice.actions.setFullName(data.fullName))
      thunkAPI.dispatch(userProfileSlice.actions.setAvatarType(data.type))
      thunkAPI.dispatch(userProfileSlice.actions.setAvatarBase64(data.base64))
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
        setAvatarBase64: (state, actions) => {
          state.avatarBase64 = actions.payload
      },
      }
  })