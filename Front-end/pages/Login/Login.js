import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, CheckBox } from 'react-native';
import { Link } from 'react-router-native';
import { Box, FormControl, Input, WarningOutlineIcon, Stack, MaterialIcons, Pressable, Icon, Button, Checkbox } from 'native-base';
import { ScaledImage } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { authSlice, getAccessToken} from '../../redux/auth/slice';



export const Login = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken)
  const [show, setShow] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const inputUserCode = (v) => {
    setUserCode(v)
  }
  const inputPassword = (v) => {
    setPassword(v)
  }
  useEffect(()=> {
  },[])
  const handleClick = () => setShow(!show);
  const signIn =  () => {
    dispatch(getAccessToken())
    
    
    // console.log(userCode + " " + password)
    // try {
    //   const response = await fetch("http://localhost:8888/auth/register",
    //     {
    //       method: 'POST',
    //       body: JSON.stringify(
    //         {
    //           authenticationMethod: userCode,
    //           password: password
    //         }
    //       )
    //     }
    //   )
    //   const result = await response.json()
    //   console.log(result)  
    // } catch (error) {
    //   console.error(error)
    // }
  }
  return (
    <View>
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
        <Link to='/reset' underlayColor="#f0f4f7" ><Text>Forgot Password?</Text></Link>
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
        <Link to="/register" underlayColor="#f0f4f7" ><Text style={{ color: "black" }}>  Sign in</Text></Link>
      </Box>

    </View>
  )
}

const styles = StyleSheet.create({
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