const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const bringPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;   
    }
}

const showPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading";
    pokemonNumber.innerHTML = "##";
    pokemonImage.src = "./images/loading.gif";

    const data = await bringPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '404';
    }
    input.value = '';
}

form.addEventListener('submit', event=>{
    event.preventDefault();
    showPokemon(input.value.toLowerCase());
})

buttonNext.addEventListener('click', event=>{
    searchPokemon += 1;
    showPokemon(searchPokemon);
});
buttonPrev.addEventListener('click', event => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        showPokemon(searchPokemon);
    }
});

showPokemon(searchPokemon);