import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authSlice } from "./auth/slice";
import { userProfileSlice } from "./userProfile/slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userProfile: userProfileSlice.reducer
})

const Store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export default Store