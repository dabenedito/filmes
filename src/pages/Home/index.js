import React from "react";
import {Text} from "react-native";

import {Container, Input, SearchButton, SearchContainer,} from "./style";
import {Feather} from "@expo/vector-icons";

import Header from '../../components/Header'

function Home() {
    return (
        <Container>
            <Header title={"React Prime"}/>

            <SearchContainer>
                <Input
                    placeholder={"Qual filme quer ver?"}
                    placeholderTextColor={'#DDD'}
                />
                <SearchButton>
                    <Feather name='search' size={30} color={'#FFF'}/>
                </SearchButton>
            </SearchContainer>

            <Text>TELA HOME</Text>
        </Container>
    )
}

export default Home;