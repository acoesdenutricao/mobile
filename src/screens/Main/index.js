import React from 'react';
import { Container, StyledText, LoadingIcon } from "./styles";
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from "@react-navigation/native";

export default () => {

    return (
        <Container>
            <StyledText>Main</StyledText>
        </Container>
    );
}