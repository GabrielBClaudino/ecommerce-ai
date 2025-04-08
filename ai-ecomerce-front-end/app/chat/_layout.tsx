import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function chatLayout() {
  
  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="chatName" options={{ headerShown: true , headerTitle:' Chat com WebSocket', headerLeft:()=>{
            return (<TouchableOpacity onPress={()=> router.replace('/chat/changeName')} ><Ionicons name ='arrow-back' color= 'black' size={26}/></TouchableOpacity>)
        }}}/>
        <Stack.Screen name="changeName" options={{ headerTitle:' Apenas coloque o nome para entrar no Chat' }} />
        <Stack.Screen name="balloon" options={{ headerShown: false }} />
      </Stack>
      //<StatusBar style="auto" />
    //</ThemeProvider>
  );
}
