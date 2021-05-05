import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

export default function Documents({ navigation }) {
    //constante da busca da appbar
    const _handleSearch = () => console.log('Searching');

    return(
        <View>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title="Documentos"/>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} />
                </Appbar.Header>
            </SafeAreaView>
            <Text>Documentos</Text>
        </View>
    )
}