import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from '@/components/navigation/AppTabs';

const Stack = createStackNavigator();

const AppTabsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppTabs" component={AppTabs} />
        </Stack.Navigator>
    )
}

export default AppTabsStack