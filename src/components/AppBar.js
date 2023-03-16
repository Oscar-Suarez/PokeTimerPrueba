import "../styles/AppBar.css";
import bl1 from "../assets/img/bl1.png";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../MyContext";

function AppBar() {
    const{sesionIniciada} = useContext(MyContext);

    return(


        <nav className="navbar">
            {sesionIniciada ? (
            <div className="nav-container">
                <div className='nav-left'>
                    <Link to={"/Perfil"}>
                    <img alt='PokeTimer' className='nav-img' src={bl1}></img>
                    </Link>

                </div>
                <div className="nav-links">
                    <Link to={"/Perfil"} >
                    <h3>Perfil/Timer</h3>
                    </Link>
                    <Link to={"/PokeSalvaje"} >
                    <h3>Pokémon salvaje</h3>
                    </Link>
                    <Link to={"/Colección"} >
                    <h3>Colección/Pokedex</h3>
                    </Link>
                </div>
            </div>
            ):(
            <div className="nav-container">
                <div className='nav-left'>
                    <Link to={"/"}>
                    <img alt='PokeTimer' className='nav-img' src={bl1}></img>
                    </Link>
                </div>
                <div className="nav-links">
                    <Link to={"/InicioSesion"} >
                    <h3>Iniciar Sesión</h3>
                    </Link>
                    <Link to={"/Registro"} >
                    <h3>Registrarse</h3>
                    </Link>
                </div>
            </div>

    ) }
        </nav>
    )

}
export default AppBar;