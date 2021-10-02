// Gerar uma lista de filmes com um tamanho específico.

function getListMovies(size, movies) {
    let popularMovies = [];

    for(let i=0, l=size; i<l; i++)
        popularMovies.push(movies[i]);

    return popularMovies;
}

export default getListMovies;