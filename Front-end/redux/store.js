import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { authSlice } from "./auth/slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
})

const Store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export default Store