export const mostrar = async(contenido) => {  
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    let tableroMatriz = [];

    for(let i = 0; i < 11; i++) {
        let fila = [];
        tableroMatriz.push(fila);
        for(let j = 0; j < 11; j++){
            tableroMatriz[i][j] = 0;
        }
    }

    let elementosContenido = {
        contenedorPrincipal: document.createElement('div'),
        tituloDeNroDeJugador: document.createElement('h1'),
        contenedorBarcosYTablero: document.createElement('div'), 
    
    };  
   
    contenido.innerHTML = ``;
    contenido.appendChild(elementosContenido.contenedorPrincipal);
   
    elementosContenido.contenedorPrincipal.classList.add('contenido-principal');
    
    await delay(2000);  

    elementosContenido.contenedorPrincipal.classList.add('mostrar-contenido')

    elementosContenido.tituloDeNroDeJugador.textContent = "Jugador Nro 1";
    elementosContenido.contenedorPrincipal.appendChild(elementosContenido.tituloDeNroDeJugador);
     
    elementosContenido.contenedorPrincipal.appendChild(elementosContenido.contenedorBarcosYTablero);
    elementosContenido.contenedorBarcosYTablero.classList.add('contenido-barcos-tablero');

    

}