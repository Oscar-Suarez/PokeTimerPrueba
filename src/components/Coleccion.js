import { useContext, useState } from "react";
import { MyContext } from "../MyContext";

function Coleccion() {
  const { pokeSalvaje } = useContext(MyContext); //Colección de pokémon
  const [setPokeSeleccionado] = useState(null); //Estado para guardar el pokemon seleccionado
  const { setPokePrincipal } = useContext(MyContext); //Seleccionar pokémon principal

  const seleccionar = (pokemon) => {
    console.log(`Seleccionaste a ${pokemon.name}`);
    setPokeSeleccionado(pokemon); //Actualiza el estado para guardar el pokemon seleccionado
    setPokePrincipal(pokemon)
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
        {pokeSalvaje.map((coleccion, index) => (
          <li key={index}>
            {coleccion.name}{" "}
            <img src={coleccion.sprites.front_default} alt="" />
            <p>
              Tipo(s):&nbsp;
              {coleccion.types.map((type, index) => (
                <span key={index}>
                  {typesTranslations[type.type.name]}
                  {index < coleccion.types.length - 1 ? " / " : ""}
                </span>
              ))}
            </p>

            <button onClick={() => seleccionar(coleccion)}>
              Elegir como pokémon principal.
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Coleccion;
