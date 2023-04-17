import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const [inputs, setInputs] = useState({
        correo: "",
        nombre: "",
        contraseña: "",
    });
    const [mensaje, setMensaje] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { nombre, contraseña, correo } = inputs;

    const HandleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nombre !== "" && contraseña !== "" && correo !== "") {
            const Usuario = {
                nombre,
                correo,
                contraseña,
            };
            setLoading(true);
            await axios
                .post("http://localhost:3030/register", Usuario)
                .then((res) => {
                    const { data } = res;
                    setMensaje(data.mensaje);
                    setInputs({ nombre: "", contraseña: "", correo: "" });
                    setTimeout(() => {
                        setMensaje("");
                        navigate("/InicioSesion");
                    }, 1500);
                })
                .catch((error) => {
                    console.error(error);
                    setMensaje("Hubo un error");
                    setTimeout(() => {
                        setMensaje("");
                    }, 1500);
                });

            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <h3>Bienvenido a la pagina</h3>
                <h2>De Registro!</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="cont">
                        <div className="cont">
                            <label htmlFor="nombre">Nombre de usuario: </label>
                            <input
                                onChange={(e) => HandleChange(e)}
                                value={nombre}
                                name="nombre"
                                id="nombre"
                                type="text"
                                placeholder="Nombre de usuario..."
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="cont">
                        <div className="cont">
                            <label htmlFor="correo">Correo: </label>
                            <input
                                onChange={(e) => HandleChange(e)}
                                value={correo}
                                name="correo"
                                id="correo"
                                type="email"
                                placeholder="Correo..."
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="cont">
                        <div className="">
                            <label htmlFor="contraseña">Contraseña: </label>
                            <input
                                onChange={(e) => HandleChange(e)}
                                value={contraseña}
                                name="contraseña"
                                id="contraseña"
                                type="password"
                                placeholder="Contraseña..."
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <button type="submit">
                        {loading ? "Cargando..." : "Registrarme"}
                    </button>
                    <p>
                        Ya tienes una cuenta?{" "}
                        <b onClick={() => navigate("/InicioSesion")}>Inicia Sesión!</b>
                    </p>
                </form>
            </div>
            {mensaje && <div className="cont">{mensaje}</div>}
        </>
    );
};

export default Registro;
