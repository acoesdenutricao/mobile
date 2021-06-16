import React, { useEffect, useState } from 'react';
import { Touchable } from 'react-native';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Appbar, Text, Card, Avatar ,ActivityIndicator } from 'react-native-paper';
import Favoritos from '../services/sqlite/Favoritos';

export default function Favorites({ navigation }) {
    const [listaFavoritos, setListaFavoritos] = useState([]);
    const [isListaFavoritosLoading, setListaFavoritosLoading] = useState(true);

    useEffect(() => {
        buscaFavoritos();
    },[])

    function buscaFavoritos(){
        Favoritos.all()
        .then( 
          Favoritos => setListaFavoritos(Favoritos)
        )
        setListaFavoritosLoading(false);
    }

    function desfavoritar(id){
        setListaFavoritosLoading(true);
        Favoritos.remove(id);
        setListaFavoritosLoading(false);
        buscaFavoritos();
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Content title="Favoritos" />
                </Appbar.Header>
            </SafeAreaView>
                {isListaFavoritosLoading ? <ActivityIndicator size='large' /> : (
                    <FlatList
                        data={listaFavoritos}
                        keyExtractor={({ id }, index) => id.toString()}
                        renderItem={({ item }) => (
                            <Card style={styles.card}>
                                <Card.Content>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="google-circles-communities" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{item.nomeSujeito}</Text></View>
                                        <View style={{ flexDirection: 'row' }}><Text style={{ fontSize: 14, color: "grey", textAlignVertical: 'center' }}>{item.data}</Text><TouchableOpacity onPress={() => desfavoritar(item.id)}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="star" /></TouchableOpacity></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#b393cb" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{item.nomeIntervencao}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}><Avatar.Icon style={{ backgroundColor: "transparent" }} color="#3c9891" size={40} icon="label" /><Text style={{ fontSize: 16, textAlignVertical: 'center' }}>{item.nomeAcao}</Text></View>
                                    </View>
                                </Card.Content>
                            </Card>
                        )}
                    />)
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
})