import { useCart } from '../CartContext';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import httpService from '../services/httpService';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

export default function HomeScreen() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]); // Corrigido o tipo aqui
  const SERVER_URL = 'http://192.168.0.100:3000';

  async function getProducts() {
    try {
      const ProductResponse = await httpService.get(`${SERVER_URL}/api/product`);
      setProducts(ProductResponse);
      console.log(ProductResponse);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <LinearGradient colors={['#cbcbcb', '#dddddd']} style={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.productPrice}>R$ {item.price}</Text>
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
    width: width / 3 - 20,
    marginHorizontal: 5,
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
