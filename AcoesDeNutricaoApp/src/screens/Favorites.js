import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

export default function Favorites({ navigation }) {
    return(
        <View>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title="Favoritos"/>
                </Appbar.Header>
            </SafeAreaView>
            <Text>Favoritos</Text>
        </View>
    )
}