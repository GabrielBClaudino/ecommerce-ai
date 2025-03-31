import React,{ useState } from "react";
import {Text, View, Alert, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {MaterialIcons, FontAwesome6, AntDesign} from '@expo/vector-icons';
import { themas } from "@/global/themes";
import { Link, router } from "expo-router";

import httpService from '../services/httpService'
export default function Register (){
    const SERVER_URL = 'http://192.168.0.100:3000'

    const [email,setEmail] = useState({value: '',dirty: false});
    const [password,setPassword] = useState({value: '',dirty: false});
    const [name, setName] = useState({ value: '', dirty: false });
    const [cpf, setCpf] = useState({ value: '', dirty: false });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const nameRegex = /^.{2,}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    const sendForm = async () =>{
        const json={
            name: name.value,
            email: email.value,
            cpf: cpf.value,
            password:password.value
        }
        const result = await httpService.post(`${SERVER_URL}/api/user`, json)
        console.log(result)
        Alert.alert('Sucesso', 'Registrado com sucesso!');
        router.replace('/auth/login');
    }
    
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

    const handleErrorName = () => {
        if (!name.value && name.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else if (!nameRegex.test(name.value) && name.dirty) {
            return <Text style={style.error}>Nome deve ter no mínimo 2 caracteres</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    
    const handleErrorCpf = () => {
        if (!cpf.value && cpf.dirty) {
            return <Text style={style.error}>Campo obrigatório</Text>;
        } else if (!cpfRegex.test(cpf.value) && cpf.dirty) {
            return <Text style={style.error}>CPF inválido (use o formato 000.000.000-00)</Text>;
        } else {
            return <Text style={style.error}></Text>;
        }
    };
    
    const handleErrorForm = () => {
        let hasError = false;
    
        if (!password.value) {
            setPassword({ value: password.value, dirty: true });
            hasError = true;
        }
    
        if (!email.value) {
            setEmail({ value: email.value, dirty: true });
            hasError = true;
        }
    
        if (!emailRegex.test(email.value)) {
            setEmail({ value: email.value, dirty: true });
            hasError = true;
        }
    
        if (!name.value) {
            setName({ value: name.value, dirty: true });
            hasError = true;
        }
    
        if (!nameRegex.test(name.value)) {
            setName({ value: name.value, dirty: true });
            hasError = true;
        }
    
        if (!cpf.value) {
            setCpf({ value: cpf.value, dirty: true });
            hasError = true;
        }
    
        if (!cpfRegex.test(cpf.value)) {
            setCpf({ value: cpf.value, dirty: true });
            hasError = true;
        }
    
        if (!hasError) {
            sendForm()
        }
    };
    


    return(
        <>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
        <ScrollView contentContainerStyle={style.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={style.container}>
            <View style={style.boxTop}>
                <AntDesign name="user" style={style.logo}></AntDesign>
                <Text style={style.text}>E-Commerce IA</Text>
                <Text style={style.subtitle}>Cadastre-se Já!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='E-mail' onChangeText={(text) => {setEmail({value: text, dirty: true})}}/>
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="email"
                    size={20}
                    color={themas.Colors.gray}
                    />

                </View>
                {handleErrorEmail()}

                

                <Text style={style.titleInput}>NOME COMPLETO</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='Nome' onChangeText={(text) => {setName({value: text, dirty: true})}}/>
                <FontAwesome6
                    style={{marginHorizontal:-10}}
                    name="user-large"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>
                {handleErrorName()}

                <Text style={style.titleInput}>CPF</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='CPF' onChangeText={(text) => {setCpf({value: text, dirty: true})}}/>
                <MaterialIcons
                    style={{marginHorizontal:-10}}
                    name="shield"
                    size={20}
                    color={themas.Colors.gray}
                    />
                </View>
                {handleErrorCpf()}

                <Text style={style.titleInput}>SENHA</Text>
                <View style={style.boxInput}>
                <TextInput style={style.input} placeholder='Senha' onChangeText={(text) => {setPassword({value: text, dirty: true})}} secureTextEntry/>
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
            <TouchableOpacity style={style.button} onPress={()=> handleErrorForm()}
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
    error:{
        width: '100%',
        marginLeft:20,
        marginBottom: 0,
        color: 'red',
        fontWeight: 'bold',
        height: 20,
        fontSize: 14
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
        marginBottom: 2,
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
        marginTop: 10 // Garante um espaçamento entre os inputs e o botão
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
        fontSize:26,
        fontWeight:'bold',
        marginBottom:10
    },
    input:{
        height:'100%',
        width:'100%',
        borderRadius:40,
    },
    subtitle:{
        marginLeft:5,
        fontSize:20,
        color:themas.Colors.gray,
    },
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
