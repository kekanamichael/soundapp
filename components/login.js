import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import {auth} from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler'
import { Button, TouchableOpacity } from 'react-native-web'
import image from '../assets/pexels-donald-tong-189296.jpg'

const Login = () => {

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

      const navigation = useNavigation()

      const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
           navigation.navigate("Profile")
           console.log('User signed in')
        }).catch((err) => {
            console.log(err);
        }) 
      }

      const haveAccount = () =>{
        navigation.navigate("Register")
      }
      
  
  return (
    <ImageBackground style={styles.bckImage} source={image} resizeMode='cover'>
    <View style={styles.container }>
      <View style={styles.form}>
        <TextInput style={styles.input} 
          placeholder='Enter Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
       />
        <TextInput style={styles.input} 
          placeholder='Password'  
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          secureTextEntry
        />
        <Button color="orangered" style={{with:"40%"}} title="Login" onPress={loginUser}/><br/>
        <View style={styles.TouchableContainer}>
          <Text style={styles.acc}>Don't Have an Account? </Text>
          <TouchableOpacity color="orangered"  
            style={{with:"40%"}}  
            onPress={haveAccount}
          >
            <Text style={styles.login}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  bckImage:{
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width:"100%"
  },
  input:{
    width: "100%",
    backgroundColor: "#eee",
    padding: 15,
    marginBottom: 40,
  },
  form: {
    padding:50,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    marginTop: 100,
    borderTopWidth: 2,
    borderTopColor: "orangered"
  },
  TouchableContainer: {
    flexDirection: 'row'
  },
  login: {
    fontSize: 18,
    color: "skyblue"
  },
  acc: {
    fontSize: 18,
    color: "#fff"
  }
})