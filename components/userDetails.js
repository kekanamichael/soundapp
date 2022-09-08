
import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { addDoc, getDocs, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { storage } from '../config/firebase'
import { Button, TextInput } from 'react-native-web'


const UserDetails = () => {
    const collectionRef = collection(db, "Users");

    const [userDetails, setUserDetails] = useState([]);


    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [address1, setAdsress1] = useState('');
    const [address2, setAdsress2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('')
    const [profession, setProfession] = useState('')
    const [gender, setGender] =useState ('')

    const getAllUsers = () => {
        return getDocs(collectionRef);
    }
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const data = await getAllUsers();
        console.log(data.docs)
        setUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const add = (() => {
    
        const userD = {
            firstName:firstName,
            surname:surname,
            age:age,
            address1:address1,
            address2:address2,
            city:city,
            postalCode:postalCode,
            country:country,
            profession:profession,
            gender:gender
        };

     
            addDoc(collectionRef, userD).then(() => {
                alert("added successfully")
            }).catch((err) => {
                console.log(err)
            })
    })
    
  return (
    <View>
      <View style={styles.form}>
      <TextInput style={styles.input} 
          placeholder='First Name' 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Surname' 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Age' 
          value={age} 
          onChange={(e) => setAge(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Address Line 1' 
          value={address1} 
          onChange={(e) => setAdsress1(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Address Line 2' 
          value={address2} 
          onChange={(e) => setAdsress2(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='City Name' 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Postal Code' 
          value={postalCode} 
          onChange={(e) => setPostalCode(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Country' 
          value={country} 
          onChange={(e) => setCountry(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Profession' 
          value={profession} 
          onChange={(e) => setProfession(e.target.value)}
       />
      <TextInput style={styles.input} 
          placeholder='Gender' 
          value={gender} 
          onChange={(e) => setGender(e.target.value)}
       />
       <Button title='Add details' color='orangered' onPress={add}/>
      </View>
      
    </View>
  )
}

export default UserDetails

const styles = StyleSheet.create({})