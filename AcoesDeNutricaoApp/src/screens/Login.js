import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Title, Button } from 'react-native-paper';

export default function Login({ navigation, route }) {
    //efetua o login (TO-DO)
    const logar = (login, senha) => {
        global.login = true;
        navigation.navigate('Home');
    }

    //armazena o nome de usuário
    const [usuario, setUsuario] = useState('');

    //armazena a senha digitada
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Login</Title>

            <TextInput
                style={styles.textInput}
                value={usuario}
                mode="outlined"
                placeholder="Nome de usuário"
                onChangeText={usuario => setUsuario(usuario)}
            />
            
            <Title style={styles.title}>Senha</Title>

            <TextInput
                style={styles.textInput}
                value={senha}
                secureTextEntry
                mode="outlined"
                placeholder="Senha"
                right={<TextInput.Icon name="eye" />}
                onChangeText={senha => setSenha(senha)}
            />

            <Button mode="contained" onPress={() => logar(usuario, senha)}>Entrar</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
        marginVertical: 50,
    },
    textInput:{
        backgroundColor: 'white',
        margin: 15,
        borderColor: '#3c9891'
    },
    title:{
        textAlign: 'center',
    },
})