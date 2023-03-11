import { useState, useEffect, useCallback, useContext } from "react";
import { MyContext } from "../MyContext";


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
        setTiempoLocal(0);
        setActivo(false);
        setDetenido(false);
    }, []);




    //Hook useEffect encargada para aumentar el tiempo, la experiencia y el nivel
    useEffect(() => {
        let intervalo = null;

        if (activo && !detenido) {
            if(pokePrincipal.tiempo === 0 && pokePrincipal.nivel === 0){
                setTiempo(0);
                setNivel(1);
            } else if(pokePrincipal.tiempo !== 0 && pokePrincipal.nivel !== 1){
                setTiempo(() => pokePrincipal.tiempo);
                setNivel(() => pokePrincipal.nivel);
            }
            if(pokePrincipal){
                pokePrincipal.nivel = nivel;
                pokePrincipal.tiempo = tiempo;
                console.log(pokePrincipal.nivel);
            }
            intervalo = setInterval(() => {
                setTiempo((tiempo) => tiempo + 1000);
                setTiempoTotal((tiempoTotal) => tiempoTotal + 1000);
                setTiempoLocal((tiempoLocal) => tiempoLocal + 1000);
                const xpNivelActual = xpParaSubirNivel[nivel];
                if (pokePrincipal.tiempo >= xpNivelActual) {
                    setNivel((nivel) => nivel + 1);
                if (pokePrincipal.nivel === 10){
                    setPokeball((pokeball) => pokeball + 1);
                    } else if(pokePrincipal.nivel % 20 === 0 && pokePrincipal.nivel !== 0) {
                    setPokeball((pokeball) => pokeball + 1);}
                }
                if(pokePrincipal.nivel === 100 && nivel === 100){
                    setActivo(false);
                    setDetenido(true);
                    console.log("Has llegado al máximo nivel")
                }
            }, 1000);
        } else {
            clearInterval(intervalo);
        }
        return () => clearInterval(intervalo);
    }, [activo, detenido, nivel, pausa, pokePrincipal, setNivel, setPokeball, setTiempo, tiempo, tiempoTotal]);


    console.log(pokePrincipal.evoluciones)

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
            setTiempo(() => pokePrincipal.tiempo);
            setNivel(() => pokePrincipal.nivel);
        };
    }, [pokePrincipal, setTiempo, setNivel]);




    if(nivel === 100){
        return(
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
