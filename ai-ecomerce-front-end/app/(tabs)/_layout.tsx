import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '../CartContext';
import { Divider, Menu, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [show, setShow] = useState<boolean>(false);
  return (
    <CartProvider>
    <PaperProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: 'Produtos',
          headerRight: () =>{
            return(
              
                <Menu
                  visible={show}
                  onDismiss={() => setShow(false)}
                  anchor={<TouchableOpacity style={{marginEnd:16}} onPress={() => setShow(true)}><MaterialCommunityIcons size={26} name="dots-vertical" color="#000" /></TouchableOpacity>}
                >
                  <Menu.Item onPress={() => {}} title="Perfil" />
                  <Menu.Item onPress={() => {}} title="Configurações" />               
                  <Menu.Item onPress={() => {router.push('/chat/changeName')}} title="Conversar com a IA" />
                  <Divider />
                  <Menu.Item onPress={() => {router.push('/welcome')}} title="Sair" />
                </Menu>
              
            )
          },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          
        }}
      />
    </Tabs>
    </PaperProvider>
    </CartProvider>
  );
}
