export const generarTableroYBarcos = (contenidoPrincipal,nroDeJugador) => {
    let tituloDelJugador = document.createElement('h1');
    let contenedorTableroBarcos = document.createElement('div');
    let seccionBarcosParaSeleccionar = document.createElement('div');
    let tablero = document.createElement('div');
    let botonParaFinalizarLaCargaConfiguracionDeTablero = document.createElement('button');

    
    // configuracion de titulo que aparecera principalmente en el contenido principal, ej: Jugador nro 1
    tituloDelJugador.classList.add('titulo-jugador');
    tituloDelJugador.textContent = `Jugador nro ${nroDeJugador}`;




    contenidoPrincipal.appendChild(tituloDelJugador);


}