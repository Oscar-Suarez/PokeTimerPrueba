import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EvolutionChain({ chain }) {
  return (
    <ul>
      <li>{chain.species.name}</li>
      {chain.evolves_to.map((evolution) => (
        <EvolutionChain key={evolution.species.name} chain={evolution} />
      ))}
    </ul>
  );
}

function Dex() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const speciesResponse = await axios.get(pokemonResponse.data.species.url);
          const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
          return {
            ...pokemonResponse.data,
            evolutions: evolutionChainResponse.data.chain,
          };
        }));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {pokemon.evolutions ? (
            <EvolutionChain chain={pokemon.evolutions} />
          ) : (
            <p>This Pokemon has no evolutions</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dex;

