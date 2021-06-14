import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Appbar, Avatar, Button , Modal, Portal} from 'react-native-paper';
import Favoritos from '../services/sqlite/Favoritos'

export default function Information({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [legenda, setLegenda] = useState([]);
    const [favorito, setFavorito] = useState(false);
    const [sujeitoAbordagem, setSujeitoAbordagem] = useState([]);
    const [nivelIntervencao, setNivelIntervencao] = useState([]);

    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 15, borderRadius: 5};


    const [informacao, setInformacao] = useState([]); // lista os sujeitos da abordagem
    const [informacaoLoading, setInformacaoLoading] = useState(true); // lista os sujeitos da abordagem

    //busca dados sobre o sujeito da abordagem selecionado
    useEffect(() => {
        let requestURL = 'http://191.252.202.56:4000/approach-subjects/' + route.params.idSujeitoAbordagem;
        let request = new XMLHttpRequest();
    
        request.open('GET', requestURL);
        request.send();
        request.onload = function () {
            setSujeitoAbordagem(JSON.parse(request.responseText));
        }
    }, [])

    //busca dados sobre o nivel de intervenção selecionado
    useEffect(() => {
            let requestURL = 'http://191.252.202.56:4000/intervation-levels/' + route.params.idNivelIntervencao;
            let request = new XMLHttpRequest();
        
            request.open('GET', requestURL);
            request.send();
            request.onload = function () {
                setNivelIntervencao(JSON.parse(request.responseText));
            }
        }, [])

    //Configurações da appbar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                    <Appbar.Action icon="magnify" color="white" onPress={showModal} />
                    <Appbar.Action icon="help-circle-outline" color="white" onPress={showModal} />
                </View>
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


    function favoritar(){
        if(favorito == false){
            //create
            Favoritos.create( {nomeSujeito: sujeitoAbordagem.subject, nomeIntervencao: nivelIntervencao.title, nomeAcao: 'Universal', idAcao:'route.params.selectedAcao', data: '14/06/2021'} )
            .then( id => console.log('Favoritos criado com o id: '+ id) )
            .catch( err => console.log(err))
            setFavorito(true);
        }
        else{
            setFavorito(false);
        }
    }
    return (
        <View style={styles.container}>
            {/*modal com as legendas*/}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ flexDirection: 'row', marginLeft: -10}}>
                        <View style={{ flexDirection: 'row'}}><Avatar.Icon style={{ backgroundColor: "transparent", marginLeft: 0 }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 14, textAlignVertical: 'center', fontWeight: 'bold' }}>Assistência, Tratamento e Cuidado</Text></View>
                    </View>
                    <Text>Identificação e avaliação do estado nutricional do usuário do SUS, elaborado com base em dados clínicos, bioquímicos, antropométricos e dietéticos, obtidos quando da avaliação nutricional e durante o acompanhamento individualizado;
Fonte do conceito: Resolução do. 380/2005 – CFN , com adaptações.</Text>
                    <Button style={{marginVertical: 5, alignSelf: 'flex-end', width: 100}} mode="contained" onPress={hideModal}>OK</Button>
                </Modal>
            </Portal>

            {/*cabeçalho com dados a respeito da informação*/}
            <View style={{ backgroundColor: '#EBEDED' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon={sujeitoAbordagem.icon_name} /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{sujeitoAbordagem.subject}</Text></View>
                    {favorito ? 
                        <View style={{ flexDirection: 'row' }}><TouchableOpacity onPress={favoritar}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star" /></TouchableOpacity></View>
                        :
                        <View style={{ flexDirection: 'row' }}><TouchableOpacity onPress={favoritar}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></TouchableOpacity></View>
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color={nivelIntervencao.color} size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{nivelIntervencao.title}</Text></View>
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