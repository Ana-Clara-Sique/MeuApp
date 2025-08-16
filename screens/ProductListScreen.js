import React, { useState ,useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, FlatList, RefreshControl, Text ,TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterProductScreen({ navigation }) {

 const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useContext(AuthContext);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://192.168.1.103:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.log('Erro ao carregar produtos', error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProdutos();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Sair" 
            onPress={() => {
               logout();
               navigation.replace('Login');
             }}
             />
      <Button title="Cadastrar Novo Produto" onPress={() => navigation.navigate('RegisterProduct')} />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Nome: {item.nome}</Text>
            <Text>Preço: R$ {item.preco}</Text>
            <Text>Código de Barras: {item.codigoBarras}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  }
});