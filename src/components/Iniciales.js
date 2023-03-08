import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import '../styles/Iniciales.css'
import { MyContext } from "../MyContext";


function Iniciales(){


    const [pokemonData, setPokemonData] = useState([]);
    const [pokeElegido, setPokeElegido] = useState([]);
    const {setPokeSalvaje} = useContext(MyContext); //Este context se usa para conectar los datos de los pokémon random

    

    //Función para consumir la API
    useEffect(() => {
        const iniciales = ['4', '258', '810'];
        async function fetchData() {
          const data = await Promise.all(iniciales.map(name => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)));
          setPokemonData(data.map(response => ({
            ...response.data,
            name: response.data.name.toUpperCase()
          })));

        }
        fetchData();
    }, []);


    //Función para saber qué poke se eligió y agregarlo al array
    const elegirPoke = (pokemon) => {
        setPokeElegido(prevPokes => [...prevPokes, pokemon]);
        console.log(`${pokemon.name} - Dex nacional: #${pokemon.id}`);
        setPokeSalvaje(prevPokes => [...prevPokes, pokemon]); //Se actualiza el array del useContext
    };



    //Para modificar el Doom al momento de elegir el pokemon
    if (pokeElegido.length > 0) {
        return (
            <div>
                {pokeElegido.map((pokemon, index) => (
                    <div key={index}>
                        <h2>¡Elegiste a {pokemon.name} como tu inicial!</h2>
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default}
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
                            src={pokemon.sprites.other["official-artwork"].front_default}
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
