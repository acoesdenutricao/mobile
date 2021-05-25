import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Text, Avatar, Appbar } from 'react-native-paper';


export default function Information({ navigation, route }) {

    const [informacao, setInformacao] = useState([]) // lista os sujeitos da abordagem
    const [informacaoLoading, setInformacaoLoading] = useState(true) // lista os sujeitos da abordagem


    //Configurações da appbar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
            ),
        });
    });

    //busca conteudo da informacao
    useEffect(() => {
        let requestURL = 'http://191.252.202.56:4000/information/action/' + route.params.selectedAcao;
        let request = new XMLHttpRequest();

        request.open('GET', requestURL);
        request.send();
        request.onload = function () {
            let arrayTemp = [];
            let arrayDadosSplitados = [];
            JSON.parse(request.responseText).map(function (item, indice) {
                arrayTemp = item.category_information_actions.information.split(";");
            })

            let iterator = 0;
            arrayTemp.forEach(element => {
                iterator++;
                arrayDadosSplitados.push({
                    id: iterator,
                    information: element.substr(3)
                })
            });

            setInformacao(arrayDadosSplitados);
        }
    }, [])

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
            <View style={styles.container}>
                <FlatList
                    data={informacao}
                    keyExtractor={({ id }, index) => id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.chapter}>
                            <Text style={styles.number}>{item.id}</Text>
                            <Text style={styles.text}>{item.information}</Text>
                        </View>
                    )}
                />
            </View>
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