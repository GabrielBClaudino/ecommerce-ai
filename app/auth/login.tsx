import React,{ useState } from "react";
import {Text, View, Alert, StyleSheet, Dimensions, TextInput} from 'react-native'
import {MaterialIcons, FontAwesome6, AntDesign} from '@expo/vector-icons';
import { themas } from "@/global/themes";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";

export default function Login (){

    const [email,setEmail] = useState({value: '',dirty: false});
    const [password,setPassword] = useState({value: '',dirty: false});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const handleErrorEmail = () => {
        if(!email.value && email.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <Text style={style.error}>E-mail inválido</Text>
        } else {
            return <Text style={style.error}></Text> 
        }
    }
    const handleErrorPassword = () => {
        if(!password.value && password.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>
        } else {
            return <Text style={style.error}></Text> 
        }
    }
    const handleErrorForm = () => {
        let hasError = false;
        if(!password.value) {
          setPassword({value: password.value, dirty: true})
          hasError = true;
        }
    
        if(!email.value) {
          setEmail({value: email.value, dirty: true})
          hasError = true
        }
        
        if (!emailRegex.test(email.value)) {
          setEmail({value: email.value, dirty: true})
          hasError = true
        }
    
        if(!hasError) {
            router.replace('/(tabs)')
        }
      } 
    


    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <AntDesign name="user" style={style.logo}></AntDesign>
                <Text style={style.text}>E-Commerce IA</Text>
                <Text style={style.subtitle}>Entre Agora!</Text>
                
            </View>
            <View style={style.boxMid}>
            <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
            <View style={style.boxInput}>
            <TextInput style={style.input} placeholder='E-mail' onChangeText={(text) => {setEmail({value: text, dirty: true})}}/>
            <FontAwesome6
            style={{marginHorizontal:-10}}
            name="user-large"
            size={20}
            color={themas.Colors.gray}
            />
            </View>
            {handleErrorEmail()}
            <Text style={style.titleInput}>SENHA</Text>
            <View style={style.boxInput}>
            <TextInput 
            style={style.input}
            placeholder='Senha' onChangeText={(text) => {setPassword({value: text, dirty: true})}}
            secureTextEntry
            />
            <MaterialIcons
            style={{marginHorizontal:-10}}
            name="remove-red-eye"
            size={20}
            color={themas.Colors.gray}
            />
            </View>
            {handleErrorPassword()}
            </View>
            <View style={style.boxBottom}>
                <Button  text="ENTRAR" onPress={()=> handleErrorForm()}/>
            <Text style={style.textBottom}>Não tem conta? <Link href={"/auth/register"}><Text  style={style.textBottomCreate}>Crie agora</Text></Link></Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    error:{
        width: '100%',
        marginLeft:20,
        marginBottom: 0,
        color: 'red',
        fontWeight: 'bold',
        height: 20,
        fontSize: 14
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 2,
    },
    boxMid:{
        height:Dimensions.get('window').height/4,
        width:'100%',
        paddingHorizontal:37,
    },
    boxBottom:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    boxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:40,
        borderColor:themas.Colors.lightGray,
        backgroundColor:themas.Colors.bgScreen,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
    },
    logo:{
        fontSize:Dimensions.get('window').height/6,
        color:"#black",
        marginTop:40,
    },
    text:{
        marginTop:20,
        fontSize:30,
        fontWeight:'bold',
        marginBottom:10
    },
    input:{
        height:'100%',
        width:'100%',
        borderRadius:40,
    },
    boxIcon:{
        width:50,
        height:50,
        backgroundColor:'red'
    },
    titleInput:{
        marginLeft:5,
        color:themas.Colors.gray,
        marginTop:5
    },
    subtitle:{
        marginLeft:5,
        fontSize:20,
        color:themas.Colors.gray,
    },
    textBottom:{
        paddingTop:20,
        fontSize:16,
        color:themas.Colors.gray,
        fontWeight:'bold'
    },
    textBottomCreate:{
        fontWeight:'bold',
        fontSize:16,
        color:themas.Colors.primary
    }
})