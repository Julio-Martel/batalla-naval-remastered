import {generarTableroYBarcos} from './generarTableroYSeleccionDeBarcos.js';

export const mostrar = async(contenido) => {  
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    let tableroMatrizJugadorUno = [];

    /*for(let i = 0; i < 11; i++) {
        let fila = [];
        tableroMatriz.push(fila);
        for(let j = 0; j < 11; j++){
            tableroMatriz[i][j] = 0;
        }
    }*/

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