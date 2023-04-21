import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import '../styles/Iniciales.css'
import { MyContext } from "../MyContext";





function Iniciales(){

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const {pokeSalvaje, setPokeSalvaje, setPokePrincipal,pokeInfoActual, BE_URL  } = useContext(MyContext); //Este context se usa para conectar los datos de los pokémon random
    const id = localStorage.getItem("id");

    



    //Función para consumir la API
useEffect(() => {
    async function fetchData() {
        setIsLoading(true); 
      try {
        const iniciales = ['4', '258', '810'];
        const data = await Promise.all(iniciales.map(name => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)));
        const pokemonList = await Promise.all(data.map(async response => {
          const speciesRespuesta = await axios.get(response.data.species.url);
          const evolutionChainRespuesta = await axios.get(speciesRespuesta.data.evolution_chain.url);
          let cadenaEvo = null;
          let cadenaEvoDos = null;
          if (evolutionChainRespuesta.data.chain.evolves_to.length > 0) {
            cadenaEvo = evolutionChainRespuesta.data.chain.evolves_to[0].species;
            cadenaEvoDos = evolutionChainRespuesta.data.chain.evolves_to[0].evolves_to[0].species;
          }
          return {
...response.data,
            name: response.data.name.toUpperCase(),
            pixSprite: response.data.sprites.front_default,
            fullSprite: response.data.sprites.other["official-artwork"].front_default,
            tipos: response.data.types,
            nivel: 0,
            tiempo: 0,
            evoluciones : cadenaEvo,
            segundaEvo : cadenaEvoDos
          };
        }));
        setIsLoading(false);
        console.log(pokemonList)
        setPokemonData(pokemonList);
        // const primerPokemon = pokemonList[0];
        // setPokeInfoActual({
        //     name: primerPokemon.name.toUpperCase(),
        //     pixSprite: primerPokemon.sprites.front_default,
        //     fullSprite: primerPokemon.sprites.other["official-artwork"].front_default,
        //     tipos: primerPokemon.types,
        //     nivel: 0,
        //     tiempo: 0,
        //     evoluciones : primerPokemon.evoluciones,
        //     segundaEvo : primerPokemon.segundaEvo,
        //     dex: primerPokemon.id
        // })

      } catch(error){
        console.error(error);

      console.log('Error al obtener datos del servidor:', error.message);
      }
    }
    fetchData();
  }, []);
  



//    //Función para guardar pokémon en la base de datos.
//    const guardarPokemonEnBD = async () => {
//     try {
//       await axios.post(BE_URL, {
//         name: pokeInfoActual.name,
//         pixSprite: pokeInfoActual.pixSprite,
//         fullSprite: pokeInfoActual.fullSprite,
//         tipos: pokeInfoActual.tipos,
//         nivel: pokeInfoActual.nivel,
//         tiempo: pokeInfoActual.tiempo,
//         evoluciones: pokeInfoActual.evoluciones,
//         segundaEvo: pokeInfoActual.segundaEvo,
//         dex: pokeInfoActual.dex,
//         idUsuario: id
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

    //Función para saber qué poke se eligió y agregarlo al array
    const elegirPoke = (pokemon) => {
        setPokeSalvaje(prevPokes => [...prevPokes, pokemon]);
        console.log(`${pokemon.name} - Dex nacional: #${pokemon.id}`);
        setPokePrincipal(pokemon);
        const guardarPokemonEnBD = async () => {
            try {
              await axios.post(BE_URL, {
                name: pokemon.name,
                pixSprite: pokemon.pixSprite,
                fullSprite: pokemon.fullSprite,
                tipos: pokemon.tipos,
                nivel: pokemon.nivel,
                tiempo: pokemon.tiempo,
                evoluciones: pokemon.evoluciones,
                segundaEvo: pokemon.segundaEvo,
                dex: pokemon.dex,
                idUsuario: id
              });
            } catch (error) {
              console.error(error);
            }
          };
        guardarPokemonEnBD();
        console.log(pokeInfoActual);
    };
    



    //Para modificar el Doom al momento de elegir el pokemon
    if (isLoading) {
        return (
            <div>
                <h1>Encontrando las pokeballs de los iniciales...</h1>
            </div>
        );
    }else if (pokeSalvaje.length > 0) {
        return (
            <div>
                {pokeSalvaje.map((pokemon, index) => (
                    <div key={index}>
                        <h2>¡Elegiste a {pokemon.name} como tu inicial!</h2>
                        <img
                            src={pokemon.fullSprite}
                            alt={pokemon.name}
                        />
                        <h1>Dex nacional: #{pokemon.id}</h1>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="iniciales">
                {pokemonData.map((pokemon, index) => (
                    <div key={index} className="info">
                        <h1>{pokemon.name}</h1>
                        <img
                            src={pokemon.fullSprite}
                            alt={pokemon.name}
                        />
                        <div className="details">
                            <h1>Dex nacional: #{pokemon.id}</h1>
                            <button onClick={() => elegirPoke(pokemon)}>¡{pokemon.name}, yo te elijo!</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Iniciales;
