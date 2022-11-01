import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {authorize} from 'react-native-app-auth';

const initialState = {

  jwtToken: "",
  accessToken: ""
}

export const getAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (_, thunkAPI) => {
    const authConfig = {
      clientId: 'cb0729c1007c4ded977441685a104735',
      redirectUrl: 'com.yourmusic://oauth/',
      scopes: ['playlist-modify-public'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    }
    const result = await authorize(authConfig)
    thunkAPI.dispatch(authSlice.actions.setAccessToken(result.accessToken))

  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, actions) => {
      state.accessToken = actions.payload
    },
    setJwtToken: (state, actions) => {
      state.jwtToken = actions.payload
    },
    initToken: (state) => {
      state.jwtToken=""
      state.accessToken=""
      console.log("tokens has been emptied");
    }
  }
})
