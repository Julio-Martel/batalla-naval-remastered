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

		const bismarkImagen = document.createElement('img');
		const tirpitzImagen = document.createElement('img');
		const admirarlHipper = document.createElement('img');
		const z23 = document.createElement('img');
		const uboat = document.createElement('img');
		const atlantis = document.createElement('img');
		const hood = document.createElement('img');

		/*Creacion de las casillas*/

		for(let i = 0; i < 6; i++) {
			let crearCasilla = document.createElement('div');
			seccionBarcos.appendChild(crearCasilla);
			crearCasilla.classList.add('casilla');
			crearCasilla.setAttribute('id',`0-${i}`);
			crearCasilla.setAttribute( `data-value`,`0-${i}`);	
		}

		const todasLasCasillasCreadas = document.getElementsByClassName('casilla');

		let j = 0;
		for(let casilla of todasLasCasillasCreadas) {
			let casillaId = document.getElementById(`0-${j}`);
			let nombreDelBarco = document.createElement('h2');
			nombreDelBarco.classList.add('titulo-barcos');
			let botonColocar = document.createElement('button');
			botonColocar.textContent = '¡Colocar!'
			switch(j) {
				case 0:
					nombreDelBarco.textContent = "Bismark";
					casillaId.appendChild(nombreDelBarco);
					bismarkImagen.src = `./images/barcos-alemanes/bismark1.png`;
					bismarkImagen.classList.add('barco');
					casillaId.appendChild(bismarkImagen);
				break;
			
				case 1: 
					nombreDelBarco.textContent = "Tirpitz";
					casillaId.appendChild(nombreDelBarco);
					tirpitzImagen.src = `./images/barcos-alemanes/tirpitz.png`;
					tirpitzImagen.classList.add('barco');
					casillaId.appendChild(tirpitzImagen);
				break;
			
				case 2:
					nombreDelBarco.textContent = "Ad. Hipper";
					casillaId.appendChild(nombreDelBarco);		
					admirarlHipper.src = `./images/barcos-alemanes/admiralHipper.png`;
					admirarlHipper.classList.add('barco');
					casillaId.appendChild(admirarlHipper);							
				break;
			
				case 3:
					nombreDelBarco.textContent = "Dest. Z23";
					casillaId.appendChild(nombreDelBarco);
					z23.src = `./images/barcos-alemanes/z23.png`;
					z23.classList.add('barco');
					casillaId.appendChild(z23);
				break;
			
				case 4:
					nombreDelBarco.textContent = "U-boat T.VII";
					casillaId.appendChild(nombreDelBarco);
					uboat.src = `./images/barcos-alemanes/uboat.png`;
					uboat.classList.add('barco');
					casillaId.appendChild(uboat);									
				break;

				case 5:
					nombreDelBarco.textContent = "HSK-2 Atlantis";
					casillaId.appendChild(nombreDelBarco);
					atlantis.src = `./images/barcos-alemanes/atlantis.png`;
					atlantis.classList.add('barco');
					casillaId.appendChild(atlantis);									
				break;		
			}
			casillaId.appendChild(botonColocar);
			botonColocar.setAttribute('class','boton-colocar');
			botonColocar.setAttribute('id', `0-${j}`);
			j++; 
		}

		const todosLosBotonesColocar = document.getElementsByClassName('boton-colocar');

		let k = 0;
		for(let botonDeColocar of todosLosBotonesColocar) {
			let botonDeColocarId = document.getElementById(`0-${k}`);
			botonDeColocarId.addEventListener('click', () => console.log(botonDeColocarId));
			k++;
		}


		botonFinalizarConfiguracion.textContent = `Al campo de batalla!`;

		contenidoBandoNazi.classList.add('contenido-bando-nazi','ocultar-contenido-opacado');

		await delay(1000);

		contenidoBandoNazi.classList.add('mostrar-contenido-opacado');


	} else {
		// aca bando britanico
	}	
}