import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Preload from '../screens/Preload';
import Main from '../screens/Main';
const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
);