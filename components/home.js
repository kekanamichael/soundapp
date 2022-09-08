import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Modal, ImageBackground } from 'react-native';
// import { Button } from 'react-native-web';
import React from 'react';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-web';
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth';
import image from '../assets/cool-website-background-13.jpg'

export default function Home() {
  const [recording, setRecording]= React.useState();
  const [recordings, setRecordings]= React.useState([]);
  const [msg,setMsg]= React.useState("Recording app");
  const [remove,setRemove]=React.useState();
 const [showPop, setShowPop]=React.useState(false);
  const [reCord, setReCord]= React.useState()

  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      // console.log(permission)

      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });

        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  async function stopRecording(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration:getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });
    // console.log(updatedRecordings.duration)
    setRecordings(updatedRecordings)

  }

  function getDurationFormatted(millis){
    console.log(millis)
    const minutes = millis/1000/60;
    const minutesDisplay =Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay)*60;
    const soundDisplay = seconds <10 ? `0${seconds}`:seconds;
    console.log(minutesDisplay + "  " + soundDisplay);
    return `${minutesDisplay}: ${soundDisplay}`
  }
  const logoutUser = () => {
    signOut(auth).then(() => {
      console.log('User signed out')
      navigation.navigate("Register")
    }).catch((error) => {
      console.log(error);
    });

  };


  const removeAudio=(Recordid)=>{
    // console.log(recordings)
    // console.log(Recordid)
    // const a = recordings[Recordid];
    // console.log( recordings[Recordid])
  
    setRecordings(recordings.filter(item=> item.file !== Recordid))
    //  console.log(recordings)
  }





//to show my recordings
function getRecordings(){

  // function removePeople(e) {
  //   this.setRecordings({recordings: this.state.recordings.filter(function(recording) { 
  //       return recording !== e.target.value 
  //   })});
  // }
  // console.log(recordings)

//editing the recording
function updateRecording(recordfile){
  console.log(recordfile)  
  // console.log(showPop)
  
  async function beginRecord(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      // console.log(permission)
  
      if(permission.status === "granted"){
        await Audio.setAudioModeAsync({
          allowRecordingIOS: true,
          playsInSilentModeIOS:true
        });
  
        const {recording}= await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording)
      }else(
        setMsg("Please grant permssion to app to start recording")
      )
    }catch(error){
      alert("failed to start recording  "+ error)
    }
  }
  
  async function stop(){
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
   
    const {sound, status} = await recording.createNewLoadedSoundAsync();
 
    const newRecording = recordings.map(recordfile=>{
      return {
        sound:sound,
        duration:getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }
    })
    setRecordings(newRecording)
    console.log(newRecording)
  
  }
  return(
    <View>
      <Button
title={recording ? 'Stop Recording':'Start Recording'}
 onPress={recording? stop: beginRecord}
/>

    </View>
  )
 }

 
  return recordings.map((recordingLine, index)=>{
    return (
      <View key={index} style={styles.row}>

         <Text>
      <Text style={styles.fill} > Recording {index + 1} - {recordingLine.duration}</Text>
   
      <Button style={styles.button}  color = "teal" onPress={()=> recordingLine.sound.replayAsync() } title="Play"/>
      <Button style={styles.button} color = "teal"  onPress={()=> {setShowPop(true),updateRecording(recordingLine)}}  title="Edit"/>
      <Button style={styles.button} color = "red"  onPress={()=> removeAudio(recordingLine.file)}  title="Delete"/>

      </Text>
      <View>
 
 <Modal
transparent={true}
visible={showPop}
>

<View
style={{backgroundColor:'black', flex:1}}
>
<View
style={{backgroundColor:'white', margin:50, padding:40, borderRadius:10,flex:1}}
>
{updateRecording(recordingLine)}

<Button  onPress={()=> setShowPop(false)} title='done'/>
</View>

</View>
</Modal>

</View>
      </View>
    )
    
    
  })
}

  return (
    <ImageBackground style={styles.bckImage} source={image} resizeMode='cover'>
      <Text style={styles.mail} >{auth.currentUser?.displayName}</Text>

    <View style={styles.container}>

      <Text>{msg}</Text>
      <Button
      title={recording ? 'Stop Recording':'Start Recording'}
      onPress={recording? stopRecording: startRecording}
      />
      {getRecordings()} 
      <TouchableOpacity 
        color="orangered"
        style={{with:"40%"}} 
        onPress={logoutUser}
      >
        <Text color='orangered'>Logout</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  bckImage:{
    flex: 1
  },
  container: {
    flex: 1,
    
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
  },
  mail:{
    color: "#fff",
    fontSize: 24    
  }
});
