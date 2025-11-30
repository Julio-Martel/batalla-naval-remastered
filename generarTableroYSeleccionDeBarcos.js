export const generarTableroYBarcos = (contenidoPrincipal,nroDeJugador) => {
    let tituloDelJugador = document.createElement('h1');
    let contenedorTableroBarcos = document.createElement('div');
    let seccionBarcosParaSeleccionar = document.createElement('div');
    let tituloSeccionBarcos = document.createElement('h1');
    let slideBarcos = document.createElement('div');
    let botonParaFinalizarCargaDeBarcos = document.createElement('button');
    let tablero = document.createElement('div');
    let botonParaFinalizarLaCargaConfiguracionDeTablero = document.createElement('button');

    
    // configuracion de titulo que aparecera principalmente en el contenido principal, ej: Jugador nro 1
    tituloDelJugador.classList.add('titulo-jugador');
    tituloDelJugador.textContent = `Jugador nro ${nroDeJugador}`;

    tituloSeccionBarcos.textContent = "Prepara tu flota!";

    seccionBarcosParaSeleccionar.classList.add('seccion-barcos');
    seccionBarcosParaSeleccionar.appendChild(slideBarcos);
    seccionBarcosParaSeleccionar.appendChild(botonParaFinalizarCargaDeBarcos);
   
   
    tablero.classList.add('seccion-tablero');

	for(let i = 0; i < 121; i++) {
		let casillaTablero = document.createElement('div');
		casillaTablero.setAttribute('id',`casilla-0-${i}`);
		casillaTablero.classList.add('casilla-tablero');
		seccionTablero.appendChild(casillaTablero);
	}

    contenedorTableroBarcos.classList.add('.contenidos-barcos-tablero');
    contenedorTableroBarcos.appendChild(seccionBarcosParaSeleccionar);
    contenedorTableroBarcos.appendChild(tablero);

    contenidoPrincipal.appendChild(tituloDelJugador);
    contenidoPrincipal.appendChild(contenedorTableroBarcos);
    contenedorTableroBarcos.appendChild(seccionBarcosParaSeleccionar);
    contenedorTableroBarcos.appendChild(tablero);


}