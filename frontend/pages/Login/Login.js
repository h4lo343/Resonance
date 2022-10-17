import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, CheckBox, Alert, TouchableOpacity } from 'react-native';
import { Link, Navigate, useNavigate } from 'react-router-native';
import { Box, FormControl, Input, WarningOutlineIcon, Stack, MaterialIcons, Pressable, Icon, Button, Checkbox } from 'native-base';
import { ScaledImage } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { authSlice, getAccessToken} from '../../redux/auth/slice';
import { BACNKEND_LINK } from '@'
 



export const Login = ({navigation}) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const jwtToken = useSelector((state) => state.auth.jwtToken)
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const inputUserCode = (v) => {
    setUserCode(v)
  }
  const inputPassword = (v) => {
    setPassword(v)
  }
  useEffect(()=> {
    // console.log(env.BACNKEND_LINK)
  },[])
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
    if (code!=201) {
      Alert.alert(
        "Login Failed",
         result.msg,
      );
    }
    else{
      dispatch(authSlice.actions.setJwtToken(result.Authorization))
      dispatch(getAccessToken())
      Navigate('/search')
       
    }
  }
   
  
   
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Trace</Text>
      <Text style={styles.banner}>Hi!</Text>
      <Text style={styles.banner}>Welcome</Text>
      <Text>Every Where Leave a Trace</Text>


      <Box alignItems="center" style={styles.inputBox}>
        <Input variant="underlined" placeholder="Username, Email or Phone Number" fontSize={14} onChangeText={inputUserCode} />
        <Input variant='underlined'
          placeholder='password'
          type={show ? "text" : "password"}
          fontSize={14}
          onChangeText={inputPassword}
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
              {show ? "Hide" : "Show"}
            </Button >
          }
        />
      </Box>

      <View style={{ marginTop: 30, justifyContent: "space-between", flexDirection: "row" }}>
        <Checkbox value="two"><Text style={{ fontSize: 14 }}>Remember Me</Text></Checkbox>
        {/* <Link to='/reset' underlayColor="#f0f4f7" ><Text>Forgot Password?</Text></Link> */}
        <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Box alignItems="center" style={{ marginTop: 40 }}>
      
        <Button style={styles.loginSpotify} onPress={signIn}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 20 }}>Log In With</Text>
            <Image style={{ width: 80, resizeMode: "contain", right: -10 }} source={require('../../assets/imgs/spotify.jpg')} />
          </View>
        </Button>
      </Box>

      <Box alignItems={"center"} style={{ bottom: -100 }} flexDirection="row" justifyContent={"center"}>
        <Text>Don't have an account?</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity> */}
        <Link to="/register" underlayColor="#f0f4f7" ><Text style={{ color: "black" }}>  Sign in</Text></Link>
        <Link to="/MapViewPage" underlayColor="#f0f4f7" ><Text style={{ color: "black" }}>  Map View</Text></Link>
      </Box>

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
    marginTop: 90
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