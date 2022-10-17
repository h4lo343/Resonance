import { NativeBaseProvider } from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeRouter, Route, Link, Navigate, Routes,   } from "react-router-native";
import { Login, PasswordReset, Register,  MapViewPage, UserProfile, EditProfile } from "./pages";
import Search from "./pages/Search/Search";
import { Map } from "./pages/Main/Map/Map";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from "./pages/Navigation/StackNavigator";
import { NavigationContainer } from '@react-navigation/native';



const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NativeRouter>
          {/* <View  >
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/reset' element={<PasswordReset />}></Route>
              <Route path='/MapViewPage' element={<MapViewPage />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/edit-profile' element={<EditProfile />}></Route>
              <Route path='/user-profile' element={<UserProfile />}></Route>
              <Route path='/' element={<Navigate to='/login'/>}></Route>
            </Routes>
          </View> */}
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </NativeRouter>
      </NativeBaseProvider>
    </Provider>


  );
};

export default App;

 