import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from './screens/index';
import TransactionsScreen from './screens/contas';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import { EventRegister } from 'react-native-event-listeners';
import theme from '@/theme/Theme';
import themeContext from '@/theme/themeContext';
import DarkTheme from '@/theme/DarkTheme';
import WhiteTheme from '@/theme/WhiteTheme';
import SettingsScreen from './screens/Settings';

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { barTabs, activeBarTab } = useDynamicColors()
  const [darkMode, setDarkMode] = useState(false)

  const [loaded] = useFonts({
    Kanit: require('../assets/fonts/Kanit-Light.ttf'),
  });

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

  const config = {
    screens: {
      HomeScreen: 'index',
      TransactionsScreen: 'contas',
      SettingsScreen: 'Settings'
    },
  };
  
  const linking = {
    prefixes: ['exp://'],
    config,
  };

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer
        linking={linking}
        independent={true}
        theme={darkMode === true ? DarkTheme : WhiteTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: darkMode === true ? DarkTheme.colors.notification : WhiteTheme.colors.notification,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: darkMode === true ? DarkTheme.colors.card : WhiteTheme.colors.card },
            headerShown: false
          }}>
          <Tab.Screen
            name="Principal"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Contas"
            component={TransactionsScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons name={focused ? 'insert-chart' : 'insert-chart-outlined'} size={34} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Configurações"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'settings' : 'settings-outline'} size={34} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
