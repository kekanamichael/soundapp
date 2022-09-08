import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Modal } from 'react-native';
// import { Button } from 'react-native-web';
import React from 'react';
import { Audio } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
/* import Profile from './components/profile'; */
import UserDetails from './components/userDetails';

const Stack = createNativeStackNavigator()

export default function App() {


  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
  {/*     <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rwo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  fill:{
    flex:1,
    margin:50
  },
  button:{
    margin:20,
    color: "teal"
  }
});
 