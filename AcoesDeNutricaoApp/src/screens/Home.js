import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { Avatar, Appbar, Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Home({ navigation }) {
    /*Informa se os dados da API já estão carregados */
    const [isListaSujeitosLoading, setListaSujeitosLoading] = useState(true);
    const [isListaNiveisIntervencaoLoading, setListaNiveisIntervencaoLoading] = useState(true);
    const [isListaAcoesLoading, setListaAcoesLoading] = useState(true);

    /* Estado da tela inicial entre principal e histórico */
    const [selectedTab, setSelectedTab] = useState(0);

    const [sujeitoAbordagem, setSujeitoAbordagem] = useState(0); //sujeito da abordagem selecionado
    const [nivelIntervencao, setNivelIntervencao] = useState(0); // nivel de intervencao selecionado
    const [selectedAcao, setSelectedAcao] = useState(0); // acao selecionada


    /* Armazena as listas de informações */
    const [listaSujeitoAbordagem, setListaSujeitoAbordagem] = useState([]) // lista os sujeitos da abordagem
    const [listaNiveisIntervencao, setListaNiveisIntervencao] = useState([]) // lista os sujeitos da abordagem
    const [listaAcao, setListaAcao] = useState([]); // lista as acoes para o sujeito e nivel selecionados
    const [listaAcaoTemp, setListaAcaoTemp] = useState([]); // lista as acoes para o sujeito e nivel selecionados (versao temporaria da API)


    function atualizaDadosSelecionados(sjtAbordagem, nvlIntervencao) {
        setListaAcao([]);
        setListaAcaoTemp([]);

        if (sjtAbordagem != 0) {
            setSujeitoAbordagem(sjtAbordagem);
            if (sjtAbordagem != 0 && nivelIntervencao != 0) {
                carregarDadosListaAcao(sjtAbordagem, nivelIntervencao);
            }
        }
        if (nvlIntervencao != 0) {
            setNivelIntervencao(nvlIntervencao);
            if (sujeitoAbordagem != 0 && nvlIntervencao != 0) {
                carregarDadosListaAcao(sujeitoAbordagem, nvlIntervencao);
            }
        }
    }

    //carrega todas as acoes correspondentes ao sujeito e nivel selecionados
    function carregarDadosListaAcao(sjtAbordagem, nvlIntervencao) {
        requestURL = '';
        let requestURL = "http://191.252.202.56:4000/information/" + sjtAbordagem + "/" + nvlIntervencao + "/categories"; //Armazena link responsável pela requisicao
        let request = new XMLHttpRequest(); //Instancia um objeto de solicitacao
        request.open('GET', requestURL);
        request.send();
        request.onload = function () {

            var dados = [];

            dadosAPI = JSON.parse(request.responseText);

            dadosAPI.map(function (item, indice) {
                item.information_categories.map(function (item, indice) {
                    let actionId = item.action_id;
                    dados.push({
                        id: actionId,
                        category_name: item.category_information_category.category
                    })
                })
            });

            setListaAcao(dados);
            setListaAcoesLoading(false);

        }
    }

    //busca sujeitos da abordagem
    useEffect(() => {
        fetch('http://191.252.202.56:4000/approach-subjects', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setListaSujeitoAbordagem(json))
            .catch((error) => console.error(error))
            .finally(() => setListaSujeitosLoading(false));
    }, []);

    //busca niveis de intervencao
    useEffect(() => {
        fetch('http://191.252.202.56:4000/intervation-levels', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setListaNiveisIntervencao(json))
            .catch((error) => console.error(error))
            .finally(() => setListaNiveisIntervencaoLoading(false));
    }, []
    );


    const ButtonGrid = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonGrid}
                activeOpacity={0.6}
                underlayColor="transparent"
                activeTextColor="white"
                onPress={() => atualizaDadosSelecionados(props.id, 0)}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={50} icon={props.iconName} />
                    <Text>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const ButtonGridActive = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonGridActive}
                activeOpacity={0.6}
                underlayColor="#3c9891"
                onPress={() => atualizaDadosSelecionados(props.id, 0)}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar.Icon style={{ backgroundColor: "transparent" }} color="white" size={50} icon={props.iconName} />
                    <Text style={{ color: 'white' }}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const ButtonTextGridNivelIntervencao = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonTextGrid}
                activeOpacity={0.6}
                underlayColor="transparent"
                onPress={() => atualizaDadosSelecionados(0, props.id)}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const ButtonTextGridNivelIntervencaoActive = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonTextGridActive}
                activeOpacity={0.6}
                underlayColor="#3c9891"
                onPress={() => atualizaDadosSelecionados(0, props.id)}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const ButtonTextGridAcao = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonTextGrid}
                activeOpacity={0.6}
                underlayColor="transparent"
                onPress={() => setSelectedAcao(props.id)}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const ButtonTextGridAcaoActive = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonTextGridActive}
                activeOpacity={0.6}
                underlayColor="#3c9891"
                onPress={() => setSelectedAcao(props.id)}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <View style={styles.container}>
            {/* Menu principal */}
            <SafeAreaView>
                <MaterialTabs
                    items={['Ações de Alimentação', 'Histórico']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor='#f1f3f2'
                    indicatorColor='#3c9891' //verde oliva
                    activeTextColor='#3c9891' //verde oliva
                    inactiveTextColor='#3c9891' //verde oliva
                />
            </SafeAreaView>

            {selectedTab == 1 ? //Se selectTab for igual a histórico
                //Histórico
                <ScrollView>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Comunidade</Text></View>
                                <View style={{ flexDirection: 'row' }}><Text style={{ fontSize: 14, color: "grey", textAlignVertical: 'center' }}>03/05/2020</Text><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Assistência, Tratamento e Cuidado</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Ações Universais</Text></View>
                            </View>
                        </Card.Content>
                    </Card>
                    {/*replicas*/}
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Comunidade</Text></View>
                                <View style={{ flexDirection: 'row' }}><Text style={{ fontSize: 14, color: "grey", textAlignVertical: 'center' }}>03/05/2020</Text><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Assistência, Tratamento e Cuidado</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Ações Universais</Text></View>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Comunidade</Text></View>
                                <View style={{ flexDirection: 'row' }}><Text style={{ fontSize: 14, color: "grey", textAlignVertical: 'center' }}>03/05/2020</Text><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Assistência, Tratamento e Cuidado</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Ações Universais</Text></View>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Comunidade</Text></View>
                                <View style={{ flexDirection: 'row' }}><Text style={{ fontSize: 14, color: "grey", textAlignVertical: 'center' }}>03/05/2020</Text><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star-outline" /></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Assistência, Tratamento e Cuidado</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>Ações Universais</Text></View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>

                :

                <ScrollView style={styles.container}>

                    {/* Sujeito da abordagem */}
                    <Text style={styles.gridTitle}>Selecionar sujeito da Abordagem</Text>
                    {isListaSujeitosLoading ? <ActivityIndicator size='large' /> : (
                        <FlatList
                            data={listaSujeitoAbordagem}
                            keyExtractor={({ id }, index) => id.toString()}
                            numColumns={3}
                            renderItem={({ item }) => (
                                sujeitoAbordagem == item.id ?
                                    <ButtonGridActive iconName='account-outline' text={item.subject} id={item.id}></ButtonGridActive>
                                    :
                                    <ButtonGrid iconName='account-outline' text={item.subject} id={item.id}></ButtonGrid>

                            )}
                        />
                    )}

                    {/* Nivel de Intervencao*/}
                    <Text style={styles.gridTitle}>Selecionar o nível de intervenção</Text>
                    {isListaNiveisIntervencaoLoading ? <ActivityIndicator size='large' /> : (
                        <FlatList
                            data={listaNiveisIntervencao}
                            keyExtractor={({ id }, index) => id.toString()}
                            numColumns={2}
                            renderItem={({ item }) => (
                                nivelIntervencao == item.id ?
                                    <ButtonTextGridNivelIntervencaoActive text={item.title} id={item.id}></ButtonTextGridNivelIntervencaoActive>
                                    :
                                    <ButtonTextGridNivelIntervencao text={item.title} id={item.id}></ButtonTextGridNivelIntervencao>

                            )}
                        />
                    )}

                    {/* Selecão da ação*/}
                    <Text style={styles.gridTitle}>Selecionar Ação</Text>

                    {nivelIntervencao == 0 || sujeitoAbordagem == 0 ?
                        <Text style={{ textAlign: 'center' }}>Selecione um sujeito da abordagem e um nivel de intervenção primeiro</Text>
                        :
                        isListaAcoesLoading ? <ActivityIndicator size='large' /> : (
                            <FlatList
                                data={listaAcao}
                                keyExtractor={({ id }, index) => id.toString()}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    selectedAcao == item.id ?
                                        <ButtonTextGridAcaoActive text={item.category_name} id={item.id}></ButtonTextGridAcaoActive>
                                        :
                                        <ButtonTextGridAcao text={item.category_name} id={item.id}></ButtonTextGridAcao>
                                )}
                            />)
                    }

                    <SafeAreaView style={{ padding: 10 }}>
                        <Button mode="contained"
                            disabled={selectedAcao == 0}
                            onPress={() => navigation.navigate('Information',
                                { selectedAcao: selectedAcao }
                            )}>
                            Buscar
                        </Button>
                    </SafeAreaView>
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    },
    grid: {
        margin: 5,
        flex: 1,
        flexDirection: 'row'
    },
    item: {
        alignItems: "center",
        backgroundColor: "#dcda48",
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
    },
    gridTitle: {
        marginTop: 10,
        marginLeft: 15,
        alignSelf: 'flex-start',
    },
    buttonGrid: {
        borderStyle: 'solid',
        borderColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
        alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
    },

    buttonGridActive: {
        borderStyle: 'solid',
        borderColor: '#3c9891',
        backgroundColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
        alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
    },

    buttonTextGrid: {
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
        margin: 5,
        height: 70,
        alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
    },

    buttonTextGridActive: {
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#3c9891',
        backgroundColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 15,
        margin: 5,
        height: 70,
        alignItems: "center",
        flexGrow: 1,
        flexBasis: 0,
    },
});