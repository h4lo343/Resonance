import { NativeBaseProvider } from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NativeRouter, Route, Link, Navigate, Routes,   } from "react-router-native";
import { Login, PasswordReset, Register,  MapViewPage} from "./pages";
import { Map } from "./pages/Main/Map/Map";
import { Provider } from "react-redux";
import Store from "./redux/store";



const App = () => {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <NativeRouter>
          <View style={styles.container}>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/reset' element={<PasswordReset />}></Route>
              <Route path='/map' element={<MapViewPage />}></Route>
              <Route path='/' element={<Navigate to='/map'/>}></Route>
            </Routes>
          </View>
        </NativeRouter>
      </NativeBaseProvider>
    </Provider>


  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    margin: 30
  }
})