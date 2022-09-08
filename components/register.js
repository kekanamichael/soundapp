import { StyleSheet, ImageBackground,  Text, View } from 'react-native'
import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { TextInput } from 'react-native-gesture-handler'
import { Button, TouchableOpacity } from 'react-native-web'
import { useNavigation } from '@react-navigation/native'
import image from '../assets/pexels-donald-tong-189296.jpg'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState()


    const navigation = useNavigation()

    const registerUser = () => {
      createUserWithEmailAndPassword(auth, email, password, name, phone).then((userCredentials) => {
        const user = userCredentials.user
        user.displayName = name
        user.phoneNumber = phone
        navigation.navigate("Login")
        console.log("registerd")
        console.log(user.displayName)
        
      }).catch((error) => {
         console.log(error);
      })
    };

    const haveAccount = () =>{
      navigation.navigate("Login")
    } 

  return (
    <ImageBackground style={styles.bckImage} source={image} resizeMode='cover'>
    <View style={styles.container }>
      
      <View style={styles.form}>
        <TextInput style={styles.input} 
          placeholder='Name' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
       />
        <TextInput style={styles.input} 
          placeholder='Enter Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
       />
        <TextInput style={styles.input} 
          placeholder='Phone Number' 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
       />
        <TextInput style={styles.input} 
          placeholder='Password'  
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          secureTextEntry
        />
          <Button color="orangered" style={{with:"40%"}} title="Sign Up" onPress={registerUser}/><br/>
        <View style={styles.TouchableContainer}>
          <Text style={styles.acc}>Already have an account?  </Text>
          <TouchableOpacity onPress={haveAccount}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
     
      
    </View>
    </ImageBackground>
  )
}

export default Register

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
    padding: 10,
    marginBottom: 30,
  },
  form: {
    padding:50,
    /* backgroundColor: "white", */
    marginTop: 50,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    borderTopWidth: 2,
    borderTopColor: "orangered"
  },
  TouchableContainer: {
    flexDirection: 'row',
    
  },
  login: {
    fontSize: 20,
    color: "skyblue",
  
  },
  acc: {
    fontSize: 20,
    color: "#fff",
    
  }
})