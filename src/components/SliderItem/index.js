import React from "react";
import {BannerItem, Container, Rate, RateContainer, Title} from "./style";

import {Ionicons} from '@expo/vector-icons';

function SliderItem({ data, navigatePage }) {
    return (
        <Container activetyOpacity={0.7} onPress={ () => navigatePage(data) }>
            <BannerItem
                source={{ uri: `https://image.tmdb.org/t/p/original${data.poster_path}` }}
            />

            <Title numberOfLines={1}>{data.title}</Title>

            <RateContainer>
                <Ionicons name='md-star' size={12} color='#E7A74E'/>
                <Rate>{data.vote_average}/10</Rate>
            </RateContainer>
        </Container>
    )
}

export default SliderItem;