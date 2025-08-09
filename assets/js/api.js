const pokeApi = {}

function convertApiPokeToModelPoke(detalhesPokemon) {
    const pokemon = new Pokemon()
    pokemon.nome = detalhesPokemon.name
    pokemon.numero = detalhesPokemon.id


    const tipos = detalhesPokemon.types.map((typeSlot) => typeSlot.type.name)
    const [tipo] = tipos

    pokemon.tipos = tipos
    pokemon.tipoMain = tipo

    pokemon.imagem = detalhesPokemon.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemon = (offset, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonbody) => jsonbody.results)
        .then
        (
            (pokemons) => {
                return pokemons.map(
                    (pokemon) => fetch(pokemon.url)
                        .then((response) => response.json())
                        .then(convertApiPokeToModelPoke)
                )
            }
        )
        .then(
            (detalhesRequests) => Promise.all(detalhesRequests)
        )
        .then(
            (detalhesPokemon) => detalhesPokemon)


}



