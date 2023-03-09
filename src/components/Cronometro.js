import { useState, useEffect, useCallback, useContext } from "react";
import { MyContext } from "../MyContext";

//Función para guardar la experiencia(tiempo) que necesita cada nivel pasa acceder a él.
const xpParaSubirNivel = [0];
for (let i = 1; i < 100; i++) {
  xpParaSubirNivel[i] = xpParaSubirNivel[i - 1] + i * 60;
}

function Cronometro() {
    
    const [activo, setActivo] = useState(false);
    const [detenido, setDetenido] = useState(false);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [seleccionado, setSeleccionado] = useState(false);
    const {pokeball, setPokeball, pokePrincipal,nivel, setNivel,tiempo, setTiempo } = useContext(MyContext);

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
        setTiempo(0);
        setActivo(false);
        setDetenido(false);
    }, [setTiempo]);

    //Hook useEffect encargada para aumentar el tiempo, la experiencia y el nivel
    useEffect(() => {
        let intervalo = null;
        if (activo && !detenido) {
            intervalo = setInterval(() => {
                setTiempo((tiempo) => tiempo + 1000);
                setTiempoTotal((tiempoTotal) => tiempoTotal + 1000);
                const xpNivelActual = xpParaSubirNivel[nivel];
                if (tiempoTotal >= xpNivelActual) {
                    setNivel((nivel) => nivel + 1);
                }
                if(nivel === 100){
                    setActivo(false);
                    setDetenido(true);
                    setTiempo(0);
                    console.log("Has llegado al máximo nivel")
                }
            }, 1000);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [activo, detenido, nivel, setNivel, setTiempo, tiempo, tiempoTotal]);


    useEffect(() => {
        if (nivel === 10){
            setPokeball((pokeball) => pokeball + 1);
            } else if(nivel % 20 === 0) {
            setPokeball((pokeball) => pokeball + 1);}

}, [nivel, setPokeball]);


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

    useEffect(() =>{
        if(pokePrincipal.id > 0 ){
            setSeleccionado(true)
        };
    }, [pokePrincipal]);

    if(nivel === 100){
        return(
            <>
            <section>
                <p>Nivel: {nivel}</p>
                <p>Tiempo acumulado: {formatoTiempo(tiempoTotal)}</p>
                <p>Tienes: {pokeball} Pokeballs.</p>
            </section>
            <h1>Felicidades, alcanzaste el máximo nivel.</h1>
        </>
        );
    }


    return (
        <div>
            {seleccionado ? (
                <section>
                    <p>Nivel: {nivel}</p>
                    <p>Tiempo acumulado: {formatoTiempo(tiempoTotal)}</p>
                    <p>Tienes: {pokeball} Pokeballs.</p>
                    <h1>{formatoTiempo(tiempo)}</h1>
                    <button onClick={iniciar}>Iniciar/Continuar.</button>
                    <button onClick={pausa}>Pausar.</button>
                    <button onClick={reiniciar}>Reiniciar.</button>
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

