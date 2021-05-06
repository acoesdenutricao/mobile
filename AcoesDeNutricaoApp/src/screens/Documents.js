import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Appbar, Text, Button} from 'react-native-paper';

export default function Documents({ navigation }) {
    return(
        <View>
            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Referencias')}>Referências</Button>
            <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>Documentos Técnicos</Button>
            <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>Documentos Legais</Button>
            <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>Manuais de Apoio</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    button:{
        marginTop: 12,
        marginHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
    },
})