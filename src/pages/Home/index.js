import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import api, {key} from '../../services/api'

import {Banner, BannerButton, Container, Input, SearchButton, SearchContainer, SliderMovie, Title,} from "./style";
import {Feather} from "@expo/vector-icons";

import Header from '../../components/Header'
import SliderItem from "../../components/SliderItem";
import getListMovies from "../../utils/movie";

function Home() {
    const [nowMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),

                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),

                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])

            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(5, popularData.data.results);
            const topList = getListMovies(5, topData.data.results);

            setNewMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);
        }

        getMovies();
    }, [])

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

            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>
                <BannerButton activeOpacity={0.9} onPress={() => alert("Teste")}>
                    <Banner
                        resizeMethod="resize"
                        source={{uri: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1031&q=80'}}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({item}) => <SliderItem data={item} /> }
                    keyExtractor={ (item) => String(item.id) }
                />

                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={ ({item}) => <SliderItem data={item} /> }
                    keyExtractor={ (item) => String(item.id) }
                />

                <Title>Mais votados</Title>
                <SliderMovie
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={ ({item}) => <SliderItem data={item} /> }
                    keyExtractor={ (item) => String(item.id) }
                />
            </ScrollView>
        </Container>
    )
}

export default Home;