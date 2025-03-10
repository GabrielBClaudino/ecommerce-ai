import React,{ useState } from "react";
import {Text, View,Image, Alert, StyleSheet, Dimensions, TextInput} from 'react-native'
import { useNavigation,NavigationProp  } from '@react-navigation/native';
import {MaterialIcons, FontAwesome, FontAwesome6, AntDesign} from '@expo/vector-icons';
import { themas } from "@/global/themes";
import { Button } from "@/components/Button";
import { Link, router } from "expo-router";

export default function Login (){
    const navigation = useNavigation<NavigationProp<any>>();

    const [email,setEmail]               = useState('');
    const [password,setPassword]         = useState('');
    const [loading,setLoading]           = useState(false);


    async function getLogin() {
        try {
            setLoading(true)
            
            if(!email ||!password){
                setLoading(false)
                return Alert.alert('Atenção!','Informe os campos obrigatórios!')
            }

            if(email === 'Test' && password === '123'){
                setLoading(false)
                router.push('/(tabs)')
                return Alert.alert('Logado com sucesso!')
            }

            setLoading(false)
            Alert.alert('Atenção!','E-mail ou senha invalida!')
        } catch (error) {
            console.log(error)
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
            <TextInput 
            style={style.input}
            value={email}
            onChangeText={setEmail}
            />
            <FontAwesome6
            style={{marginHorizontal:-10}}
            name="user-large"
            size={20}
            color={themas.Colors.gray}
            />
            </View>
            <Text style={style.titleInput}>SENHA</Text>
            <View style={style.boxInput}>
            <TextInput 
            style={style.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <MaterialIcons
            style={{marginHorizontal:-10}}
            name="remove-red-eye"
            size={20}
            color={themas.Colors.gray}
            />
            </View>
            </View>
            <View style={style.boxBottom}>
                <Button  text="ENTRAR" loading={loading} onPress={()=>getLogin()}/>
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
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
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
        justifyContent:'flex-start'
        
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
        marginTop:20
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