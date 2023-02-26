import './App.css';
import AppBar from './components/AppBar'
import PokePrincipal from './components/General';
import Cronometro from './components/Cronometro';
import Iniciales from './components/Iniciales'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';

function App() {
  return (

    <div className="App">

      <Router>
      <AppBar/>
        <Routes>
          <Route path='/' element={[<Iniciales key={"iniciales"}/>, ]}/>
          <Route path='/Perfil' element={[<PokePrincipal key={"pp"}/>, <Cronometro key={"crono"}/>]}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
