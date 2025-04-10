import React,{ Fragment, useEffect, useRef, useState} from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Balloon from "./balloon";
import {Colors} from 'react-native/Libraries/NewAppScreen'
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Message {
    text: String
    sentBy: String
    constructor(text: String, sentBy: String){
        this.text = text;
        this.sentBy = sentBy;
    }
}
let ws:WebSocket;
const chatAI = () =>{
    
    const username: any = AsyncStorage.getItem("userName");
    const scrollRef = useRef<FlatList>(null)
    const params = useLocalSearchParams()
    const [userLogged, setUserLogged] = useState(username)
    const [chat, setChat] = useState<{ messages: Message[]}>({messages: []})
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        ws = new WebSocket('ws://10.5.3.100:3000')
        ws.onopen = () => {
            console.log("WebSocket Conectado com sucesso!");
        };
        ws.onmessage = ({data}: any) => {
            console.log("Mensage é:", data)
            const msg = JSON.parse(data)
        
            setChat(prev => {
                const updated = [...prev.messages]
                if (loading) {
                    updated.pop()
                }
                updated.push(msg)
                return { messages: updated }
            })
            setLoading(false)
            setMessage('')
            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true })
            }, 100)
        }
        
    },[])

    const sendMessage = () =>{
        const msg: any = {event: 'ai-chat',text:message, sentBy: userLogged}
        const newMessages = [...chat.messages, msg, new Message("Espere um momento...", "Gemini")]
        setLoading(true)
        setChat({messages: newMessages})
        console.log("Mensagem Enviada:",msg)
        ws.send(JSON.stringify(msg))

        setTimeout(() => {
            scrollRef.current?.scrollToEnd({animated:true})
        }, 100)
    } 
    return(
        <Fragment>
            <FlatList
            ref={scrollRef}
            style={styles.scrollViewContainer}
            data={chat.messages}
            renderItem={({item})=>(<Balloon message={item} userLogged= {userLogged}/>)}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={()=>(<Text style={{textAlign: 'center'}}>Nenhuma mensagem encontrada</Text>)}
            />
            
            <View style={styles.messageTextInputContainer}>
                <TextInput onChangeText={(text)=>setMessage(text)} value={message} style={styles.messageTextInput} placeholderTextColor='black' placeholder="Escreva uma Mensagem"/>
                <TouchableOpacity disabled={message.trim() === ''} onPress={()=> sendMessage()} style={styles.sendButton}><Ionicons style={{color:"white", fontSize:20}} name='send-sharp'></Ionicons></TouchableOpacity>
            </View>
        </Fragment>
    )

}

const styles = StyleSheet.create({
    sendButton: {
        backgroundColor: '#878af6',
        color: Colors.white,
        height: 40,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 5,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#848484",
        borderWidth: 1,
        marginTop: "3%",
        marginBottom: "5%",
        padding: 10

    },
    changeNameView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        backgroundColor: 'white'
    },
    container: {
        marginTop: 16,
        marginHorizontal: 16,
      },
      scrollViewContainer: {
        padding: 10,
        top: 10,
      },

      messageTextInputContainer: {
        justifyContent: 'flex-end',
        padding: 5,
        borderColor: 'transparent',
        borderTopColor: Colors.light,
        alignItems: 'center',
        flexDirection: 'row',
      },
      messageTextInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 90,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        fontSize: 17,
        borderColor: Colors.light,
        borderWidth: 1,
        backgroundColor: Colors.white,
        borderRadius: 20,
      },
})

export default chatAI;
