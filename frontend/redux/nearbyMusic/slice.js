import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  musics: []
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