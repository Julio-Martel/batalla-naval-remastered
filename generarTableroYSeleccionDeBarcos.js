import {colocarBarcosEnElTablero} from './colocarBarcos.js';

export const generarTableroYBarcos = async(contenidoPrincipal,nroDeJugador,tableroMatriz) => {
    let tituloDelJugador = document.createElement('h1');
    let seccionBarcosParaSeleccionar = document.createElement('div');
    let contenedorTableroBarcos = document.createElement('div');
    let contenedorParaTableroBarcos = document.createElement('div');
    let botonParaFinalizarCargaDeBarcos = document.createElement('button');
    let tablero = document.createElement('div');

    tituloDelJugador.classList.add('titulo-jugador');
    tituloDelJugador.textContent = `Jugador nro ${nroDeJugador}`;


    seccionBarcosParaSeleccionar.classList.add('seccion-barcos-tarjeta');
    tablero.classList.add('seccion-tablero');

    botonParaFinalizarCargaDeBarcos.classList.add('boton-finalizar-cargar')

    botonParaFinalizarCargaDeBarcos.textContent = "Listo para la batalla";

    contenidoPrincipal.appendChild(contenedorTableroBarcos);
    contenedorTableroBarcos.appendChild(tituloDelJugador);
    contenedorTableroBarcos.appendChild(contenedorParaTableroBarcos);
    contenedorTableroBarcos.appendChild(botonParaFinalizarCargaDeBarcos);
    
    contenedorTableroBarcos.classList.add('contenedor-titulo-barcos-tablero')
    
    contenedorParaTableroBarcos.classList.add('contenedor-barcos-y-tablero');
    contenedorParaTableroBarcos.appendChild(tablero);

    for(let i = 0; i < 121; i++) {
		let casillaTablero = document.createElement('div');
		casillaTablero.setAttribute('id',`casilla-0-${i}`);
		casillaTablero.classList.add('casilla-tablero');
		tablero.appendChild(casillaTablero);
	}

    const todasLasCasillasDelTablero = document.querySelectorAll('.casilla-tablero');

 	tablero.style.opacity = "0.5";
	tablero.style.pointerEvents = "none";   

    contenedorParaTableroBarcos.appendChild(seccionBarcosParaSeleccionar);

    seccionBarcosParaSeleccionar.classList.add('seccion-barcos-tarjeta');
    
	const bismarkImagen = document.createElement('img');
	const tirpitzImagen = document.createElement('img');
	const admirarlHipperImagen = document.createElement('img');
	const z23Imagen = document.createElement('img');
	const uboatImagen = document.createElement('img');
	const atlantisImagen = document.createElement('img');

 	for(let i = 0; i < 6; i++) {
		let tarjetaBarco = document.createElement('div');
		seccionBarcosParaSeleccionar.appendChild(tarjetaBarco);
		tarjetaBarco.classList.add('tarjeta');
		tarjetaBarco.setAttribute('id',`tarjeta-${i}`);
	}   

	const toddasLasTarjetasBarco = document.querySelectorAll('.tarjeta')

	let j = 0;
	for(let tarjeta of toddasLasTarjetasBarco) {
		let tarjetaId = document.getElementById(`tarjeta-${j}`);
		let nombreDelBarco = document.createElement('h2');
		nombreDelBarco.classList.add('titulo-barcos');
		let botonColocar = document.createElement('button');
		botonColocar.textContent = '¡Colocar!'
			switch(j) {
				case 0:
					nombreDelBarco.textContent = "Bismark";
					tarjetaId.appendChild(nombreDelBarco);
					bismarkImagen.src = `./images/barcos-alemanes/bismark1.png`;
					bismarkImagen.classList.add('barco');
					tarjetaId.appendChild(bismarkImagen);
				break;
			
				case 1: 
					nombreDelBarco.textContent = "Tirpitz";
                    
					tarjetaId.appendChild(nombreDelBarco);
					tirpitzImagen.src = `./images/barcos-alemanes/tirpitz.png`;
					tirpitzImagen.classList.add('barco');
					tarjetaId.appendChild(tirpitzImagen);
				break;
			
				case 2:
					nombreDelBarco.textContent = "Ad. Hipper";
					tarjetaId.appendChild(nombreDelBarco);		
					admirarlHipperImagen.src = `./images/barcos-alemanes/admiralHipper.png`;
					admirarlHipperImagen.classList.add('barco');
					tarjetaId.appendChild(admirarlHipperImagen);							
				break;
			
				case 3:
					nombreDelBarco.textContent = "Dest. Z23";
					tarjetaId.appendChild(nombreDelBarco);
					z23Imagen.src = `./images/barcos-alemanes/z23.png`;
					z23Imagen.classList.add('barco');
					tarjetaId.appendChild(z23Imagen);
				break;
			
				case 4:
					nombreDelBarco.textContent = "U-boat T.VII";
					tarjetaId.appendChild(nombreDelBarco);
					uboatImagen.src = `./images/barcos-alemanes/uboat.png`;
					uboatImagen.classList.add('barco');
					tarjetaId.appendChild(uboatImagen);									
				break;

				case 5:
					nombreDelBarco.textContent = "HSK-2 Atlantis";
					tarjetaId.appendChild(nombreDelBarco);
					atlantisImagen.src = `./images/barcos-alemanes/atlantis.png`;
					atlantisImagen.classList.add('barco');
					tarjetaId.appendChild(atlantisImagen);									
				break;		
			}
		
        tarjetaId.appendChild(botonColocar);
		botonColocar.setAttribute('class','boton-colocar');
		botonColocar.setAttribute('id', `${j}`);
		botonColocar.setAttribute('data-value', `${j}`)
		j++; 
	}

    const todosLosBotonesDeColocar = document.querySelectorAll('.boton-colocar');

	for(let botonDeColocar of todosLosBotonesDeColocar) {
		botonDeColocar.addEventListener('click', async()=> {						
			let botonColocarDataValue = parseInt(botonDeColocar.getAttribute('data-value'));
			let botonColocarId = document.getElementById(botonColocarDataValue);

			botonColocarId.textContent = "COLOCADO";
			botonColocarId.style.pointerEvents = "none";
			botonColocarId.style.opacity = "0.5";
			seccionBarcosParaSeleccionar.style.pointerEvents = "none";

			await colocarBarcosEnElTablero(botonColocarDataValue,todasLasCasillasDelTablero,tablero,seccionBarcosParaSeleccionar,tableroMatriz);					
					
		});
	}


    botonParaFinalizarCargaDeBarcos.style.opacity = "0.1";

}