import './App.css';
import AppBar from './components/AppBar'
import PokePrincipal from './components/General';
import Cronometro from './components/Cronometro';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <PokePrincipal/>
      <Cronometro/>
    </div>
  );
}

export default App;
