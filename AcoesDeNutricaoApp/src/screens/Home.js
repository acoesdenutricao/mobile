import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import MaterialTabs from 'react-native-material-tabs';



export default function Home({navigation}){
    const [selectedTab, setSelectedTab] = useState(0);

    return(
        <View style={styles.container}>
            <SafeAreaView>
                <MaterialTabs
                items={['Ações de Alimentação', 'Histórico']}
                selectedIndex={selectedTab}
                onChange={setSelectedTab}
                barColor= '#f1f3f2'
                indicatorColor = '#3c9891' //verde oliva
                activeTextColor = '#3c9891' //verde oliva
                inactiveTextColor = '#3c9891' //verde oliva
                />
            </SafeAreaView>
            <Text style={styles.gridTitle}>Selecionar sujeito da Abordagem</Text>
            <View style={styles.grid}>
                <View style={styles.buttonGrid}>
                    <Avatar.Icon size={50} icon="account-outline" />
                    <Text>Individuo</Text>
                </View>
                <View style={styles.buttonGrid}>
                    <Avatar.Icon size={50} icon="account-group-outline" />
                    <Text>Familia</Text>
                </View>
                <View style={styles.buttonGrid}>
                    <Avatar.Icon size={50} icon="google-circles-communities" />
                    <Text>Comunidade</Text>
                </View>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    grid:{
        margin: 5,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    gridTitle:{
        marginTop: 10,
        marginLeft: 15,
        alignSelf: 'flex-start',
    },
    buttonGrid:{
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#3c9891',
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        margin: 5,
        width: '30%',
    },
  });