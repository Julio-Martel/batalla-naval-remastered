
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos) => {
	return new Promise(resolve => {

		const juego = {
			tableroUsadoPorPrimeraVez: true,
			modoDeColocacionDeBarco: false,
			cantidadDeCasillasBarco: null,
			desactivarCeldas: false,
			casillasQueHanSidoOcupadas: [],
			fichaColocada: false,
			multiploOnceValor: null,
			casillasABloquear: [],
			primeraPosicion: null,
			ultimaPosicion: null,
			casillaColocada: false,
			listadoParesOrdenados: [6,17,28,39,50,61,72,83,94,105,116],
			listadoParesOrdenadosY: [10,21,32,43,54,65,76,87,98,109,120],
			coordenadasXY: [[6,10],[17,21],[28,32],[39,43],[50,54],[61,65],[72,76],[83,87],[94,98],[105,109],[116,120]],
			listadoNumeroPosicionesY: [],
		};
	
		let numeroDeInicio = 66, multiplo = 6;
		for(let x = 0; x < 5; x++){
			juego.listadoNumeroPosicionesY.push(numeroDeInicio);
			multiplo++;
			numeroDeInicio = multiplo * 11;		
		}
			
		console.log(juego.listadoParesOrdenadosY)

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
				for(let j = 0; j < juego.listadoNumeroPosicionesY[i].length; j++){
					if(numero === juego.listadoNumeroPosicionesY[i][j]){
						numeroEncontrado = true;
						break;
					}
				}
			}

			return numeroEncontrado;
		}



		console.log(juego.listadoNumeroPosicionesY)

		tablero.style.pointerEvents = "auto";
		tablero.style.opacity = "1";
		barcos.style.opacity = "0.5";

		switch(nroBarcoSeleccionado) {
			case 0:							
			
			juego.cantidadDeCasillasBarco = 4;

			if(juego.tableroUsadoPorPrimeraVez){	
				casillasDelTablero.forEach(casillaActualDelTablero => {
							

								/*if(posicionDeLaCasillaActual >= 66 && posicionDeLaCasillaActual <= 120){
									console.log(posicionDeLaCasillaActual)
								}*/
					
					casillaActualDelTablero.addEventListener('mouseover', () => {
								let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
								let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
								let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);	
								let posicionDeLaCasillaActualY = Array.from(casillasDelTablero).indexOf(idCasillaActual);
								let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
								let verifEstadoPosicionY = juego.listadoParesOrdenadosY.includes(posicionDeLaCasillaActualY);
								let numeroEntreRango = comprobarRango(posicionDeLaCasillaActual);
								let numeroEntreRangoY = comprobarRangoY(posicionDeLaCasillaActual);
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
									// AQUI HAY UN PROBLEMA DE LO QUE SON LOS MULTIPLOS DE ONCE Y EL REMARCADO DE CASILLAS DE FORMA VERTICAL POR LO QUE QUEDA VER COMO IMPLEMENTARLO
									/*if(posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65){
										remarcarCasillasVertical(posicionDeLaCasillaActual);
									} else if(posicionDeLaCasillaActual >= 66 && posicionDeLaCasillaActual <= 76){
										juego.multiploOnceValor = posicionDeLaCasillaActual;
										remarcarCasillasVertical(juego.multiploOnceValor);
									} else{
										console.log(posicionDeLaCasillaActual)
										remarcarCasillasVertical(juego.multiploOnceValor);
									}		
										
									if(!numeroEntreRangoY){
										juego.multiploOnceValor = posicionDeLaCasillaActual;
										console.log(juego.multiploOnceValor)
										remarcarCasillasVertical(juego.multiploOnceValor);
										
										
									} else if(numeroEntreRangoY && (posicionDeLaCasillaActual >= 77 && posicionDeLaCasillaActual <= 110)){
										console.log(juego.multiploOnceValor)
										remarcarCasillasVertical(juego.multiploOnceValor);
										
									}*/
																		
								}

							});

					casillaActualDelTablero.addEventListener('mouseout', () => {
								
								let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
								let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
								let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
								let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
								let numeroEntreRangoY = comprobarRangoY(posicionDeLaCasillaActual);

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
									
								
								
								
								/*	console.log(juego.multiploOnceValor)

									if(!numeroEntreRangoY){									
										desmarcarCasillasVertical(juego.multiploOnceValor);
									} else if(numeroEntreRangoY && (posicionDeLaCasillaActual >= 77 && posicionDeLaCasillaActual <= 110)){
										desmarcarCasillasVertical(juego.multiploOnceValor);
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
					

					// SE AGREGO UNA POSIBLE SOLUCION, CONSISTE EN QUE SI HAGO EL CLICK DERECHO, PARA QUE SURGA EFECTO LA CONDICIONAL ES NECESARIO QUE SE ENCUENTRE DENTRO DEL MISMO EVENTO,POR EJEMPLOEN ESTE CASO SELECCIONAR MIENTRAS SE MUEVE EL MOUSE

					// ARREGLAR PROBLEMA DE COMO DESMARCAR LAS CASILLAS Y QUE VUELVAN A SU POSICION ORIGINAL PARA LUEGO SE HAGA FUNCIONAL. Y SEGUN LAS PRIMERAS CASILLAS QUE SIRVAN COMO PUNTO DE INICIO PARA EL MARCADO DE LAS PRIMERAS COLUMNAS

					casillaActualDelTablero.addEventListener("contextmenu", (event) => {
						event.preventDefault();
						if(!juego.modoDeColocacionDeBarco){
							juego.modoDeColocacionDeBarco = true;
							desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion)
							remarcarCasillasVertical(juego.primeraPosicion)
						} else {
							juego.modoDeColocacionDeBarco = false;
							desmarcarCasillasVertical(juego.primeraPosicion);
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