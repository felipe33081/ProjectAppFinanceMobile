import { ThemeProvider } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import HomeScreen from './screens/index';
import TransactionsScreen from './screens/contas';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useGeneralTheme } from '@/theme/GeneralTheme';
import { useDynamicColors } from '@/hooks/useDynamicColors';

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { textsColor, barTabs, barNotificationColor, activeBarTab } = useDynamicColors();
  const theme = useGeneralTheme();

  const [loaded] = useFonts({
    Kanit: require('../assets/fonts/Kanit-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true} theme={theme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: activeBarTab,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: barTabs },
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
  );
}
