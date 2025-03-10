import { useCart } from './CartContext';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const products = [
  { id: '1', name: 'SmartWatch Huawei', price: 'R$ 199,99', image: 'https://m.media-amazon.com/images/I/51-XHYBPO1L._AC_SX679_.jpg' },
  { id: '2', name: 'SmartWatch Huawei GT', price: 'R$ 399,99', image: 'https://m.media-amazon.com/images/I/81BabF31g8L._AC_SX679_.jpg' },
  { id: '3', name: 'Smartwatch Huawei D2', price: 'R$ 559,90', image: 'https://m.media-amazon.com/images/I/51zuXVRFrDL._AC_SX679_.jpg' },
];

export default function HomeScreen() {
  const { addToCart, cart } = useCart();

  return (
    <LinearGradient colors={['#9491E2', '#AFF2D8']} style={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(item)}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cartContainer}>
        <AntDesign name="shoppingcart" size={24} color="white" />
        <Text style={styles.cartText}>Itens no carrinho: {cart.length}</Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    productCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      width: width / 3 - 20, // Ajusta o tamanho para deixar espaço entre colunas
      marginHorizontal: 5, // Adiciona espaçamento entre os produtos
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    productImage: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
      marginBottom: 5,
    },
    productName: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 12,
      color: '#555',
      marginBottom: 8,
    },
    buyButton: {
      backgroundColor: '#3498db',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    buyButtonText: {
      fontSize: 12,
      color: '#fff',
      fontWeight: 'bold',
    },
    cartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
      padding: 10,
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      justifyContent: 'center',
    },
    cartText: {
      color: '#fff',
      fontSize: 14,
      marginLeft: 10,
    },
  });
  