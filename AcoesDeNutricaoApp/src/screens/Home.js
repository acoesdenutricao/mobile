import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableHighlight, ScrollView, PanResponder } from 'react-native';
import { Avatar, Appbar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function Home({ navigation }) {
    const [isLoading, setLoading] = useState(true);

    //Conexao API Example
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    });

    /* Estado da tela inicial entre principal e histórico */
    const [selectedTab, setSelectedTab] = useState(0);

    const [sujeitoAbordagem, setSujeitoAbordagem] = useState(0);
    const [nivelIntervencao, setNivelIntervencao] = useState(0);
    const [selectedAcao, setSelectedAcao] = useState(0);


    const ButtonGrid = (props) => {
        return (
            <TouchableHighlight
                style={styles.buttonGrid}
                activeOpacity={0.6}
                underlayColor="#3c9891"
                onPress={() => setSujeitoAbordagem(props.id)}>
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
                onPress={() => setSujeitoAbordagem(props.id)}>
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
                underlayColor="#3c9891"
                onPress={() => setNivelIntervencao(props.id)}>
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
                onPress={() => setNivelIntervencao(props.id)}>
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
                underlayColor="#3c9891"
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

                <ScrollView>
                    <Text>sujeitoAbordagem: {sujeitoAbordagem}</Text>
                    <Text>nivelIntervencao: {nivelIntervencao}</Text>
                    <Text>selectedAcao: {selectedAcao}</Text>

                    {/* Sujeito da abordagem */}
                    <Text style={styles.gridTitle}>Selecionar sujeito da Abordagem</Text>
                    <Grid style={styles.grid}>
                        <Col>
                            {sujeitoAbordagem == '1' ?
                                <ButtonGridActive iconName='account-outline' text='Indivíduo' id='1'></ButtonGridActive>
                                :
                                <ButtonGrid iconName='account-outline' text='Indivíduo' id='1'></ButtonGrid>
                            }
                        </Col>
                        <Col>
                            <TouchableHighlight
                                style={styles.buttonGrid}
                                activeOpacity={0.6}
                                underlayColor="#3c9891"
                                onPress={() => setSujeitoAbordagem('Família')}>
                                <View style={{ alignItems: 'center' }}>
                                    <Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={50} icon="account-group-outline" />
                                    <Text>Família</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                        <Col>
                            <TouchableHighlight
                                style={styles.buttonGrid}
                                activeOpacity={0.6}
                                underlayColor="#3c9891"
                                onPress={() => setSujeitoAbordagem('Comunidade')}>
                                <View style={{ alignItems: 'center' }}>
                                    <Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={50} icon="google-circles-communities" />
                                    <Text>Comunidade</Text>
                                </View>
                            </TouchableHighlight>
                        </Col>
                    </Grid>

                    {/* Nivel da abordagem  */}
                    <Text style={styles.gridTitle}>Selecionar o nível de intervenção</Text>
                    <Grid style={styles.grid}>
                        <Row>
                            <Col>
                                {nivelIntervencao == '1' ?
                                    <ButtonTextGridNivelIntervencaoActive text='Diagnóstico' id='1'></ButtonTextGridNivelIntervencaoActive>
                                    :
                                    <ButtonTextGridNivelIntervencao text='Diagnóstico' id='1'></ButtonTextGridNivelIntervencao>
                                }

                            </Col>
                            <Col>
                                <TouchableHighlight
                                    style={styles.buttonTextGrid}
                                    activeOpacity={0.6}
                                    underlayColor="#3c9891"
                                    onPress={() => setNivelAbordagem('Promoção da Saúde')}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>Promoção da Saúde</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TouchableHighlight
                                    style={styles.buttonTextGrid}
                                    activeOpacity={0.6}
                                    underlayColor="#3c9891"
                                    onPress={() => setNivelAbordagem('Prevenção de Doenças')}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>Prevenção de Doenças</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                            <Col>
                                <TouchableHighlight
                                    style={styles.buttonTextGrid}
                                    activeOpacity={0.6}
                                    underlayColor="#3c9891"
                                    onPress={() => setNivelAbordagem('Assistencia, Tratamento e Cuidado')}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center' }}>Assistencia, Tratamento e Cuidado</Text>
                                    </View>
                                </TouchableHighlight>
                            </Col>
                        </Row>
                    </Grid>

                    {/* Seleção da Ação  */}
                    <Text style={styles.gridTitle}>Selecionar Ação</Text>
                    <ScrollView>
                        <Grid style={styles.grid}>
                            <Row>
                                <Col>
                                    {selectedAcao == '1' ?
                                        <ButtonTextGridAcaoActive text='Ações Universais' id='1'></ButtonTextGridAcaoActive>
                                        :
                                        <ButtonTextGridAcao text='Ações Universais' id='1'></ButtonTextGridAcao>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('Gestantes')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Gestantes</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('0-6 meses')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>0-6 Meses</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('7-24 Meses')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>7-24 Meses</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('25-60 Meses')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>25-60 Meses</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('> 5-9 anos')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}> &gt; 5-9 anos</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('Adolescentes 10-19 anos')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Adolescentes (10-19 anos)</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('Adultos(20-59 anos)')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Adultos(20-59 anos)</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                                <Col>
                                    <TouchableHighlight
                                        style={styles.buttonTextGrid}
                                        activeOpacity={0.6}
                                        underlayColor="#3c9891"
                                        onPress={() => setSelectedAcao('Idosos (> 60 anos)')}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}> Idosos (&ge; 60 anos)</Text>
                                        </View>
                                    </TouchableHighlight>
                                </Col>
                            </Row>
                        </Grid>
                    </ScrollView>
                </ScrollView>
            }
            <SafeAreaView style={{ padding: 10 }}>
                <Button mode="contained"
                    onPress={() => navigation.navigate('Information',
                        { sujeitoAbordagem: sujeitoAbordagem, nivelIntervencao: nivelIntervencao, selectedAcao: selectedAcao }
                    )}>
                    Buscar
                    </Button>
            </SafeAreaView>
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
    },

    buttonGridActive: {
        borderStyle: 'solid',
        borderColor: '#3c9891',
        backgroundColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
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
    },
});