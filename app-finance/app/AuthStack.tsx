import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack