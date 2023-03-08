import React, { createContext, useState } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [pokePrincipal, setPokePrincipal] = useState([]);
  const [pokeSalvaje, setPokeSalvaje] = useState([]);

  const contextValue = {
    pokePrincipal,
    setPokePrincipal,
    pokeSalvaje,
    setPokeSalvaje
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContextProvider, MyContext };

