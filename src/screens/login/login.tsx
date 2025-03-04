import React, { useState } from "react";

import { ActivityIndicator, Alert, Image, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Logo from '../../assets/logoLogin.png';
import {MaterialIcons} from '@expo/vector-icons';
import { themes } from "../../global/themes";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function getLogin(){
        try {
            setLoading(true);
            if(!email || !password){
                return Alert.alert('Atenção!','Preencha todos os campos!');
            }
            
            setTimeout(() => {
                if(email == 'Teste' && password == '123'){
                Alert.alert('Logado com sucesso!');
                }else{
                    Alert.alert('Erro ao logar!','Usuário ou senha incorretos!');
                }
            setLoading(false);
            },2000);

        } catch (error) {
            console.log('Erro ao logar!', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <Image
                    source={Logo}
                    style={styles.logo} 
                    resizeMode="contain"
                />
                <Text style={styles.text}>Bem vindo!</Text>
            </View>
            <View style={styles.boxMiddle}>
                <Text style={styles.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={styles.boxInput}>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <MaterialIcons 
                    name="email" size={24} 
                    color={themes.colors.gray} 
                    />

                </View>
                
                <Text style={styles.titleInput}>SENHA</Text>
                <View style={styles.boxInput}>
                    <TextInput 
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <MaterialIcons 
                    name="remove-red-eye" size={24} 
                    color={themes.colors.gray} 
                    />

                </View>
            </View>
            <View style={styles.boxBottom}>
                <TouchableOpacity style={styles.button} onPress={getLogin}>
                    {loading?
                    <ActivityIndicator color={'#FFFF'} size={'small'}/>
                    :
                    <Text style={styles.textButton}>ENTRAR</Text>
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.textBottom}>Não tem Conta? <Text style={styles.textBottomCreate}>Crie agora!</Text></Text>
        </View>
    );
}