import React, { useState, useContext } from "react";
import { MyContext } from "../MyContext";

function InicioSesion() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const{setSesionIniciada} = useContext(MyContext);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí podrías hacer la lógica para enviar los datos a un servidor, autenticar al usuario, etc.
        console.log({
            username,
            password,
        });
        setSesionIniciada(true)
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input type="text" value={username} onChange={handleUsernameChange} required />
            </label>
            <br />
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} required />
            </label>
            <br />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}




export default InicioSesion;