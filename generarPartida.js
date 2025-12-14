import {colocarBarcosEnElTablero} from './colocarBarcos.js';

let tableroMatriz = [];
let casillasOcupadas = [];

for(let i = 0; i < 11; i++) {
	let fila = [];
	tableroMatriz.push(fila);
	for(let j = 0; j < 11; j++){
		tableroMatriz[i][j] = 0;
	}
}

const delay = (ms) => {
	return new Promise(resolve => setTimeout(resolve,ms));
}

export const generarPartidaParaUnSoloJugador = async(bandoSeleccionado,contenido) => {
	if (bandoSeleccionado === 'a') {
		const contenidoBandoNazi = document.createElement('div');
		const tituloConfigurar = document.createElement('h1');
		const contenidoBarcosYTablero = document.createElement('div');
		const botonFinalizarConfiguracion = document.createElement('button');
		const seccionBarcos = document.createElement('div');
		const seccionTablero = document.createElement('div');

		contenido.innerHTML = '';
		contenido.appendChild(contenidoBandoNazi);

		contenidoBandoNazi.appendChild(tituloConfigurar);
		contenidoBandoNazi.appendChild(contenidoBarcosYTablero);
		contenidoBandoNazi.appendChild(botonFinalizarConfiguracion);

		tituloConfigurar.classList.add('titulo-introduccion');
		tituloConfigurar.textContent = `Prepara tu flota!`;

		contenidoBarcosYTablero.classList.add('seleccion-barcos-tablero');
		botonFinalizarConfiguracion.classList.add('button');

		contenidoBarcosYTablero.appendChild(seccionBarcos);
		contenidoBarcosYTablero.appendChild(seccionTablero);

		seccionBarcos.classList.add('seccion-barcos');
		seccionTablero.classList.add('seccion-tablero');

		// CREACION DE CASILLAS DEL TABLERO

		for(let i = 0; i < 121; i++) {
			let casillaTablero = document.createElement('div');
			casillaTablero.setAttribute('id',`casilla-0-${i}`);
			casillaTablero.classList.add('casilla-tablero');
			seccionTablero.appendChild(casillaTablero);
		}

		const todasLasCasillasDelTablero = document.querySelectorAll('.casilla-tablero');

		// EL TABLERO PERMANECERA OPACADO HASTA QUE EL JUGADOR SELECCIONE UN BARCO

		seccionTablero.style.opacity = "0.5";
		seccionTablero.style.pointerEvents = "none";

		// IMAGENES PARA LA COLOCACION DE BARCOS

		const bismarkImagen = document.createElement('img');
		const tirpitzImagen = document.createElement('img');
		const admirarlHipperImagen = document.createElement('img');
		const z23Imagen = document.createElement('img');
		const uboatImagen = document.createElement('img');
		const atlantisImagen = document.createElement('img');

		// CREACION Y CONFIGURACION DE LAS TARJETAS QUE CADA UNA CONTIENE LA IMAGEN Y BOTON PARA COLOCAR UN BARCO AL TABLERO

		for(let i = 0; i < 6; i++) {
			let tarjetaBarco = document.createElement('div');
			seccionBarcos.appendChild(tarjetaBarco);
			tarjetaBarco.classList.add('tarjeta');
			tarjetaBarco.setAttribute('id',`tarjeta-${i}`);
		}

		const todasLasTarjetas = document.querySelectorAll('.tarjeta');

		let j = 0;
		for(let tarjeta of todasLasTarjetas) {
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
	
		// ESTE BUCLE FOR SE ENCARGARA DE RECORRER TODA LA COLECCION DE LOS BOTONES DE COLOCAR PARA SU POSTERIOR USO

		const todosLosBotonesDeColocar = document.querySelectorAll('.boton-colocar');

		for(let botonDeColocar of todosLosBotonesDeColocar) {
			botonDeColocar.addEventListener('click', async()=> {						
				let botonColocarDataValue = parseInt(botonDeColocar.getAttribute('data-value'));
				let botonColocarId = document.getElementById(botonColocarDataValue);

				botonColocarId.textContent = "COLOCADO";
				botonColocarId.style.pointerEvents = "none";
				botonColocarId.style.opacity = "0.5";
				seccionBarcos.style.pointerEvents = "none";

				await colocarBarcosEnElTablero(botonColocarDataValue,todasLasCasillasDelTablero,seccionTablero,seccionBarcos,casillasOcupadas);					
					
			});
		}

		botonFinalizarConfiguracion.textContent = `Al campo de batalla!`;

		contenidoBandoNazi.classList.add('contenido-bando-nazi','ocultar-contenido-opacado');

		await delay(1000);

		contenidoBandoNazi.classList.add('mostrar-contenido-opacado');

	} else {
		// aca bando britanico
	}	
}
