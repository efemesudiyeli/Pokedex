const pokedexRow = document.querySelector('.pokedex');
const detailsButton = document.getElementById('details');
const detailsPopupRow = document.querySelector('.details-popup')

async function getPokedex() {

    console.info('Pokedex fetching...')

    const api = await fetch('https://pokeapi.co/api/v2/pokedex/1/')
    const data = await api.json();


    return data.pokemon_entries;
}

async function getPokemonDetails(pokemonID) {

    try {

        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        const data = await api.json();
        return data

    }
    catch (error) {

        console.log(error)
    }
}

async function showPokemons() {

    const pokemons = await getPokedex()

    for (const pokemon of pokemons) {

        let pokemonDetails = await getPokemonDetails(pokemon.entry_number)
        let typesOfPokemon = [];
        pokemonDetails.types.forEach(element => {
            typesOfPokemon.push(element.type.name)
        })

        let imgSource
        if (pokemonDetails.sprites.front_default != null) {
            imgSource = ` 
            
            <img src="${pokemonDetails.sprites.front_default}"
                            class="card-img-top" alt="${pokemon.pokemon_species.name}">
            
            `
        } else {
            imgSource = ` 
            
            <img src="img/missing.png"
                            class="card-img-top" alt="${pokemon.pokemon_species.name}">
            
            `
        }

        let html = `  
                <div class="pokecard col-lg-2 col-md-4 col-sm-6">
                    <div class="card">
                       ${imgSource}
                        <div class="card-body">
                            <h5 class="card-title">${pokemon.pokemon_species.name}</h5>
                            <p class="card-text"><small class="">
                            ${typesOfPokemon.toString()}            
                            </small></p>

                            <a id="details" href="#" data-pokeid="${pokemon.entry_number}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
        
        `
        pokedexRow.insertAdjacentHTML("beforeend", html)
    }

}


showPokemons();


async function showDetails(pokemonDetails) {

    let imgSource
    if (pokemonDetails.sprites.front_default != null) {
        imgSource = ` 
            
            <img src="${pokemonDetails.sprites.front_default}"
                            class="card-img-top" alt="${pokemonDetails.name}">
            
            `
    } else {
        imgSource = ` 
            
            <img src="img/missing.png"
                            class="card-img-top" alt="${pokemonDetails.name}">
            
            `
    }

    let html = `
    
        <div class="col-12">
            <div class="card">
              ${imgSource}
                <div class="card-body">
                    <h5 class="card-title">${pokemonDetails.name}</h5>
                    <hr>
                    <p class="card-text">
                    
                    <div class="detailed-info row">
                    <div class="col-3 ">${pokemonDetails.stats[0].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[0].base_stat}</div>
                    <div class="col-3 ">${pokemonDetails.stats[1].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[1].base_stat}</div>
                    <div class="col-3 ">${pokemonDetails.stats[2].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[2].base_stat}</div>
                    <div class="col-3 ">${pokemonDetails.stats[3].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[3].base_stat}</div>
                    <div class="col-3 ">${pokemonDetails.stats[4].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[4].base_stat}</div>
                    <div class="col-3 ">${pokemonDetails.stats[5].stat.name}</div>
                    <div class="col-3">${pokemonDetails.stats[5].base_stat}</div>
                 
                    </div>

                  
                    <a id="close" href="#/" class="btn btn-primary">Close</a>
                </div>
            </div>
        </div>
    
    `
    detailsPopupRow.style.display = 'block';
    detailsPopupRow.innerHTML = html;


}

document.querySelector('main').addEventListener('click', async (e) => {
    if (e.target.id == 'details') {

        let pokemonDetails = await getPokemonDetails(e.target.getAttribute('data-pokeid'))
        console.log(pokemonDetails)
        showDetails(pokemonDetails)


    }
    e.preventDefault()
})

document.querySelector('main').addEventListener('click', async (e) => {
    if (e.target.id == 'close') {

        detailsPopupRow.style.display = 'none';

    }
    e.preventDefault()
})



