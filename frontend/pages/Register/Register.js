import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { Box, Input, Button } from 'native-base'
export const Register = ({ navigation }) => {

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleEmail = (text) => {
    setEmail(text)
  }

  const handleFullName = (text) => {
    setFullName(text)
  }

  const handlePassword1 = (text) => {
    setPassword1(text)
  }

  const handleUserName = (text) => {
    setUserName(text)
  }

  const handlePassword2 = (text) => {
    setPassword2(text)
  }

  const register = async () => {
    if (password1!=password2) {
      Alert.alert(
        "Password ",
         "Passwords do not match",
      );
      return;
    }
    const response = await fetch("https://comp90018-mobile-computing.herokuapp.com/auth/register/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password: password1,
        fullName: fullName
      })
    })
    const result = await response.json();
    console.log(response)
      Alert.alert(
        "Register",
         result.msg,
      );
    if (response.status == "201") {
      navigation.navigate("Login")
    }
  }

  const handleClick1 = () => {
    setShow1(!show1)
  }
  const handleClick2 = () => {
    setShow1(!show2)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Resonance</Text>
      <Text style={styles.banner}>Hi!</Text>
      <Text style={styles.banner}>Welcome</Text>
      <Text>Let's create an account :D</Text>

      <Box alignItems="center" style={styles.inputBox}>
        <Input variant="underlined" placeholder="Email" fontSize={14} onChangeText={handleEmail}/>
        <Input variant="underlined" placeholder="Full Name" fontSize={14}  onChangeText={handleFullName}/>
        <Input variant="underlined" placeholder="User Name" fontSize={14}  onChangeText={handleUserName}/>
        <Input variant='underlined'
          placeholder='password'
          type={show1 ? "text" : "password"}
          fontSize={14}
          onChangeText= {handlePassword1}
          InputRightElement={
            <Button  size="xs" rounded="none" w="1/6" h="full" style={{backgroundColor: '#40B5AD'}}  onPress={handleClick1}>
              {show1 ? "Hide" : "Show"}
            </Button>
          }
        />
        <Input variant='underlined'
          placeholder='Repeat Your password'
          type={show2 ? "text" : "password"}
          fontSize={14}
          onChangeText= {handlePassword2}
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" style={{backgroundColor: '#40B5AD'}} onPress={handleClick2}>
              {show2 ? "Hide" : "Show"}
            </Button>
          }
        />
      </Box>

      <Button style={{marginTop:30, backgroundColor: '#40B5AD'}} onPress={register}><Text style={{fontWeight: "bold"}}>Register</Text></Button>
      {/* <Link to="/" underlayColor="#f0f4f7" ><Text>go back</Text></Link> */}

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
  brand: {
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  inputBox: {
    marginTop: 90
  },
})
