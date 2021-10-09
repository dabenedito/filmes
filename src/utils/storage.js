import AsyncStorage from "@react-native-async-storage/async-storage";
import {ToastAndroid} from "react-native";

// Buscar filmes salvos
export async function getMoviesSaved(key) {
    const myMovies = await AsyncStorage.getItem(key);
    return JSON.parse(myMovies) || [];
}

// Salvar novo filme
export async function saveMovie(key, newMovie) {
    let moviesStored = await getMoviesSaved(key);
    const hasMovie = moviesStored.some(item => item.id === newMovie.id);

    if (hasMovie)
        return;

    moviesStored.push(newMovie);
    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
    ToastAndroid.show("Filme salvo em sua lista!", ToastAndroid.SHORT);
}

// Deletar filme específico da lista
export async function deleteMovie(id) {
    let moviesStored = await getMoviesSaved('@primereact');
    let myMovies = moviesStored.filter( item => {
        return (item.id !== id)
    })
    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));
    ToastAndroid.show("Filme removido da lista", ToastAndroid.SHORT);
}

// Filtrar filmes salvos da lista
export async function hasMovie(movie) {
    let moviesStored = await getMoviesSaved('@primereact');

    return moviesStored.find( item => item.id === movie.id);
}