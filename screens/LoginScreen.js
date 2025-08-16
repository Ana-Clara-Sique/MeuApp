import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);
  
  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const res = await axios.get('http://192.168.1.103:3000/usuarios');
      
      const usuario = res.data.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (usuario) {
        login(usuario);
        navigation.replace('Products');
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de rede ou servidor');
      console.log('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} /> 
      <Button title="Ainda não tem conta? Cadastre-se" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

   const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 }
    });