import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Appbar, Text, Card} from 'react-native-paper';

export default function References({navigation}){
    return(
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content><Text>BRASIL. Conselho Nacional dos Secretários de Saúde (CONASS). A gestão administrativa e financeira do SUS. Brasília, 2007. (Coleção Progestores para entender a gestão do SUS, 2).</Text></Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
})