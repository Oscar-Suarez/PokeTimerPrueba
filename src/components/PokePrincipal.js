import { useContext } from "react";
import { MyContext } from "../MyContext";
import { Link } from 'react-router-dom';



function PokePrincipal() {
  const { pokePrincipal } = useContext(MyContext);


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
      {pokePrincipal.name ? (
        <section className="infoPoke">
          <h1>{pokePrincipal.name}</h1>
          {pokePrincipal.sprites && <img src={pokePrincipal.sprites.other["official-artwork"].front_default} alt="Poke Principal" />}
          <h1>Dex nacional: #{pokePrincipal.id}</h1>
          <p>
            Tipo(s):&nbsp;
            {pokePrincipal.types.map((type, index) => (
              <span key={index}>
                {typesTranslations[type.type.name]}
                {index < pokePrincipal.types.length - 1 ? " / " : ""}
              </span>
            ))}
          </p>
          <Link to="/Colección">
            <button>Cambiar Pokémon.</button>
          </Link>
        </section>
      ) : (
        <div>
          <Link to="/Iniciales"><button>Elegir Pokémon inicial.</button></Link>
        </div>
      )}
    </div>
  );


}

export default PokePrincipal;


