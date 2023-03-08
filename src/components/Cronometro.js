import { useState, useEffect, useCallback } from "react";

//Función para guardar la experiencia(tiempo) que necesita cada nivel pasa acceder a él.
const xpParaSubirNivel = [0];
for (let i = 1; i < 100; i++) {
  xpParaSubirNivel[i] = xpParaSubirNivel[i - 1] + i * 60;
}

function Cronometro() {
    const [tiempo, setTiempo] = useState(0);
    const [activo, setActivo] = useState(false);
    const [detenido, setDetenido] = useState(false);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [nivel, setNivel] = useState(1);
    const [pokeball, setPokeball] = useState(0);

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
    }, []);

    //Hook useEffect encargada para aumentar el tiempo, la experiencia y el nivel
    useEffect(() => {
        let intervalo = null;
        if (activo && !detenido) {
            intervalo = setInterval(() => {
                setTiempo((tiempo) => tiempo + 10);
                setTiempoTotal((tiempoTotal) => tiempoTotal + 10);
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
    }, [activo, detenido, nivel, tiempoTotal]);


    useEffect(() => {
        if (nivel === 10){
            setPokeball((pokeball) => pokeball + 1);
            } else if(nivel % 20 === 0) {
            setPokeball((pokeball) => pokeball + 1);}

}, [nivel]);


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
            <section>
                <p>Nivel: {nivel}</p>
                <p>Tiempo acumulado: {formatoTiempo(tiempoTotal)}</p>
                <p>Tienes: {pokeball} Pokeballs.</p>
            </section>

            <section>
                <h1>{formatoTiempo(tiempo)}</h1>
                <button onClick={iniciar}>Iniciar/Continuar</button>
                <button onClick={pausa}>Pausar</button>
                <button onClick={reiniciar}>Reiniciar</button>
            </section>
        </div>
    );
}

export default Cronometro;

