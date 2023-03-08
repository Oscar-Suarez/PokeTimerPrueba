import './App.css';
import AppBar from './components/AppBar'
import PokePrincipal from './components/PokePrincipal';
import Cronometro from './components/Cronometro';
import Iniciales from './components/Iniciales'
import PokeSalvaje from './components/PokeSalvaje';
import Coleccion from './components/Coleccion';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { MyContextProvider } from './MyContext';


function App() {

  return (
    <MyContextProvider>
    <div className="App">

      <Router>
      <AppBar/>
        <Routes>
          <Route path='/' element={[<Iniciales key={"iniciales" } />, ]} />
          <Route path='/Perfil' element={[<PokePrincipal key={"pp"}/>, <Cronometro key={"crono"}/>]}/>
          <Route path='/Prueba' element={[<PokeSalvaje key={"PokeSalvaje"}/>, ]}/>
          <Route path='/Prueba2' element = {[<Iniciales key={"iniciales" } />, <PokeSalvaje key={"PokeSalvaje"}/>, <Coleccion key={"Coleccion"}/>]}/>
        </Routes>
      </Router>
    </div>
    </MyContextProvider>
  );
}

export default App;

