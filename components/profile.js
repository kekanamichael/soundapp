import { StyleSheet, Image, ImageBackground, Text, FlatList, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getDocs, collection, getDoc, doc} from 'firebase/firestore'
import {db} from '../config/firebase'
import image from '../assets/pexels-donald-tong-189296.jpg'
import { auth } from '../config/firebase'


const Profile = () => {
    const collectionRef = collection(db, "Users");

    const [userDetails, setUserDetails] = useState([]);

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
  return (
    <View style={styles.container }>
        <ImageBackground style={styles.bckImage} source={image} resizeMode='cover'>
            <View style={styles.imgContainer}>
            {/*   <Text style={styles.mail} >{auth.currentUser?.email}</Text> */}
            </View>
        </ImageBackground>
    <FlatList 
        data={userDetails}
        renderItem={({item}) => (
            <View>
                <Text>{item.firstName}</Text>
                <Text>{item.surname}</Text>
                <Text>{item.age}</Text>
                <View style={styles.address}>
                    <Text style={{fontSize:24}}>{item.address1}</Text>
                    <Text>{item.address2}</Text>
                    <Text>{item.city}</Text>
                    <Text>{item.postalCode}</Text>
                    <Text>{item.country}</Text>
                </View>
                <Text>{item.profession}</Text>
                <Text>{item.gender}</Text>
            </View>    
        )}
    />
      
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    bckImage:{
        flex: 2,
        padding:50,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        marginTop: 100,
        borderTopWidth: 2,
        borderTopColor: "orangered"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width:"100%",
    },
    imgContainer:{
        width: "100%",
        height: "30%"
    },
    address: {
        marginBottom: 50,
        marginTop: 50,
    }
     
})