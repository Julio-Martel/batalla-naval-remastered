import {generarTableroYBarcos} from './generarTableroYSeleccionDeBarcos.js';

export const mostrar = async(contenido) => {  
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    let tableroMatrizJugadorUno = [];

    let elementosContenido = {
        contenedorPrincipal: document.createElement('div'),
        tituloDeNroDeJugador: document.createElement('h1'),
        contenedorBarcosYTablero: document.createElement('div'), 
        nroDeJugador: 1   
    };  
   
    contenido.innerHTML = ``;
    contenido.appendChild(elementosContenido.contenedorPrincipal);
   
    elementosContenido.contenedorPrincipal.classList.add('contenido-principal');
    
    await delay(2000);  

    elementosContenido.contenedorPrincipal.classList.add('mostrar-contenido')

    generarTableroYBarcos(elementosContenido.contenedorPrincipal,elementosContenido.nroDeJugador,tableroMatrizJugadorUno);
    
}