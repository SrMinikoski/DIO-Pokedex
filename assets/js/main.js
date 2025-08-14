function htmlTipos(pokemonTypes) {
    return pokemonTypes.map((typeName) => `<li class="type ${typeName}">${typeName}</li>`)
}

function htmlPokemon(pokemon) {
    return `
        <li class="pokemon ${pokemon.tipoMain}" onclick="redirectToDetail(${pokemon.numero})">
            <span class="number">#${pokemon.numero.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.nome}</span>
            <div class="detail">
                <ol class="types">
                    ${htmlTipos(pokemon.tipos).join('')}                        
                </ol>
                <img src="${pokemon.imagem}" alt="${pokemon.nome}">
            </div>
        </li>`
}

function redirectToDetail(pokemonId) {
    window.location.href = `detail.html?id=${pokemonId}`;
}

let offset = 0;
let limit = 4;
let pokemonCount = 0;

const htmlPokemonList = document.getElementById("pokemonList");

function updateCounter() {
    const counterElement = document.querySelector('.contagem span');
    if (counterElement) {
        counterElement.textContent = `Contagem: ${pokemonCount.toString().padStart(2, '0')}`;
    }
}

function loadPokemon(offset, limit) {
    pokeApi.getPokemon(offset, limit)
        .then((pokemonList = []) => {
            const newHtml = pokemonList.map(htmlPokemon).join('')
            htmlPokemonList.innerHTML += newHtml
            
            pokemonCount += pokemonList.length;
            updateCounter();
        })
        .catch((error) => console.log(error))
        .finally(() => console.log("Requisição concluída"))
}

loadPokemon(offset, limit);

function loadMore() {
    offset += limit;
    loadPokemon(offset, limit);
}

updateCounter();