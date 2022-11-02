import { NativeBaseProvider } from "native-base";
import React from "react";
import { NativeRouter, } from "react-router-native";
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
