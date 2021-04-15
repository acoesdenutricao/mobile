import React, { useEffect } from 'react';
import { Container, StyledText, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from "@react-navigation/native";

export default () => {

    const navigation = useNavigation();


    useEffect(()=>{

        const checkToken = async ()=>{
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // validar token de admmin
            }
            else {
                navigation.navigate('Main')
            }
        }

        checkToken();



    }, []);

    
    return (
        <Container>
            <StyledText>NutriSUS</StyledText>
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}