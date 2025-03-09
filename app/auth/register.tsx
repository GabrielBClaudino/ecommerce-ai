import React,{ useState } from "react";
import {Text, View,Image, Alert, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import { useNavigation,NavigationProp  } from '@react-navigation/native';
import {MaterialIcons, FontAwesome, FontAwesome6} from '@expo/vector-icons';
import { themas } from "@/global/themes";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function Register (){
    const navigation = useNavigation<NavigationProp<any>>();

    const [email,setEmail]               = useState('');
    const [password,setPassword]         = useState('');
    const [name,setName]         = useState('');
    const [cpf,setCpf]         = useState('');
    const [loading,setLoading]           = useState(false);


    async function getRegister() {
        try {
            setLoading(true)
            
            if(!email ||!password ||!cpf ||!name){
                setLoading(false)
                return Alert.alert('Atenção!','Informe os campos obrigatórios!')
            }

            
            setLoading(false)
            return Alert.alert('Registrado com sucesso!')
            
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
        <ScrollView contentContainerStyle={style.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={style.container}>
            <View style={style.boxTop}>
                <FontAwesome name="user-circle-o" style={style.logo}></FontAwesome>
                <Text style={style.text}>Ecommerce IA</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={style.boxInput}>
                <TextInput 
                style={style.input}
                value={email}
                onChangeText={setEmail}
                />
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="email"
                    size={20}
                    color={themas.Colors.gray}
                    />

                </View>

                

                <Text style={style.titleInput}>NOME COMPLETO</Text>
                <View style={style.boxInput}>
                <TextInput 
                    style={style.input}
                    value={name}
                    onChangeText={setName}
                />
                <FontAwesome6
                    style={{marginHorizontal:-10}}
                    name="user-large"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>

                <Text style={style.titleInput}>CPF</Text>
                <View style={style.boxInput}>
                <TextInput 
                    style={style.input}
                    value={cpf}
                    onChangeText={setCpf}
                />
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="shield"
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
            <TouchableOpacity style={style.button} onPress={()=> getRegister()}
                ><Text style={style.textBottom}>REGISTRAR</Text></TouchableOpacity> 
             
            </View>
            <Text style={style.textBottomDown}>Já tem conta? <Link href={"/auth/login"}><Text  style={style.textBottomCreate}>Entre agora</Text></Link></Text>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    boxTop:{
        height:Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    boxMid:{
        flex:1, // Permite que os inputs ocupem o espaço necessário
        width:'100%',
        paddingHorizontal:37,
        justifyContent: 'center' // Centraliza os inputs verticalmente no espaço disponível
    },
    boxBottom:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: 20 // Garante um espaçamento entre os inputs e o botão
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
        fontSize:Dimensions.get('window').height/5,
        color:"#878af6",
        marginTop:40,
    },
    text:{
        marginTop:20,
        fontSize:26,
        fontWeight:'bold',
        marginBottom:10
    },
    input:{
        height:'100%',
        width:'100%',
        borderRadius:40,
    },
    button:{
        width:200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themas.Colors.primary,
        borderRadius:40,
        marginTop: 20, // Garante que o botão fique abaixo dos inputs
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
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
    textBottom:{
        fontSize:16,
        color:'#FFFF',
        fontWeight:'bold'
    },
    textBottomDown:{
        paddingTop:20,
        fontSize:16,
        color:themas.Colors.gray,
        fontWeight:'bold'
    },
    textBottomCreate:{
        fontSize:16,
        color:themas.Colors.primary
    }
})
