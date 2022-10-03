import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native';
import { Box, Input, Button } from 'native-base'
export const Register = () => {

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleClick1 = () => {
    setShow1(!show1)
  }
  const handleClick2 = () => {
    setShow1(!show2)
  }

  return (
    <View>
      <Text style={styles.brand}>Trace</Text>
      <Text style={styles.banner}>Hi!</Text>
      <Text style={styles.banner}>Welcome</Text>
      <Text>let's Create an Account</Text>

      <Box alignItems="center" style={styles.inputBox}>
        <Input variant="underlined" placeholder="Email or Phone Number" fontSize={14} />
        <Input variant="underlined" placeholder="Full Name" fontSize={14} />
        <Input variant="underlined" placeholder="User Name" fontSize={14} />
        <Input variant='underlined'
          placeholder='password'
          type={show1 ? "text" : "password"}
          fontSize={14}
          InputRightElement={
            <Button  size="xs" rounded="none" w="1/6" h="full" onPress={handleClick1}>
              {show1 ? "Hide" : "Show"}
            </Button>
          }
        />
        <Input variant='underlined'
          placeholder='password'
          type={show2 ? "text" : "password"}
          fontSize={14}
          InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick2}>
              {show2 ? "Hide" : "Show"}
            </Button>
          }
        />
      </Box>

      <Text>This is register page</Text>
      <Link to="/" underlayColor="#f0f4f7" ><Text>go back</Text></Link>
    </View>
  )
}

const styles = StyleSheet.create({
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