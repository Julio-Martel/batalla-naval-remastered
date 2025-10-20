export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos) => {
	return new Promise(resolve => {

		const generarArreglo = () => {
  			return Array.from({ length: 120 - 67 + 1 }, (_, i) => i + 67)
              .filter(num => num % 11 !== 0);
		};

		const generarArreglo2 = () => {
			let iniciadorArreglo = 78;
			let Arreglo = [];
			let copiaIniciadorArreglo = 78;

			for(let i = 0; i < 10; i++){
				let arregloElemento = [];
				arregloElemento.push(iniciadorArreglo);
				for(let j = 0; j < 2; j++){
					iniciadorArreglo = iniciadorArreglo + 11;
					arregloElemento.push(iniciadorArreglo);
				}
				
				Arreglo.push(arregloElemento);

				copiaIniciadorArreglo++;
				iniciadorArreglo = copiaIniciadorArreglo;	
			}
		
			return Arreglo;
		}


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
			casillaVertical: false,
			arregloNuevosNumeros: generarArreglo(),
			arregloNuevoDos: generarArreglo2(),
			columnaNuevosNumeros: null
		};
	
		console.log(juego.arregloNuevoDos)


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

			const encontrarNumerosCorrespondientes = (elementoAverificar) => {
				for (let i = 0; i < juego.arregloNuevoDos.length; i++) {
					for (let j = 0; j < juego.arregloNuevoDos[i].length; j++) {
						if (elementoAverificar === juego.arregloNuevoDos[i][j]) {
							juego.columnaNuevosNumeros = i;
							console.log(i)
							return true;
						}
					}
				}
				return false;
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
								let comprobarNuevoNumeroDeNuevoArreglo = encontrarNumerosCorrespondientes(posicionDeLaCasillaActual);
								let casillaUltima;
							
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


									if(!comprobarMultiploDeOnce && !(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76) && (posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65)){

										juego.primeraPosicion = posicionDeLaCasillaActual;
										remarcarCasillasVertical(juego.primeraPosicion);
									
									} else if(posicionDeLaCasillaActual === 66){
									
										juego.primeraPosicion = posicionDeLaCasillaActual;
										juego.multiploOnceValor = juego.primeraPosicion;
										remarcarCasillasVertical(juego.multiploOnceValor);
									
									} else if(posicionDeLaCasillaActual === 77){
									
										let posicionEcuacion = 110 - (juego.cantidadDeCasillasBarco * 11);
										juego.primeraPosicion = posicionEcuacion;
										remarcarCasillasVertical(juego.primeraPosicion);
									
									} else if(posicionDeLaCasillaActual === 88){
									
										let posicionEcuacion = 110 - (juego.cantidadDeCasillasBarco * 11);
										juego.primeraPosicion = posicionEcuacion;
										remarcarCasillasVertical(juego.primeraPosicion);
									
									} else if(posicionDeLaCasillaActual === 99){
										
										let posicionEcuacion = 110 - (juego.cantidadDeCasillasBarco * 11);
										juego.primeraPosicion = posicionEcuacion;
										remarcarCasillasVertical(juego.primeraPosicion);
									
									} else if(posicionDeLaCasillaActual === 110){
									
										let diferencia = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
										remarcarCasillasVertical(diferencia);
									
									} else if((posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 120) && !juego.casillaVertical){
										let diferencia = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
										juego.primeraPosicion = diferencia;
										juego.casillaVertical = true;
										remarcarCasillasVertical(diferencia);
									
									} else if((posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 120) && posicionDeLaCasillaActual){
										let diferencia = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
										remarcarCasillasVertical(diferencia);
										juego.casillaVertical = false;
										juego.primeraPosicion = diferencia;
									
									} else if((posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76)){
										juego.primeraPosicion = posicionDeLaCasillaActual;
										remarcarCasillasVertical(posicionDeLaCasillaActual);
									
									} else if(comprobarNuevoNumeroDeNuevoArreglo){
										console.log(posicionDeLaCasillaActual)
										switch(juego.columnaNuevosNumeros){
																					
											case 0:
												console.log('este caminosss')
												casillaUltima = 111;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
											
												remarcarCasillasVertical(juego.primeraPosicion);
											
											;			

											case 1:
												casillaUltima = 112;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;
											
											case 2:
												casillaUltima = 113;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;

											case 3: 
												casillaUltima = 114;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;
										
											case 4:
												casillaUltima = 115;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion)
											;

											case 5:
												casillaUltima = 116;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;

											case 6:
												casillaUltima = 117;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;
										
											case 7:
												casillaUltima = 118;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;

											case 8:
												casillaUltima = 119;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;											
										
											case 9:
												casillaUltima = 120;
												juego.primeraPosicion = casillaUltima - (juego.cantidadDeCasillasBarco * 11);
												remarcarCasillasVertical(juego.primeraPosicion);
											;										
										
										}

									}

																	
							
								}

							});

					casillaActualDelTablero.addEventListener('mouseout', () => {
								
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
							let comprobarMultiploDeOnce = comprobarRangoY(posicionDeLaCasillaActual);
							let comprobarNuevoNumeroDeNuevoArreglo = encontrarNumerosCorrespondientes(posicionDeLaCasillaActual);

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
													

								if(!comprobarMultiploDeOnce && !(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76)){
									desmarcarCasillasVertical(juego.primeraPosicion);
								} else if(posicionDeLaCasillaActual === 110 || posicionDeLaCasillaActual === 99 || posicionDeLaCasillaActual === 88 || posicionDeLaCasillaActual === 77 || posicionDeLaCasillaActual === 66){
									let restarElemento = 110 - (juego.cantidadDeCasillasBarco * 11);
									juego.primeraPosicion = restarElemento;
									desmarcarCasillasVertical(juego.primeraPosicion);
								} else if(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76) {
									desmarcarCasillasVertical(posicionDeLaCasillaActual);
								} 


								

								
	
								
  
													
								
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
							} else if(posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 120){
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								remarcarCasillasVertical(restarElemento)
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