import React, { useState } from "react";

function Registro() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    const handleRegistration = (event) => {
        event.preventDefault();

        // Aquí podrías hacer la lógica para enviar los datos a un servidor, guardarlos en una base de datos, etc.
        console.log({
            name,
            username,
            email,
            birthdate,
            gender,
            password,
        });

        // Muestra el mensaje de éxito y restablece los campos del formulario a sus valores originales
        alert("¡Cuenta creada exitosamente!");
        setName("");
        setUsername("");
        setEmail("");
        setBirthdate("");
        setGender("");
        setPassword("");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={handleNameChange} required />
            </label>
            <br />
            <label>
                Nombre de usuario:
                <input type="text" value={username} onChange={handleUsernameChange} required />
            </label>
            <br />
            <label>
                Fecha de nacimiento:
                <input type="date" value={birthdate} onChange={handleBirthdateChange} required />
            </label>
            <br />
            <label>
                Género:
                <select value={gender} onChange={handleGenderChange} required>
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                    <option value="nonbinary">No binario</option>
                    <option value="prefer-not-to-say">Prefiero no responder</option>
                </select>
            </label>
            <br />
            <label>
                Correo electrónico:
                <input type="email" value={email} onChange={handleEmailChange} required />
            </label>
            <br />
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} required />
            </label>
            <br />
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default Registro;