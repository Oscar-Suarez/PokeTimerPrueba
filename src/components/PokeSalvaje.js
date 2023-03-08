import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { MyContext } from "../MyContext";

function PokeSalvaje(){

    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [pokeElegido, setPokeElegido] = useState(null);

    const {setPokeSalvaje} = useContext(MyContext); //Este context se usa para conectar los datos de los pokémon random

    //Función para consumir la API
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=386');
            const data = await Promise.all(response.data.results.map(pokemon => axios.get(pokemon.url)));
            setPokemonData(data.map(response => ({
            ...response.data,
            name: response.data.name.toUpperCase()
                })));
            setLoading(false);
        }
        fetchData();
    }, []);

    //Función para elegir un poke aleatoriamente y mostrarlo
    const random = () => {
        let randomIndex = Math.floor(Math.random() * 386); // Generar índice aleatorio
        let selectedPokemon = pokemonData[randomIndex];
        if (selectedPokemon) {
            setPokeElegido(selectedPokemon);


    // Guarda los datos de los pokemon salvajes en el useContext
    setPokeSalvaje((pokeSalvaje) => [...pokeSalvaje, selectedPokemon]);
        }


    };





    //Para modificar el Doom al momento de elegir el pokemon
    if (pokeElegido) {
        const { name, id, sprites } = pokeElegido;
        return (
            <div>
                <h2>¡Atrapaste a: {name}!</h2>
                <img
                    src={sprites.other["official-artwork"].front_default}
                    alt={name}
                />
                <h1>Dex nacional: #{id}</h1>


                <button onClick={random}>
                    Otro pokémon
                </button>
            </div>
        );
    }


    return (
        <div>
            {loading ? <p>Cargando...</p> :
                <div className="iniciales">
                    <button onClick={random}>¡Un Pokémon salvaje apareció!</button>
                </div>
            }

        </div>
    );
}

export default PokeSalvaje;








