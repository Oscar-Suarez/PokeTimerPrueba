import { useState, useEffect, useCallback } from "react";

function Cronometro() {
const [tiempo, setTiempo] = useState(0);
const [activo, setActivo] = useState(false);
const [detenido, setDetenido] = useState(false);
const [tiempoTotal, setTiempoTotal] = useState(0);
const [nivel, setNivel] = useState(0);
const levels = 100;
const experienceToLevelUp = [0];

for (let i = 1; i < levels; i++) {
  experienceToLevelUp[i] = experienceToLevelUp[i - 1] + 1;
}



function experiencia() {


}







const iniciar = useCallback(() => {
    setActivo(true);
    setDetenido(false);

}, []);

const pausa = useCallback(() => {
    setActivo(false);
    setDetenido(true);
}, []);

const reiniciar = useCallback(() => {
    setTiempo(0);
    setActivo(false);
    setDetenido(false);
}, []);

useEffect(() => {
    let interval = null;

    if (activo && !detenido) {
    interval = setInterval(() => {
        setTiempo((tiempo) => tiempo + 1);
        setTiempoTotal((tiempoTotal) => tiempoTotal + 1);
    }, 1000);
    } else {
    clearInterval(interval);
    }

    return () => clearInterval(interval);
}, [activo, detenido]);


const formatTiempo = (tiempo) => {
    const padTiempo = (tiempo) => {
    return tiempo.toString().padStart(2, "0");
};

    const segundos = padTiempo(tiempo % 60);
    const minutos = padTiempo(Math.floor(tiempo / 60) % 60);
    const horas = padTiempo(Math.floor(tiempo / 3600));
    return `${horas}:${minutos}:${segundos}`;
};

return (
    <div>
    <section>
        <p>Nivel: {nivel}</p>
        <p>Tiempo acumulado: {formatTiempo(tiempoTotal)}</p>
    </section>

    <section>
        <h1>{formatTiempo(tiempo)}</h1>
        <button onClick={iniciar}>Iniciar</button>
        <button onClick={pausa}>Pausar</button>
        <button onClick={reiniciar}>Reiniciar</button>
    </section>
    </div>
);
}

export default Cronometro;
