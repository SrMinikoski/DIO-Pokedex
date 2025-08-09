function htmlTipos(pokemonTypes) {
    return pokemonTypes.map((typeName) => `<li class="type ${typeName}">${typeName}</li>`)
}


function htmlPokemon(pokemon) {
    return `<li>
        <a href="" class="pokemon ${pokemon.tipoMain}">
                <span class="number">${pokemon.numero}</span>
                <span class="name">${pokemon.nome}</span>

                <div class="detail">
                    <ol class="types">
                        ${htmlTipos(pokemon.tipos).join('')}                        
                    </ol>

                    <img src="${pokemon.imagem}"
                        alt="${pokemon.nome}">
                </div>
             </a>
            </li>`
}

let offset = 0
let limit = 10

const htmlPokemonList = document.getElementById("pokemonList");
//Versão Simplificada com Arrow Function

function loadPokemon(offset, limit){

        pokeApi.getPokemon(offset, limit)
        .then((pokemonList = []) => {
            //Versão super resumida do map
            const newHtml = pokemonList.map(htmlPokemon).join('')
            htmlPokemonList.innerHTML += newHtml
        })
            .catch((error) => console.log(error))
            .finally(() => console.log("Requisição concluída"))

}

loadPokemon(offset, limit);

function loadMore() {
    offset += limit;
    loadPokemon(offset, limit);
}


    
    // //Versão simplificada com MAP convertendo a lista de pokemon na lista de Li's do HTML
    // const listaConvert = pokemonList.map((pokemon) => {
    //     return htmlPokemon(pokemon)
    // });    

    // //Unindo os itens da lista
    // const newHtml = listaConvert.join('')
    
    // htmlPokemonList.innerHTML += newHtml






    // // Versão sem MAP
    // const listItem = []
    // for (let i = 0; i < pokemonList.length; i++) {
    //     const pokemon = pokemonList[i];
    //     listItem.push(htmlPokemon(pokemon))
    // }
    // console.log(listItem)







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
