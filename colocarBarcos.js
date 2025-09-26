export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos) => {
	return new Promise(resolve => {

		const generarArreglo = () => {
  			return Array.from({ length: 120 - 67 + 1 }, (_, i) => i + 67)
              .filter(num => num % 11 !== 0);
		};

		const juego = {
			tableroUsadoPorPrimeraVez: true,
			modoDeColocacionDeBarco: false,
			cantidadDeCasillasBarco: null,
			desactivarCeldas: false,
			casillasQueHanSidoOcupadas: [],
			fichaColocada: false,
			multiploOnceValor: null,
			primerValor: true,
			tercerValor: null,
			valoresEntreMedio: true,
			casillasABloquear: [],
			primeraPosicion: null,
			ultimaPosicion: null,
			casillaColocada: false,
			listadoParesOrdenados: [6,17,28,39,50,61,72,83,94,105,116],
			listadoParesOrdenadosY: [10,21,32,43,54,65,76,87,98,109,120],
			coordenadasXY: [[6,10],[17,21],[28,32],[39,43],[50,54],[61,65],[72,76],[83,87],[94,98],[105,109],[116,120]],
			listadoNumeroPosicionesY: [],
			arregloNuevosNumeros: generarArreglo()
		};
	
		let numeroDeInicio = 66, multiplo = 6;
		for(let x = 0; x < 5; x++){
			juego.listadoNumeroPosicionesY.push(numeroDeInicio);
			multiplo++;
			numeroDeInicio = multiplo * 11;		
		}

		const remarcarCasillas = (elementoPosicion1, elmentoPosicion2) => {
			for(let y = elementoPosicion1; y <= elmentoPosicion2; y++){
				let obtenerIdCasillaActual = document.getElementById(`casilla-0-${y}`);
				juego.casillasABloquear.push(obtenerIdCasillaActual);
				obtenerIdCasillaActual.style.background = "darkred"; 
			}								
		}

		const desmarcarCasillas = (elementoPosicion1, elementoPosicion2) => {
			for(let x = elementoPosicion1; x <= elementoPosicion2; x++) {
				let quitarColorDeLaCasilla = document.getElementById(`casilla-0-${x}`);
				quitarColorDeLaCasilla.style.background = "none";	
			}			
		}

		const remarcarCasillasVertical = (elementoPosicion) => {
			let elementoIncremental = elementoPosicion;
			for(let y = 0; y < 5; y++){
				let obtenerIdCasillaActual = document.getElementById(`casilla-0-${elementoIncremental}`);
				juego.casillasABloquear.push(obtenerIdCasillaActual);
				obtenerIdCasillaActual.style.background = "darkred"; 
				elementoIncremental = elementoIncremental + 11;
			}
		}

		const desmarcarCasillasVertical = (elementoPosicion) => {
			let elementoIncremental = elementoPosicion;
			for(let y = 0; y < 5; y++){
				let obtenerIdCasillaActual = document.getElementById(`casilla-0-${elementoIncremental}`);
				obtenerIdCasillaActual.style.background = "none"; 
				elementoIncremental = elementoIncremental + 11;
			}			
		}
 
		const comprobarRango = (numero) => {
			let entreRango = false;
			for(let i = 0; i < juego.coordenadasXY.length; i++) {	
				
				let coordenadaX = juego.coordenadasXY[i][0];
				let coordenadaY = juego.coordenadasXY[i][1];
		
				if(numero >= coordenadaX && numero <= coordenadaY) {
					juego.primeraPosicion = coordenadaX;
					juego.ultimaPosicion = coordenadaY;
					entreRango = true;
					break;
				} 
			}

			return entreRango;
		}

		const comprobarRangoY = (numero) => {
			let numeroEncontrado = false;
			for(let i = 0; i < juego.listadoNumeroPosicionesY.length; i++){
				let elementoDelArreglo = juego.listadoNumeroPosicionesY[i];
				if(elementoDelArreglo === numero){
					numeroEncontrado = true;
					break;
				}
			}

			return numeroEncontrado;
		}

		const decrementarElementoPosicion = (elemento1, elemento2) => {
			
		}


		tablero.style.pointerEvents = "auto";
		tablero.style.opacity = "1";
		barcos.style.opacity = "0.5";

		switch(nroBarcoSeleccionado) {
			case 0:							
			
			juego.cantidadDeCasillasBarco = 4;

			if(juego.tableroUsadoPorPrimeraVez){	
				casillasDelTablero.forEach(casillaActualDelTablero => {
							
					casillaActualDelTablero.addEventListener('mouseover', () => {
								let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
								let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
								let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);	
								let posicionDeLaCasillaActualY = Array.from(casillasDelTablero).indexOf(idCasillaActual);
								let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
								let verifEstadoPosicionY = juego.listadoParesOrdenadosY.includes(posicionDeLaCasillaActualY);
								let numeroEntreRango = comprobarRango(posicionDeLaCasillaActual);
								let comprobarMultiploDeOnce = comprobarRangoY(posicionDeLaCasillaActual);
								let comprobarNuevoNumero = juego.arregloNuevosNumeros.includes(posicionDeLaCasillaActual)
								console.log(posicionDeLaCasillaActual)

								if(!juego.modoDeColocacionDeBarco){

									if(verifEstadoPosicion) {
										juego.primeraPosicion = posicionDeLaCasillaActual;
										juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;

										remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);

									} else if(juego.primeraPosicion !== null && juego.ultimaPosicion !== null && (posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion)) {
								
										remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion)			
								
									} else if(verifEstadoPosicionY){				
										let decrementarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;	
										juego.primeraPosicion = decrementarElemento;
										juego.ultimaPosicion = posicionDeLaCasillaActual;
										
										remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);		
									
									} else if (numeroEntreRango) {
										
										remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);
									
									} else {
						
										let incrementarElemento = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

										juego.primeraPosicion = posicionDeLaCasillaActual;
										juego.ultimaPosicion = incrementarElemento;

										remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
									}

								} else {

									// SOLUCIONAR PROBLEMAS DE LAS DEMAS CASILLAS FALTANTES	

									if(!comprobarMultiploDeOnce){
										juego.primeraPosicion = posicionDeLaCasillaActual;
										remarcarCasillasVertical(juego.primeraPosicion);
									}




									/*if(comprobarMultiploDeOnce && juego.multiploOnceValor === null && (posicionDeLaCasillaActual !== 110)){

										juego.primeraPosicion = posicionDeLaCasillaActual;
										juego.multiploOnceValor = juego.primeraPosicion;
										remarcarCasillasVertical(juego.primeraPosicion);
										
									} else if(comprobarMultiploDeOnce && (posicionDeLaCasillaActual >= 77 && posicionDeLaCasillaActual <= 110)){
										
										remarcarCasillasVertical(juego.multiploOnceValor);
										
									} else if(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76){

										juego.primeraPosicion = posicionDeLaCasillaActual; 
										remarcarCasillasVertical(juego.primeraPosicion)
										
									} else if(posicionDeLaCasillaActual > 110 && posicionDeLaCasillaActual <= 120){
									
										let decrementarElemento = juego.primeraPosicion - (juego.cantidadDeCasillasBarco * 11);
										console.log(decrementarElemento)
										juego.primeraPosicion = decrementarElemento;
										remarcarCasillasVertical(juego.primeraPosicion)
									
									} else if(comprobarNuevoNumero) {
										let incrementarElemento = posicionDeLaCasillaActual + (juego.cantidadDeCasillasBarco * 11);

									}*/
									
									
							
								}

							});

					casillaActualDelTablero.addEventListener('mouseout', () => {
								
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
							let comprobarMultiploDeOnce = comprobarRangoY(posicionDeLaCasillaActual);

							if(!juego.modoDeColocacionDeBarco){
								
								if(verifEstadoPosicion && ((posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion))){

									desmarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);												
									
								} else if (juego.primeraPosicion === null) {
									
									let incrementarCasillaDeLaPosicionActual = juego.primeraPosicion + juego.cantidadDeCasillasBarco;	
									desmarcarCasillas(posicionDeLaCasillaActual,incrementarCasillaDeLaPosicionActual)												
								} else {
						
									desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion)

									juego.primeraPosicion = null;
									juego.ultimaPosicion = null;
								}

								if(!juego.casillaColocada){
									casillasDelTablero.forEach(casilla => casilla.style.background = "none");
									juego.casillaColocada = false;
								} else {
									casillasDelTablero.forEach(casilla => {
										let incluidoEnElArreglo = juego.casillasABloquear.includes(casilla);
										let valueDeLaCasilla = casilla.getAttribute('id');
										let idCasilla = document.getElementById(valueDeLaCasilla);
										
										if(incluidoEnElArreglo){
											idCasilla.style.pointerEvents = "none";
											idCasilla.style.background = "blue";
										} else {
											casilla.style.background = "none";
										}
									})								
								} 
							
							} else {
													
								if(!comprobarMultiploDeOnce){
									desmarcarCasillasVertical(juego.primeraPosicion);
								} 

								
								
								/*if(juego.tercerValor === null){
									desmarcarCasillasVertical(juego.primeraPosicion)
								} else {
									desmarcarCasillasVertical(juego.tercerValor)
								}*/
								

													
								
							}

							juego.casillasABloquear = [];

					})

					
					casillaActualDelTablero.addEventListener('click', () => {

								juego.casillaColocada = true;
								juego.tableroUsadoPorPrimeraVez = true;

								tablero.style.opacity = "0.1";
								tablero.style.pointerEvents = "none";
							
								barcos.style.opacity = "1";
								barcos.style.pointerEvents = "auto";
					})					
					
					
					casillaActualDelTablero.addEventListener("contextmenu", (event) => {
						let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
						let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
						let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual)

						event.preventDefault();
						
						if(!juego.modoDeColocacionDeBarco){
							juego.modoDeColocacionDeBarco = true;
							desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion)

							if(posicionDeLaCasillaActual === 110){
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								juego.primeraPosicion = restarElemento;
								juego.multiploOnceValor = juego.primeraPosicion;

								remarcarCasillasVertical(juego.primeraPosicion)
							} else if(posicionDeLaCasillaActual >= 77 && posicionDeLaCasillaActual <= 99){
								let restarElemento = 110 - (juego.cantidadDeCasillasBarco * 11);
								juego.primeraPosicion = restarElemento;
								juego.multiploOnceValor = juego.primeraPosicion;
								remarcarCasillasVertical(juego.primeraPosicion)
							} else {
								remarcarCasillasVertical(juego.primeraPosicion)
							}

							
						} else {
							juego.modoDeColocacionDeBarco = false;  
							desmarcarCasillasVertical(juego.primeraPosicion);
							
							juego.primeraPosicion = posicionDeLaCasillaActual;
							juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;
							
							remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion)
						}
					})
			
			
			
			
			
			
				});
			
			
			
			
			
			
			
			} else {
				// AGREGAR LA LOGICA AQUI. SI TODO MI TABLERO ES COMO UNA MATRIZ, DEBO AGREGAR EL EVENTO EN LAS ZONAS DONDE LAS CASILLAS HORIZONALTES PUEDAN PASAR A VERTICALES					
			}
			
			
			break;
		

		}

	// AGREGAR EL RESOLVE QUE RETORNARA UNA PROMESA QUE PARA CUANDO SE COLOQUEN TODAS LAS CASILLAS EL BOTON DE EMPEZAR LA BATALLA ESTE LISTO PARA USARSE	

	});
}