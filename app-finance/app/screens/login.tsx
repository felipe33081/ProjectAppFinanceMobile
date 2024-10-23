import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface LoginScreenProps {
  onLogin: () => void; // Função que não recebe parâmetros e retorna void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { backgroundCardsColor, textsColor, buttonsColors } = useDynamicColors();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Simulação de login bem-sucedido
    onLogin(); // Isso atualiza o estado de `isAuthenticated`
  };
  
  return (
    <View style={[styles.container, { backgroundColor: backgroundCardsColor }]}>
      <Image source={require('../../assets/images/—Pngtree—human profile avatar 3d icon_8544154.png')} style={styles.logo} />

      <Text style={[styles.title, { color: textsColor }]}>Bem-vindo!</Text>
      <Text style={[styles.subtitle, { color: textsColor }]}>Faça login para continuar</Text>

      <Button title="Entrar" onPress={handleLogin} />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: textsColor }]}>Não tem uma conta?</Text>
        <TouchableOpacity>
          <Text style={[styles.signupLink, { color: buttonsColors }]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Kanit',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Kanit',
    marginBottom: 20,
  },
  googleButton: {
    width: 230,
    height: 48,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Kanit',
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Kanit',
    marginLeft: 5,
  },
});
