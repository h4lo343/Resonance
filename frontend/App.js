import { NativeBaseProvider } from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeRouter, Route, Link, Navigate, Routes,   } from "react-router-native";
import { Login, PasswordReset, Register,  MapViewPage, UserProfile, EditProfile } from "./pages";
import Search from "./pages/Search/Search";
import { Map } from "./pages/Main/Map/Map";
import { Provider } from "react-redux";
import Store from "./redux/store";
import StackNavigator from "./pages/Navigation/StackNavigator";
import { NavigationContainer } from '@react-navigation/native';



const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NativeRouter>

          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          
        </NativeRouter>
      </NativeBaseProvider>
    </Provider>


  );
};

export default App;

 