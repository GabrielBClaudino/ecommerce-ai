import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Divider, Menu, PaperProvider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [show, setShow] = useState<boolean>(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <PaperProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }}/>
        <Stack.Screen name="chat" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerTitle:"", headerShown: false }} />
        <Stack.Screen name="auth" options= {{headerTitle: ""}} />
      </Stack>
      </PaperProvider>
      //<StatusBar style="auto" />
    //</ThemeProvider>
  );
}
