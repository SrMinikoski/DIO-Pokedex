
//Etapa Transformando nossa lista de Pokémon em uma lista de HTML

const limit = 15;
const offset = 0;
const url = "https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}";


function htmlPokemon(pokemon) {
    return `<li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="${pokemon.name}">
                </div>
            </li>`
}


const htmlPokemonList = document.getElementById("pokemonList");


//Versão Simplificada com Arrow Function
fetch(url)
.then ((response) => response.json())
.then((jsonbody) => jsonbody.results)
.then((pokemonList) => {
    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        htmlPokemonList.innerHTML += htmlPokemon(pokemon);
    }
})
.catch( (error)=> console.log(error))
.finally(() => console.log("Requisição concluída"))














// Versão Extendida
// fetch(url)
// .then (function(response) {
//     return response.json();
// })
// .then(function(jsonbody) {
//     console.log(jsonbody);
// })
// .catch(function (error) {
//     console.log(error);
// })
// .finally(function() {  
//     console.log("Requisição concluída");
// });
