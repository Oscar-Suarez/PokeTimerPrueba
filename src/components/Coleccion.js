import { useContext } from "react";
import { MyContext } from "../MyContext";
import { Link } from 'react-router-dom';


function Coleccion() {
  const { coleccionPokes, setPokePrincipal } = useContext(MyContext);

  const seleccionar = (pokemon) => {
    console.log(`Seleccionaste a ${pokemon.name}`);
    setPokePrincipal(pokemon);
    console.log(coleccionPokes);
  };

  const typesTranslations = {
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


  return (
    <div>
      <ul>
        {coleccionPokes.map((coleccion, index) => (
          <li key={index}>
            {coleccion.name}{" "}
            <img src={coleccion.sprites.front_default} alt="" />
            <p>#{coleccion.id}</p>
            <p>
              Tipo(s):&nbsp;
              {coleccion.types.map((type, index) => (
                <span key={index}>
                  {typesTranslations[type.type.name]}
                  {index < coleccion.types.length - 1 ? " / " : ""}
                </span>
              ))}
            </p>
            <p>nivel: {coleccion.nivel}</p>
            <Link to="/Perfil">
            <button onClick={() => seleccionar(coleccion)}>
              Elegir como pokémon principal.
            </button>
            </Link>
          </li>
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