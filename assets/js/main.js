function htmlTipos(pokemonTypes) {
    return pokemonTypes.map((typeName) => `<li class="type">${typeName}</li>`)
}


function htmlPokemon(pokemon) {
    return `<li class="pokemon">
                <span class="number">${pokemon.numero}</span>
                <span class="name">${pokemon.nome}</span>

                <div class="detail">
                    <ol class="types">
                        ${htmlTipos(pokemon.tipos).join('')}                        
                    </ol>

                    <img src="${pokemon.imagem}"
                        alt="${pokemon.nome}">
                </div>
            </li>`
}

const htmlPokemonList = document.getElementById("pokemonList");
//Versão Simplificada com Arrow Function
pokeApi.getPokemon().then((pokemonList = []) => {
    //Versão super resumida do map
    const newHtml = pokemonList.map(htmlPokemon).join('')
    htmlPokemonList.innerHTML += newHtml
})
    .catch((error) => console.log(error))
    .finally(() => console.log("Requisição concluída"))







    
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
