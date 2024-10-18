import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
      console.log(data === true ? 'dark' : 'light')
    });

    return () => {
      if (typeof listener === 'string') {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [darkMode]);

  console.log(activeBarTab)

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
      <NavigationContainer independent={true} theme={darkMode === true ? DarkTheme : WhiteTheme}>
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
              title: 'Principal',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Contas"
            component={TransactionsScreen}
            options={{
              title: 'Contas',
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons name={focused ? 'insert-chart' : 'insert-chart-outlined'} size={34} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
