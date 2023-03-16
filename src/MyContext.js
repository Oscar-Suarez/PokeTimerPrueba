import React, { createContext, useState } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [pokePrincipal, setPokePrincipal] = useState([]);
  const [pokeSalvaje, setPokeSalvaje] = useState([]);
  const [pokeball, setPokeball] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [evolucionando, setEvolucionando] = useState([]);
  const [estaEvolucionado, setEstaEvolucionado] = useState(false);
  const [unaEvo, setUnaEvo] = useState(false);
  const [medallas, setMedallas] = useState(0);
  const [sesionIniciada, setSesionIniciada] = useState(false);




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
    estaEvolucionado,
    setEstaEvolucionado,
    unaEvo,
    setUnaEvo,
    medallas,
    setMedallas,
    sesionIniciada,
    setSesionIniciada
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContextProvider, MyContext };



