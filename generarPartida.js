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


		for(let i = 0; i < 7; i++) {
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
			console.log(j);
			switch(j) {
				case 0:
					nombreDelBarco.textContent = "Bismark";
					casillaId.appendChild(nombreDelBarco);
					bismarkImagen.src = `./images/barcos-alemanes/bismark.png`;
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
					nombreDelBarco.textContent = "Admiral Hipper";
					
					casillaId.appendChild(nombreDelBarco);				
				break;
			
				case 3:
					nombreDelBarco.textContent = "Destructor Z23";
					casillaId.appendChild(nombreDelBarco);
				break;
			
				case 4:
					nombreDelBarco.textContent = "U-boat Tipo VII";
					casillaId.appendChild(nombreDelBarco);					
				break;

				case 5:
					nombreDelBarco.textContent = "HSK-2 Atlantis";
					casillaId.appendChild(nombreDelBarco);					
				break;			
			}
			
			j++; 
		}

		botonFinalizarConfiguracion.textContent = `Al campo de batalla!`;

		contenidoBandoNazi.classList.add('contenido-bando-nazi','ocultar-contenido-opacado');

		await delay(1000);

		contenidoBandoNazi.classList.add('mostrar-contenido-opacado');


	} else {
		// aca bando britanico
	}	
}