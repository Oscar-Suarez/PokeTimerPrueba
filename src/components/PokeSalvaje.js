import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { MyContext } from "../MyContext";

function PokeSalvaje(){


    const [pokemonData, setPokemonData] = useState([]);
    const [pokeElegido, setPokeElegido] = useState(null);
    const {setPokeSalvaje, pokeball, setPokeball} = useContext(MyContext);
    
    //Función para consumir la API
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=386');
            const data = await Promise.all(response.data.results.map(pokemon => axios.get(pokemon.url)));
            const pokemonList = data.map(response => ({
            ...response.data,
            name: response.data.name.toUpperCase()
            }));
          const legendaryProbability = 0.01; // 1%
          const mythicalProbability = 0.02; // 2%
            const filteredList = pokemonList.filter(pokemon => {
            if (pokemon.is_legendary) {
                return Math.random() < legendaryProbability;
            }
            if (pokemon.is_mythical) {
                return Math.random() < mythicalProbability;
            }
            return true;
            });
            setPokemonData(filteredList);

        }
        fetchData();
        }, []);


    //Función para elegir un poke aleatoriamente y mostrarlo
    const random = () => {
        let randomIndex = Math.floor(Math.random() * 386); // Generar índice aleatorio
        let selectedPokemon = pokemonData[randomIndex];
        if (selectedPokemon) {
            setPokeElegido(selectedPokemon);
        setPokeSalvaje((pokeSalvaje) => [...pokeSalvaje, selectedPokemon]);// Guarda los datos de los pokemon salvajes en el useContext
        }
    };


    const usarOtraPokeball = () =>{
        if(pokeball > 1){
            random();
        }
        setPokeball((pokeball)=> pokeball - 1);
    }

    return (
        <div>
          {pokemonData.length > 0 ? (
            pokeball > 0 ? (
              pokeElegido ? (
                <div>
                  <h2>¡Atrapaste a: {pokeElegido.name}!</h2>
                  <img
                    src={
                      pokeElegido.sprites.other["official-artwork"].front_default
                    }
                    alt={pokeElegido.name}
                  />
                  <h1>Dex nacional: #{pokeElegido.id}</h1>
                  <button onClick={usarOtraPokeball}>
                    ¡Un Pokémon salvaje apareció!
                  </button>
                </div>
              ) : (
                <div className="iniciales">
                  <button onClick={random}>¡Un Pokémon salvaje apareció!</button>
                </div>
              )
            ) : (
              <h1>No tienes pokeball disponibles</h1>
            )
          ) : (
            <p>Verificando las pokeball disponibles...</p>
          )}
        </div>
      );
}

export default PokeSalvaje;








