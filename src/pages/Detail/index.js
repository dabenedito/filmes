import React, {useEffect, useState} from "react";
import {Modal, ScrollView} from "react-native";
import {
    Banner,
    ButtonLink,
    Container,
    ContentArea,
    Description,
    Header,
    HeaderButton,
    ListGenres,
    Rate,
    SliderMovie,
    Title
} from "./style";
import {Feather, Ionicons} from '@expo/vector-icons';
import {useNavigation, useRoute} from "@react-navigation/native";
import api, {key} from "../../services/api";
import Stars from "react-native-stars";
import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";
import SliderItem from "../../components/SliderItem";
import {getListMovies} from "../../utils/movie";
import {deleteMovie, hasMovie, saveMovie} from "../../utils/storage";

function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([])
    const [favoritedMovie, setFavoritedMovie] = useState(false);

    useEffect(() => {
        let isActive = true;

        async function getMovie() {
            const [response, similarData] = await Promise.all([
                api.get(`/movie/${route.params?.id}`, {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                    }
                }).catch((error) => {
                    console.log(error);
                }),

                api.get(`/movie/${route.params?.id}/similar`, {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }).catch((error) => {
                    console.log(error);
                })

            ])

            if (isActive) {
                setMovie(response.data);
                const isFavorite = await hasMovie(response.data);
                setFavoritedMovie(isFavorite);

                const similarMoviesList = getListMovies(3, similarData.data.results);
                setSimilarMovies(similarMoviesList);
            }
        }

        if (isActive)
            getMovie();

        return () => {
            isActive = false;
        }
    }, [])

    function navigateDetailPage(item) {
        navigation.navigate('Detail', {id: item.id});
    }

    async function handleFavoriteMovie(movie) {
        if (favoritedMovie) {
            await deleteMovie(movie.id)
            setFavoritedMovie(false);
        } else {
            await saveMovie('@primereact', movie);
            setFavoritedMovie(false);
        }
    }

    return (
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
                    <Feather
                        name={"arrow-left"}
                        size={28}
                        color={"#FFF"}
                    />
                </HeaderButton>

                <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
                    {favoritedMovie ? (
                        <Ionicons
                            name={"bookmark"}
                            size={28}
                            color={"#FFF"}
                        />
                    ) : (
                        <Ionicons
                            name={"bookmark-outline"}
                            size={28}
                            color={"#FFF"}
                        />
                    )}
                </HeaderButton>
            </Header>

            <Banner
                resizeMethod="resize"
                source={{uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`}}
            />

            <ButtonLink onPress={() => setOpenLink(true)}>
                <Feather
                    name="link"
                    size={24}
                    color={"#FFF"}/>
            </ButtonLink>

            <Title numberOfLines={2}>{movie.title}</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name={"md-star"} size={24} color={"#E7A74E"}/>}
                    emptyStar={<Ionicons name={"md-star-outline"} size={24} color={"#E7A74E"}/>}
                    halfStar={<Ionicons name={"md-star-half"} size={24} color={"#E7A74E"}/>}
                    disabled={true}
                />

                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>

            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <Genres data={item}/>}
            />

            <ScrollView>
                <Title>Descrição</Title>
                <Description>{movie?.overview}</Description>

                <Title>Filmes semelhantes</Title>
                <ContentArea>
                    <SliderMovie
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={similarMovies}
                        renderItem={
                            ({item}) => <SliderItem
                                data={item}
                                navigatePage={() => navigateDetailPage(item)}
                            />}
                        keyExtractor={(item) => String(item.id)}
                    />
                </ContentArea>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink
                    link={movie?.homepage}
                    title={movie?.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    )
}

export default Detail;