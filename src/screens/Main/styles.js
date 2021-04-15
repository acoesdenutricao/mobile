import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color : #08a494;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const StyledText = styled.Text`
    color: black;
    font-size: 44px;
    font-weight: bold;
    font-family: cursive;
    text-shadow: 25px 25px;
`;

export const LoadingIcon = styled.ActivityIndicator`
margin-top: 50px;
`;