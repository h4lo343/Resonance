import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 

const initialState = {
  number : 1,
  jwtToken: "",
  accessToken: ""
}

// export const getAccessToken = createAsyncThunk(
//   "auth/getAccessToken",
//   async () => {
//     const authConfig = {
//       clientId: 'a9205c92bf074d49b879dea6bf2ab1de',
//       // optional clien secret
//       // clientSecret: 'client secret',
//       redirectUrl: 'com.yourmusic://oauth/',
//       scopes: ['playlist-modify-public', 'playlist-modify-private'],
//       serviceConfiguration: {
//         authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//         tokenEndpoint: 'https://accounts.spotify.com/api/token',
//       },
//     };
//   }
// )



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
    plus: (state) => {
      state.number+=1
    }

  }
})