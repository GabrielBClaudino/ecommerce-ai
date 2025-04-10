import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useCart } from '../CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from '../services/httpService';
export default function CartScreen() {
  const { cart, removeFromCart , clearCart } = useCart();
  const SERVER_URL = 'http://10.5.3.100:3000';

  const finalizePurchase = async () => {
    try {
      console.log("-----------------Finalizando Compra-----------------");
      const userId = await AsyncStorage.getItem("userId");
      const products = cart.map(product => ({
        productId: product._id, 
        name: product.name,
        price: product.price
      }));
      
  
      const orderData = {
        userId: userId, products: products}
      console.log(orderData);
      
      await httpService.post(`${SERVER_URL}/api/order`, orderData);
      Alert.alert("Sucesso", "Compra finalizada com sucesso!");
      console.log("-----------------Compra finalizada-----------------");
      clearCart()
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      Alert.alert("Erro", "Não foi possível finalizar a compra.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item._id)}> 
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <TouchableOpacity style={styles.finalizeButton} onPress={finalizePurchase}>
          <Text style={styles.finalizeButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  finalizeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  finalizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
