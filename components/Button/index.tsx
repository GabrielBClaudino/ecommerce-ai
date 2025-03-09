
import { themas } from "@/global/themes";
import React from "react";
import{TouchableOpacity,TouchableOpacityProps,ActivityIndicator,Text, StyleSheet}from 'react-native';
type Props = TouchableOpacityProps&{
    text:string,
    loading?:boolean
}
export  function Button({...rest}:Props){
    return(
        <TouchableOpacity {...rest} 
            style={style.button} 
            activeOpacity={0.6} 
        >
            {rest.loading?<ActivityIndicator color={'#FFF'}/>:<Text style={[style.textButton]}>{rest.text}</Text>}
        </TouchableOpacity>
    );
}
const style = StyleSheet.create({
    button:{
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.Colors.primary,
        borderRadius:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textButton:{
        fontSize:16,
        color:'#FFFF',
        fontWeight:'bold'
    },
})