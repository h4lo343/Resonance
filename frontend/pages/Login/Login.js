import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, CheckBox, Alert, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Box, Input, Button, Checkbox } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { authSlice, getAccessToken } from '../../redux/auth/slice';
import { anotherUserProfileSlice } from '../../redux/anotherUserProfile/slice'
import { followerSlice} from '../../redux/follower/slice'
import { nearbyMusicSlice } from '../../redux/nearbyMusic/slice'
import { userProfileSlice } from '../../redux/userProfile/slice'
import ImageOverlay from "react-native-image-overlay";


/**
 * This function receives an navigation input, allows user to go to other pages
 * and come back to the previous page
 * It also handles the useState of user to authorise user login
 * @param {navigation} param0
 * @returns jsx view of the page
 */

export const Login = ({ navigation }) => {
  // define variables
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const jwtToken = useSelector((state) => state.auth.jwtToken)
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const codeInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    // state change
    dispatch(authSlice.actions.initToken())
    dispatch(userProfileSlice.actions.cleanUp())
    dispatch(anotherUserProfileSlice.actions.cleanUp())
    dispatch(followerSlice.actions.cleanUp())
    dispatch(nearbyMusicSlice.actions.cleanUp())
    passwordInput.current.clear()
    codeInput.current.clear()
  }, [])

  // get username and password
  const inputUserCode = (v) => {
    setUserCode(v)
  }
  const inputPassword = (v) => {
    setPassword(v)
  }

  // handle show button and signin
  useEffect(() => {
  }, [])
  const handleClick = () => setShow(!show);
  const signIn = async () => {
    const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/auth/login/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userCode,
        password: password
      })
    })
    const code = response.status
    const result = await response.json()
    if (code != 201) {
      Alert.alert(
        "Login Failed",
        result.msg,
      );
    }
    else {
      dispatch(authSlice.actions.setJwtToken(result.Authorization))
      dispatch(getAccessToken())
      navigation.navigate('DrawerNavigator')

    }
  }


  // return a page view
  return (
    // setup a style container
    <View>
      <View style={styles.container}>
        <Text style={styles.brand}>Resonance</Text>
        <Text style={styles.banner}>Hi!</Text>
        <Text style={styles.banner}>Welcome</Text>
        <Text>Share Your Music Trace :D</Text>

        <Box alignItems="center" style={styles.inputBox}>
          <Input variant="underlined" placeholder="Email" ref = { codeInput } fontSize={14} onChangeText={inputUserCode} />
          <Input variant='underlined'
            placeholder='password'
            type={show ? "text" : "password"}
            fontSize={14}
            ref = { passwordInput }
            onChangeText={inputPassword}
            InputRightElement={
              <Button size="xs" rounded="none" w="1/6" h="full" style={{backgroundColor: '#40B5AD'}}  onPress={handleClick}>
                {show ? "Hide" : "Show"}
              </Button >
            }
          />
        </Box>

        <View style={{ marginTop: 30, justifyContent: "space-between", flexDirection: "row" }}>
          <Checkbox value="two"><Text style={{ fontSize: 14 }}>Remember Me</Text></Checkbox>
          <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
            {/* <Text>Forgot Password?</Text> */}
          </TouchableOpacity>
        </View>

        <Box alignItems="center" style={{ marginTop: 30 }}>

          <Button style={styles.loginSpotify} onPress={signIn}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20 }}>Log In With</Text>
              <Image style={{ width: 80, resizeMode: "contain", right: -10 }} source={require('../../assets/imgs/spotify.jpg')} />
            </View>
          </Button>
        </Box>

        <Box alignItems={"center"} style={{ bottom: -40, marginBottom: 50 }} flexDirection="row" justifyContent={"center"}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: "black" }}> Sign up</Text>
          </TouchableOpacity>
        </Box>

      </View>
      <ImageOverlay
        source={{ uri: Image.resolveAssetSource(require('../../assets/imgs/follower_page.jpg')).uri }}
        height={210}
        overlayAlpha={0}
        contentPosition="bottom">
      </ImageOverlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  banner: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#59371c'
  },
  inputBox: {
    marginTop: 50
  },
  brand: {
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: "#e4b1a5",
    width: "100%",
  },
  loginSpotify: {
    width: "100%",
    backgroundColor: "#343341",
    height: 50
  }

})
