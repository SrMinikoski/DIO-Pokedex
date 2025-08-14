document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    
    if (pokemonId) {
        loadPokemonDetail(pokemonId);
    }
});

function loadPokemonDetail(pokemonId) {
    pokeApi.getPokemonById(pokemonId)
        .then((pokemon) => {
            displayPokemonDetail(pokemon);
        })
        .catch((error) => console.log(error));
}

function displayPokemonDetail(pokemon) {
    // Update header
    document.querySelector('h1').textContent = pokemon.nome;
    
    // Update image
    const spriteImg = document.getElementById('sprite');
    spriteImg.src = pokemon.imagem;
    spriteImg.alt = pokemon.nome;
    
    // Update types
    const typesContainer = document.querySelector('.types');
    typesContainer.innerHTML = '';
    pokemon.tipos.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = `type ${type}`;
        typeSpan.textContent = type;
        typesContainer.appendChild(typeSpan);
    });
    
    // Update species, height, weight, abilities
    const speciesCell = document.querySelector('.vertical-table tr:nth-child(1) td');
    const heightCell = document.querySelector('.vertical-table tr:nth-child(2) td');
    const weightCell = document.querySelector('.vertical-table tr:nth-child(3) td');
    const abilitiesCell = document.querySelector('.vertical-table tr:nth-child(4) td');
    
    speciesCell.textContent = pokemon.species.split('-').join(' ');
    heightCell.textContent = `${pokemon.height} m`;
    weightCell.textContent = `${pokemon.weight} kg`;
    abilitiesCell.textContent = pokemon.abilities.join(', ');
    
    // Update stats
    const statsTable = document.querySelectorAll('.vertical-table')[1];
    statsTable.innerHTML = `
        <tr>
            <th>Vida:</th>
            <td>${pokemon.stats[0].value}</td>
        </tr>
        <tr>
            <th>Ataque:</th>
            <td>${pokemon.stats[1].value}</td>
        </tr>
        <tr>
            <th>Defesa:</th>
            <td>${pokemon.stats[2].value}</td>
        </tr>
        <tr>
            <th>Atq Esp:</th>
            <td>${pokemon.stats[3].value}</td>
        </tr>
        <tr>
            <th>Def Esp:</th>
            <td>${pokemon.stats[4].value}</td>
        </tr>
        <tr>
            <th>Velocidade:</th>
            <td>${pokemon.stats[5].value}</td>
        </tr>
        <tr>
            <th>Total:</th>
            <td>${pokemon.stats.reduce((total, stat) => total + stat.value, 0)}</td>
        </tr>
    `;
    
    // Update moves (you might want to limit this as some Pokémon have many moves)
    const movesSection = document.querySelector('article h2:last-of-type');
    if (movesSection) {
        const movesList = document.createElement('ul');
        
        pokemon.moves.slice(0, 10).forEach(move => {
            const moveItem = document.createElement('li');
            moveItem.textContent = move;
            movesList.appendChild(moveItem);
        });
        movesSection.parentNode.insertBefore(movesList, movesSection.nextSibling);
    }
}