import React, { createContext, useState } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [pokePrincipal, setPokePrincipal] = useState([]);
  const [pokeSalvaje, setPokeSalvaje] = useState([]);
  const [pokeball, setPokeball] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [evolucionando, setEvolucionando] = useState([]);




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
    evolucionando,
    setEvolucionando,

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