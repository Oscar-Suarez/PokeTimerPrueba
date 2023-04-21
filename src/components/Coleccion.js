import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Coleccion() {
  const { setPokePrincipal } = useContext(MyContext);
  const id = localStorage.getItem("id");

  const [coleccionPokes, setColeccionPokes] = useState([]);

  //Función para seleccionar el pokémon principal que se usará en el cronómetro.
  const seleccionar = (pokemon) => {
    console.log(`Seleccionaste a ${pokemon.name}`);
    setPokePrincipal(pokemon);
  };

  useEffect(() => {
    const traerPokes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/getPokemon?idUsuario=${id}`
        );
        const data = response.data;
        setColeccionPokes(data);
      } catch (error) {
        console.error(error);
      }
    };

    traerPokes();
  }, []);



  const traduccionTipos = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
  };
  const traducir = (type) => traduccionTipos[type];

  return (
    <div>
      <ul>
        {coleccionPokes.map((coleccion, index) => (
          <>
            <li key={index} className="poke">
              {coleccion.name} <img src={coleccion.pixSprite} alt="" />
              <p>#{coleccion.id}</p>
              <p>
                Tipo(s):&nbsp;
                {coleccion.tipos.map((type, index) => (
                  <span key={index}>
                    {traducir(type.type.name)}
                    {index < coleccion.tipos.length - 1 ? " / " : ""}
                  </span>
                ))}
              </p>
              <p>nivel: {coleccion.nivel}</p>
              <Link to="/Perfil">
                <button onClick={() => seleccionar(coleccionPokes)}>
                  Elegir como pokémon principal.
                </button>
              </Link>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Coleccion;

//Función para ordenar los pokémon por número en la pokedex coleccion.sort((a, b) => a.id - b.id).map((coleccion, index)

/* <select>
<option value="opcion1">por orden captura</option>
<option value="opcion2">por número en pokedex</option>
</select> */
