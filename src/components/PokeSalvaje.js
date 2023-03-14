import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { MyContext } from "../MyContext";


function PokeSalvaje() {


  const [pokemonData, setPokemonData] = useState([]);
  const [pokeElegido, setPokeElegido] = useState(null);

  const { setPokeSalvaje, pokeball, setPokeball, pokePrincipal, setEvolucionando, setEstaEvolucionado, estaEvolucionado, unaEvo, setUnaEvo } = useContext(MyContext);

  //Función para consumir la API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=386');
        const data = await Promise.all(response.data.results.map(pokemon => axios.get(pokemon.url)));
        const listaPokemon = await Promise.all(data.map(async response => {

          //En estas constantes se guarda la petición para saber si tiene evoluciones el pokémon.
          const speciesRespuesta = await axios.get(response.data.species.url);
          const evolutionChainRespuesta = await axios.get(speciesRespuesta.data.evolution_chain.url);

          //Esta sección funciona para almacenar la información de la primera y segunda evolución del pokémon.
          let cadenaEvo = null;
          let cadenaEvoDos = null;
          if (evolutionChainRespuesta.data.chain.evolves_to.length > 0) {
            cadenaEvo = evolutionChainRespuesta.data.chain.evolves_to[0]?.species;
            cadenaEvoDos = evolutionChainRespuesta.data.chain.evolves_to[0]?.evolves_to[0]?.species;
          }
          return {
            ...response.data,
            name: response.data.name.toUpperCase(),
            nivel: 0,
            tiempo: 0,
            evoluciones: cadenaEvo,
            segundaEvo: cadenaEvoDos,
            ultimaEvo : estaEvolucionado,
            soloUnaEvo : unaEvo
          };
        }));

        setPokemonData(listaPokemon);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [estaEvolucionado, pokePrincipal, pokePrincipal.evoluciones, setEstaEvolucionado, setEvolucionando, setUnaEvo, unaEvo]);





  //Función para elegir un poke aleatoriamente y mostrarlo
  const random = () => {
    let randomIndex = Math.floor(Math.random() * 386); // Generar índice aleatorio
    let pokemonSeleccionado = pokemonData[randomIndex];
    if (pokemonSeleccionado) {
      setPokeElegido(pokemonSeleccionado);
      setPokeSalvaje((pokeSalvaje) => [...pokeSalvaje, pokemonSeleccionado]);// Guarda los datos de los pokemon salvajes en el useContext
    }
  };

  //Función para utilizar las pokeball para atrapar más pokémon
  const usarOtraPokeball = () => {
    if (pokeball > 1) {
      random();
    }
    setPokeball((pokeball) => pokeball - 1);
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








