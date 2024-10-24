import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, TextInput } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

export default function LoginScreen() {
  const { backgroundCardsColor, textsColor, buttonsColors, generalBackgroundColor } = useDynamicColors();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin() {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log('Erro ao salvar dados de login:', error);
    }
    setIsAuthenticated(true)
    await AsyncStorage.setItem('authenticated', 'true');
    EventRegister.emit('Authenticating', true);
    console.log(email)
    console.log(password)
  };

  return (
    <View style={[styles.container, { backgroundColor: generalBackgroundColor }]}>
      <Image source={require('../../assets/images/—Pngtree—human profile avatar 3d icon_8544154.png')} style={styles.logo} />

      <Text style={[styles.title, { color: textsColor }]}>Bem-vindo!</Text>
      <Text style={[styles.subtitle, { color: textsColor }]}>Faça login para continuar</Text>

      <View>
        <TextInput
          style={[styles.input, { backgroundColor: backgroundCardsColor }, { color: textsColor }]}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { backgroundColor: backgroundCardsColor }, { color: textsColor }]}
          placeholder="Senha"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? <Text>{errorMessage}</Text> : null}
      </View>

      <View>
        <Pressable style={[styles.button, { backgroundColor: buttonsColors }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
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
    width: 150,
    height: 150,
    marginBottom: 30,
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
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    fontFamily: 'Kanit',
  },
  signupLink: {
    fontSize: 16,
    fontFamily: 'Kanit',
    marginLeft: 5,
  },
  input: {
    width: 300,
    height: 48,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    borderRadius: 10,
    marginTop: 0,
    margin: 10,
    width: 300,
    height: 48,
    justifyContent: 'center',
    alignItems: "center",
    
    fontFamily: 'Kanit',
    fontSize: 19,
  },
  buttonText: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //fontWeight: 'bold',
    fontFamily: 'Kanit',
    fontSize: 19,
  }
});
