import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, Appbar } from 'react-native-paper';


export default function Information({ navigation, route }) {

    //Configurações da appbar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
            ),
        });
    });

    return (
        <View style={styles.container}>
            {/*cabeçalho com dados a respeito da informação*/}
            <View style={{ backgroundColor: '#EBEDED' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Comunidade</Text></View>
                    <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Assistência, Tratamento e Cuidado</Text></View>
                </View>
            </View>

            {/*conteudo da informação*/}
            <ScrollView>
                <Text>Sujeito da Abordagem = {route.params.sujeitoAbordagem}</Text>
                <Text>Nivel da Intervencao = {route.params.nivelIntervencao}</Text>
                <Text>Acao Selecionada = {route.params.selectedAcao}</Text>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
                <View style={styles.chapter}>
                    <Text style={styles.number}>1.</Text>
                    <Text style={styles.text}>Diagnóstico nutricional, avaliação e monitoramento do estado nutricional, com base nos dados dietéticos, clínicos, bioquímicos e antropométricos (verificação do peso e da altura), de acordo com a fase do curso da vida;</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chapter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 0
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    }
})