import axios from "axios";

// URL filmes em cartaz
// https://api.themoviedb.org/3
// /movie/now_playing? &language=pt-BR &page=1

export const key = '370d64e573228898eee3c6f7061c106e';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;