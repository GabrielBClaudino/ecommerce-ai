import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const changeName = () => {
  const [userLogged, setUserLogged] = useState('')
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff', // opcional, deixa o fundo branco
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 45,
            backgroundColor: '#f0f0f5',
            borderRadius: 25,
            paddingHorizontal: 20,
            fontSize: 16,
            color: '#000',
            marginRight: 10,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
          onChangeText={(text) => setUserLogged(text)}
          placeholderTextColor="#888"
          placeholder="Digite seu nome"
        />
        <TouchableOpacity
          disabled={userLogged.trim() === ''}
          onPress={() =>
            router.replace({ pathname: '/chat/chatName', params: { userLogged } })
          }
          style={{
            backgroundColor: userLogged.trim() === '' ? '#ccc' : '#6c63ff',
            height: 45,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default changeName
