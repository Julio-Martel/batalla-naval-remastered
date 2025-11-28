export const mostrar = async(contenido) => {  
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    let elementosContenido = {
        contenedorPrincipal: document.createElement('div'),
        tituloDeNroDeJugador: document.createElement('h1'),
    };  
   
    contenido.innerHTML = ``;
    contenido.appendChild(elementosContenido.contenedorPrincipal);
   
    await delay(1000);  

    elementosContenido.contenedorPrincipal.classList.add('contenido-principal');
    elementosContenido.contenedorPrincipal.classList.add('mostrar-contenido')

    elementosContenido.tituloDeNroDeJugador.textContent = "Jugador Nro 1";
    elementosContenido.contenedorPrincipal.appendChild(elementosContenido.tituloDeNroDeJugador);


}