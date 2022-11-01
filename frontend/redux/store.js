import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authSlice } from "./auth/slice";
import { userProfileSlice } from "./userProfile/slice";
import { nearbyMusicSlice } from "./nearbyMusic/slice";
import { anotherUserProfileSlice } from"./anotherUserProfile/slice";
import { followerSlice } from"./follower/slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userProfile: userProfileSlice.reducer,
  nearbyMusic: nearbyMusicSlice.reducer,
  anotherUserProfile: anotherUserProfileSlice.reducer,
  follower: followerSlice.reducer
})

const Store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export default Store