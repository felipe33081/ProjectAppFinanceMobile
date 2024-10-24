import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/screens';
import { TabBarIcon } from './TabBarIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TransactionsScreen from '@/app/screens/contas';
import SettingsScreen from '@/app/screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DarkTheme from '@/theme/DarkTheme';
import WhiteTheme from '@/theme/WhiteTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

const Tab = createBottomTabNavigator();

function AppTabs() {
    const [darkMode, setDarkMode] = useState(false);

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

export default AppTabs