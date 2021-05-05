import React from 'react';
import {Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screens
import Home from './src/screens/Home.js';
import Favorites from './src/screens/Favorites.js';
import Documents from './src/screens/Documents.js';

//Tema configs
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3c9891', //verde oliva
    accent: '#f1f3f2',
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <Tab.Navigator
        initialRouteName="Ações de Nutrição"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ações de Nutrição') {
              iconName = focused
                ? 'clipboard'
                : 'clipboard';
            }
            if (route.name === 'Documentos') {
              iconName = focused
                ? 'document-text-outline'
                : 'document-text-outline';
            } 
            else if (route.name === 'Favoritos') {
              iconName = focused ? 'star' : 'star';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3c9891',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Favoritos" component={Favorites} />
        <Tab.Screen name="Ações de Nutrição" component={Home} />
        <Tab.Screen name="Documentos" component={Documents} />
      </Tab.Navigator>
    </NavigationContainer>
  </PaperProvider>
  );
}

function CustomNavigationBar({navigation, previous}) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Ações de Nutrição" />
    </Appbar.Header>
  );
}