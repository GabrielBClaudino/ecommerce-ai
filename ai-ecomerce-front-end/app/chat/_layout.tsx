import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function chatLayout() {
  const isNavigating = useRef(false);
  
  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="chatName" options={{ headerShown: true , headerTitle:'Chat WebSocket'}}/>
        <Stack.Screen name="changeNameAI" options={{ headerTitle:' Apenas coloque o nome para entrar no Chat' }} />
        <Stack.Screen
        name="chatAI"
        options={{
          headerTitle: ' AI Ecommerce Chat', 
        }}
      />
        <Stack.Screen name="balloon" options={{ headerShown: false }} />
      </Stack>
      //<StatusBar style="auto" />
    //</ThemeProvider>
  );
}
