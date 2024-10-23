import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from './screens/index';
import TransactionsScreen from './screens/contas';
import SettingsScreen from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import { EventRegister } from 'react-native-event-listeners';
import theme from '@/theme/Theme';
import themeContext from '@/theme/themeContext';
import DarkTheme from '@/theme/DarkTheme';
import WhiteTheme from '@/theme/WhiteTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/login';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { barTabs, activeBarTab } = useDynamicColors();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loaded] = useFonts({
    Kanit: require('../assets/fonts/Kanit-Light.ttf'),
  });

  // Carregar tema do AsyncStorage
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

  // Salvar tema no AsyncStorage sempre que for alterado
  useEffect(() => {
    const saveTheme = async (themeMode: Boolean) => {
      try {
        await AsyncStorage.setItem('theme', themeMode ? 'dark' : 'light');
      } catch (error) {
        console.log('Erro ao salvar tema:', error);
      }
    };

    saveTheme(darkMode);
  }, [darkMode]);

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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  function AppTabs() {
    return (
      <Tab.Navigator
        initialRouteName='index'
        screenOptions={{
          tabBarActiveTintColor: darkMode === true ? DarkTheme.colors.notification : WhiteTheme.colors.notification,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: darkMode === true ? DarkTheme.colors.card : WhiteTheme.colors.card },
          headerShown: false,
        }}>
        <Tab.Screen
          name="index"
          component={HomeScreen}
          options={{
            title: 'index',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="contas"
          component={TransactionsScreen}
          options={{
            title: 'Contas',
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name={focused ? 'insert-chart' : 'insert-chart-outlined'} size={34} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Configurações',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={34} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer
        independent={true}
        theme={darkMode === true ? DarkTheme : WhiteTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Se o usuário não estiver autenticado, mostre a tela de login */}
          {!isAuthenticated ? (
            <Stack.Screen name="Login">
              {props => (
                <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />
              )}
            </Stack.Screen>
          ) : (
            /* Quando o usuário estiver autenticado, mostre as tabs */
            <Stack.Screen name="AppTabs" component={AppTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
