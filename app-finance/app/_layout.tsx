import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import theme from '@/theme/Theme';
import themeContext from '@/theme/themeContext';
import DarkTheme from '@/theme/DarkTheme';
import WhiteTheme from '@/theme/WhiteTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack';
import AppTabsStack from './AppTabsStack';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loaded] = useFonts({
    Kanit: require('../assets/fonts/Kanit-Light.ttf'),
  });

  //Se está autenticado ou nao
  useEffect(() => {
    const listener = EventRegister.addEventListener('Authenticating', (data) => {
      setIsAuthenticated(data);
    });
    return () => {
      if (typeof listener === 'string') {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [isAuthenticated]);

  // Carrega o isAuthenticated no AsyncStorage pra verificar se esta autenticado
  useEffect(() => {
    const loadAuthenticated = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email !== null) {
          setIsAuthenticated(true)
          
          console.log(email)
        }
      } catch (error) {
        console.log('Erro ao carregar autenticação:', error);
      }
    };

    loadAuthenticated();
  }, []);

  //pra trocar o tema
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });
    return () => {
      if (typeof listener === 'string') {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [darkMode]);

  // Carrega tema do AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setDarkMode(storedTheme === 'dark');
        }
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer
        independent={true}
        theme={darkMode === true ? DarkTheme : WhiteTheme}>
        {!isAuthenticated ? <AuthStack /> : <AppTabsStack />}
      </NavigationContainer>
    </themeContext.Provider>
  );
}
