import { useState, useEffect, useCallback, useContext } from "react";
import { MyContext } from "../MyContext";
import axios from 'axios';

//Función para guardar la experiencia(tiempo) que necesita cada nivel pasa acceder a él.
const xpParaSubirNivel = [0];
for (let i = 1; i < 100; i++) {
    xpParaSubirNivel[i] = xpParaSubirNivel[i - 1] + i * 80;
}

function Cronometro() {
    const [activo, setActivo] = useState(false);
    const [detenido, setDetenido] = useState(false);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [seleccionado, setSeleccionado] = useState(false);
    const [tiempoLocal, setTiempoLocal] = useState(0);
    const [evolucionEjecutada, setEvolucionEjecutada] = useState(false);
    const { pokeball, setPokeball, pokePrincipal, nivel, setNivel, tiempo, setTiempo, setPokeSalvaje, pokeSalvaje, setEvolucionando, medallas, setMedallas } = useContext(MyContext);

    //Función para iniciar el cronómetro.
    const iniciar = useCallback(() => {
        setActivo(true);
        setDetenido(false);
    }, []);

    //Función para pausar el cronómetro.
    const pausa = useCallback(() => {
        setActivo(false);
        setDetenido(true);
    }, []);

    //Función para reiniciar el cronómetro.
    const reiniciar = useCallback(() => {
        setTiempoLocal(0);
        setActivo(false);
        setDetenido(false);
    }, []);




    //Hook useEffect encargada para aumentar el tiempo, la experiencia y el nivel
    useEffect(() => {
        let intervalo = null;

        if (activo && !detenido) {
            if (pokePrincipal.tiempo === 0 && pokePrincipal.nivel === 0) {
                setTiempo(0);
                setNivel(1);
            } else if (pokePrincipal.tiempo !== 0 && pokePrincipal.nivel !== 1) {
                setTiempo(() => pokePrincipal.tiempo);
                setNivel(() => pokePrincipal.nivel);
            }
            if (pokePrincipal) {
                pokePrincipal.nivel = nivel;
                pokePrincipal.tiempo = tiempo;
                console.log(pokePrincipal.nivel);
            }
            //Funcionalidades para aumentar tiempo y nivel para cada pokémon seleccionado como principal; además de aumentar el tiempo total y el tiempo local del cronómetro.
            intervalo = setInterval(() => {
                setTiempo((tiempo) => tiempo + 10000);
                setTiempoTotal((tiempoTotal) => tiempoTotal + 10000);
                setTiempoLocal((tiempoLocal) => tiempoLocal + 10000);
                const xpNivelActual = xpParaSubirNivel[nivel];
                if (pokePrincipal.tiempo >= xpNivelActual) {
                    setNivel((nivel) => nivel + 1);
                    if (pokePrincipal.nivel === 10) {
                        setPokeball((pokeball) => pokeball + 1);
                    } else if (pokePrincipal.nivel % 20 === 0 && pokePrincipal.nivel !== 0 && pokePrincipal.nivel === 50) {
                        setPokeball((pokeball) => pokeball + 1);

                    }
                }

                //Bucle necesario para detener el reloj una vez se llega al nivel 100
                if (pokePrincipal.nivel === 100 && nivel === 100) {
                    setActivo(false);
                    setDetenido(true);
                    console.log("Has llegado al máximo nivel")
                    setPokeball((pokeball) => pokeball + 5);
                    setMedallas((medallas) => medallas + 1);
                    console.log(medallas);
                }

                // Bucle necesario para evolucionar el Pokémon cada cierto nivel
                if (pokePrincipal.nivel === 45 && pokePrincipal.evoluciones && !evolucionEjecutada && pokePrincipal.segundaEvo?.name?.toUpperCase() !== pokePrincipal.name) {

                    //Esta variable se declara para saber si el pokémon tiene 1 o 2 evoluciones, se intercambia la url dependiendo de la cantidad de evoluciones que tenga y también en caso de que no tenga evoluciones
                    let link = ``
                    if(pokePrincipal.evoluciones && pokePrincipal.evoluciones?.name?.toUpperCase() !== pokePrincipal.name){
                        link = `https://pokeapi.co/api/v2/pokemon/${pokePrincipal.evoluciones?.name}`;
                    } else if (pokePrincipal.evoluciones && pokePrincipal.evoluciones?.name?.toUpperCase() === pokePrincipal.name && pokePrincipal.segundaEvo){
                        link = `https://pokeapi.co/api/v2/pokemon/${pokePrincipal.segundaEvo?.name}`
                    } else{
                        return console.log("Es la última evo");
                    }
                    axios.get(`${link}`)
                        .then(response => {
                            // Devuelve el nuevo estado que se quiere asignar a evolucionando
                            return {
                                ...response.data,
                                name: response.data.name.toUpperCase(),
                                nivel: 0,
                                tiempo: 0,
                                evoluciones: pokePrincipal.segundaEvo,
                            };
                        })
                        .catch(error => {
                            console.error(error);
                            return null;
                        })
                        .then(nuevoPokemon => {
                            if (nuevoPokemon) {
                                setEvolucionando(nuevoPokemon);
                                setPokeSalvaje(pokeSalvaje => [...pokeSalvaje, nuevoPokemon]);
                                console.log(`¡${pokePrincipal.name} ha evolucionado!`);
                                console.log(`COLECCCIÓN DE POKES ${pokeSalvaje.map(pokemon => pokemon.name).join(', ')}`);
                                setEvolucionEjecutada(true); //Esta const se declara para que el bucle solo se repita 1 vez por cada evolución
                            }
                        });
                }
            }, 1000);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [activo, detenido, evolucionEjecutada, medallas, nivel, pokePrincipal, pokeSalvaje, setEvolucionando, setMedallas, setNivel, setPokeSalvaje, setPokeball, setTiempo, tiempo]);


    //Función para formatear el tiempo en horas, minutos y segundos.
    const formatoTiempo = (tiempo) => {
        const padTiempo = (tiempo) => {
            return tiempo.toString().padStart(2, "0");
        };
        const segundos = padTiempo(tiempo % 60);
        const minutos = padTiempo(Math.floor(tiempo / 60) % 60);
        const horas = padTiempo(Math.floor(tiempo / 3600));
        return `${horas}:${minutos}:${segundos}`;
    };
    useEffect(() => {
        if (pokePrincipal.id > 0) {
            setSeleccionado(true)
            setTiempo(() => pokePrincipal.tiempo);
            setNivel(() => pokePrincipal.nivel);
        };
    }, [pokePrincipal, setTiempo, setNivel]);

    //Bucle necesario para cambiar de pantalla una vez se llega al nivel 100
    if (nivel === 100) {
        return (
            <>
                <section>
                    <p>Nivel: {nivel}</p>
                    <p>Tiempo acumulado: {formatoTiempo(tiempoTotal)}</p>
                    <p>Tienes: {pokeball} Pokeballs.</p>
                </section>
                <h1>Felicidades, alcanzaste el máximo nivel.</h1>
                <h1>Tiempo que has usado a {pokePrincipal.name}: </h1>
                <h1>{formatoTiempo(pokePrincipal.tiempo)}</h1>
            </>
        );
    }


    return (
        <div>
            {seleccionado ? (
                <section>
                    <h1>{formatoTiempo(tiempoLocal)}</h1>
                    <button onClick={iniciar}>Iniciar/Continuar.</button>
                    <button onClick={pausa}>Pausar.</button>
                    <button onClick={reiniciar}>Reiniciar.</button>
                    <p>Nivel: {pokePrincipal.nivel}</p>
                    <p>Tienes: {pokeball} Pokeballs.</p>
                    <h1>Tiempo que has usado a {pokePrincipal.name}: </h1>

                    <h1>{formatoTiempo(pokePrincipal.tiempo)}</h1>
                </section>
            ) : (
                <div>
                    <h1>¡Bienvenid@ al PokeTimer!</h1>
                </div>
            )}
        </div>
    );
}

export default Cronometro;


