import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].background
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Principal',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TransactionsScreen"
        options={{
          title: 'Contas',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name={focused ? 'insert-chart' : 'insert-chart-outlined'}  size={34} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
