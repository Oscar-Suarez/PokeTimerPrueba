import "../styles/AppBar.css";
import bl1 from "../assets/img/bl1.png"

function AppBar() {
    return(
        <nav className="navbar">
            <div className="nav-container">
                <div className='nav-left'>
                    <a href='/'>
                        <img alt='PokeTimer' className='nav-img' src={bl1}></img>
                    </a>
                </div>
                <div className="nav-links">
                    <a href='/'>Personas en el espacio</a>
                    <a href='/'>Foto de astronomía del día</a>
                    <a href='/'>Lorem lorem lorem </a>
                </div>
            </div>
        </nav>
    )

}
export default AppBar;