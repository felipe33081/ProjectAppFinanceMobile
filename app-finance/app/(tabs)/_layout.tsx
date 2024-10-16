import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import TransactionsScreen from './contas';
import { useDynamicColors } from '@/hooks/useDynamicColors';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { barTabs, activeBarTab } = useDynamicColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeBarTab,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          backgroundColor: barTabs 
        },
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
            <MaterialIcons name={focused ? 'insert-chart' : 'insert-chart-outlined'}  size={34} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
