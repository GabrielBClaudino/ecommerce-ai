import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {Colors} from 'react-native/Libraries/NewAppScreen'

const Balloon = ({message , userLogged}: any) =>{
    console.log("Message: ",message)
    console.log("User: ",userLogged)
    const sent = userLogged === message.sentBy;
  const balloonColor = sent 
    ? styles.balloonSent 
    : styles.balloonReceived;
  const balloonTextColor = sent
    ? styles.balloonTextSent
    : styles.balloonTextReceived;
  const bubbleWrapper = sent
    ? styles.bubbleWrapperSent
    : styles.bubbleWrapperReceived;
    return(
        <View style={{marginBottom: '2%'}}>
            <View style={{...styles.bubbleWrapper, ...bubbleWrapper}}>
                <View style={{...styles.balloon, ...balloonColor}}>
                    <Text>{message.sentBy}</Text>
                    <Text style={{...styles.balloonText, ...balloonTextColor}}>{message.text}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'column',
    },
    bubbleWrapperSent: {
        alignSelf: 'flex-end',
        marginLeft: 40,
    },
    bubbleWrapperReceived: {
        alignSelf: 'flex-start',
        marginRight: 40,
    },
    balloon: {
        padding: 8,
        borderRadius: 16
    },
    balloonSent: {
        backgroundColor: '#878af6',
    },
    balloonReceived: {
        backgroundColor: Colors.white,
    },
    balloonText: {
        fontSize: 18,
    },
    balloonTextSent: {
        color: Colors.white
    },
    balloonTextReceived: {
        color: Colors.black
    },
})
export default Balloon;