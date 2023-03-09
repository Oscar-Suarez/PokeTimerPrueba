import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [pokePrincipal, setPokePrincipal] = useState([]);
  const [pokeSalvaje, setPokeSalvaje] = useState([]);
  const [pokeball, setPokeball] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [tiempo, setTiempo] = useState(0);
  const [ coleccionPokes, setColeccionPokes] = useState([])


  useEffect(() => {
    const updatedPokeSalvaje = pokeSalvaje.map(pokemon => ({
      ...pokemon,
      nivel,
      tiempo
    }));
    setColeccionPokes(updatedPokeSalvaje);
  }, [pokeSalvaje, nivel, tiempo, setColeccionPokes]);

  const contextValue = {
    pokePrincipal,
    setPokePrincipal,
    pokeSalvaje,
    setPokeSalvaje,
    pokeball,
    setPokeball,
    nivel,
    setNivel,
    tiempo,
    setTiempo,
    coleccionPokes
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContextProvider, MyContext };




  

  // useEffect(() => {
  //   const updatedColeccionPokes = coleccionPokes.map((pokemon) => ({
  //     ...pokemon,
  //     nivel: pokemon.nivel || nivel,
  //     tiempo: pokemon.tiempo || tiempo,
  //   }));
  //   setColeccionPokes(updatedColeccionPokes);
  // }, [coleccionPokes, nivel, tiempo, setColeccionPokes]);