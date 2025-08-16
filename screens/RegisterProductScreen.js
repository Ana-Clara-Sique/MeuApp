import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function RegisterProductScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const { logout } = useContext(AuthContext); 

  const handleRegister = async () => {

    if (!nome || !preco || !codigoBarras) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await axios.post('http://192.168.1.103:3000/produtos', {
        nome,
        preco: parseFloat(preco),
        codigoBarras
      });

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao cadastrar produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Sair"
        onPress={() => {
          logout();
          navigation.replace('Login');
        }}
      />

      <TextInput
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <TextInput
        placeholder="Código de Barras"
        value={codigoBarras}
        onChangeText={setCodigoBarras}
        style={styles.input}
      />

      <Button title="Cadastrar Produto" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
  },
});
