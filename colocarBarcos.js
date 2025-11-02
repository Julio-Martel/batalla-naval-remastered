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

		const generarArreglo3 = () => {
			let iniciadorArreglo = 7;
			let Arreglo = [];
			let copiaIniciadorArreglo = 7;

			for(let i = 0; i < 6; i++){
				let arregloElemento = [];
				arregloElemento.push(iniciadorArreglo)
				for(let j = 0; j < 3; j++){
					iniciadorArreglo = iniciadorArreglo + 1;
					arregloElemento.push(iniciadorArreglo);
				} 
			
				Arreglo.push(arregloElemento);
				copiaIniciadorArreglo = copiaIniciadorArreglo + 11;
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
			arregloNuevoTres: generarArreglo3(),
			ultimosNros: [73,74,75,76],
			columnaNuevosNumeros: null
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
			for(let x = elementoPosicion2; x >= elementoPosicion1 ;  x--) {
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

			const encontrarNumerosCorrespondientes = (elementoAverificar) => {
				let encontrado = false;
				for (let i = 0; i < juego.arregloNuevoDos.length; i++) {
					for (let j = 0; j < juego.arregloNuevoDos[i].length; j++) {
						if (elementoAverificar === juego.arregloNuevoDos[i][j]) {
							juego.columnaNuevosNumeros = i;
							encontrado = true;
							break;
							
						}
					}
				}

				return encontrado;
			}

			const encontrarNumerosCorrespondientesDos = (elementoAverificar) => {
				let encontrado = false;
				for (let i = 0; i < juego.arregloNuevoTres.length; i++) {
					for (let j = 0; j < juego.arregloNuevoTres[i].length; j++) {
						if (elementoAverificar === juego.arregloNuevoTres[i][j]) {
							juego.columnaNuevosNumeros = i;
							encontrado = true;
							break;
							
						}
					}
				}

				return encontrado;
			}

		console.log(juego.arregloNuevoDos)

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
						let comprobarNuevoNumeroDeNuevoArreglo = encontrarNumerosCorrespondientes(posicionDeLaCasillaActual);

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

								if(posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65){

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
										
										if(juego.columnaNuevosNumeros === 0){
											juego.primeraPosicion = 67;
										} else if(juego.columnaNuevosNumeros === 1){
											juego.primeraPosicion = 68;
										} else if(juego.columnaNuevosNumeros === 2){
											juego.primeraPosicion = 69;
										} else if(juego.columnaNuevosNumeros === 3){
											juego.primeraPosicion = 70;
										} else if(juego.columnaNuevosNumeros === 4){
											juego.primeraPosicion = 71;
										} else if(juego.columnaNuevosNumeros === 5){
											juego.primeraPosicion = 72;
										} else if(juego.columnaNuevosNumeros === 6){
											juego.primeraPosicion = 73;
										} else if(juego.columnaNuevosNumeros === 7){
											juego.primeraPosicion = 74;
										} else if(juego.columnaNuevosNumeros === 8){
											juego.primeraPosicion = 75;
										} else {
											juego.primeraPosicion = 76;
										}

										remarcarCasillasVertical(juego.primeraPosicion);

								}
						
							}

						});

					casillaActualDelTablero.addEventListener('mouseout', () => {
								
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
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
												
								if(posicionDeLaCasillaActual === 110 || posicionDeLaCasillaActual === 99 || posicionDeLaCasillaActual === 88 || posicionDeLaCasillaActual === 77 || posicionDeLaCasillaActual === 66){
									let restarElemento = 110 - (juego.cantidadDeCasillasBarco * 11);
									juego.primeraPosicion = restarElemento;
									desmarcarCasillasVertical(juego.primeraPosicion);
								} else if(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 76) {
									desmarcarCasillasVertical(posicionDeLaCasillaActual);
								}  else if(posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 120){
									let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
									desmarcarCasillasVertical(restarElemento)
								} else if(posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65) {
									desmarcarCasillasVertical(posicionDeLaCasillaActual)
								} else if(comprobarNuevoNumeroDeNuevoArreglo){
									
									if(juego.columnaNuevosNumeros === 0){
											juego.primeraPosicion = 67;
										} else if(juego.columnaNuevosNumeros === 1){
											juego.primeraPosicion = 68;
										} else if(juego.columnaNuevosNumeros === 2){
											juego.primeraPosicion = 69;
										} else if(juego.columnaNuevosNumeros === 3){
											juego.primeraPosicion = 70;
										} else if(juego.columnaNuevosNumeros === 4){
											juego.primeraPosicion = 71;
										} else if(juego.columnaNuevosNumeros === 5){
											juego.primeraPosicion = 72;
										} else if(juego.columnaNuevosNumeros === 6){
											juego.primeraPosicion = 73;
										} else if(juego.columnaNuevosNumeros === 7){
											juego.primeraPosicion = 74;
										} else if(juego.columnaNuevosNumeros === 8){
											juego.primeraPosicion = 75;
										} else {
											juego.primeraPosicion = 76;
										}


										desmarcarCasillasVertical(juego.primeraPosicion);
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
						let comprobarNuevoNumeroDeNuevoArreglo = encontrarNumerosCorrespondientes(posicionDeLaCasillaActual);

						event.preventDefault();
						
						if(!juego.modoDeColocacionDeBarco){
							
							juego.modoDeColocacionDeBarco = true;
							
							if(posicionDeLaCasillaActual === 110){
								
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								let diferenciaElemento = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

								desmarcarCasillas(posicionDeLaCasillaActual,diferenciaElemento)
								remarcarCasillasVertical(restarElemento)
														
							} else if(posicionDeLaCasillaActual === 66 || posicionDeLaCasillaActual === 77 || posicionDeLaCasillaActual === 88 || posicionDeLaCasillaActual === 99){
								
								juego.primeraPosicion = 66;
								juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

								desmarcarCasillas(posicionDeLaCasillaActual,juego.ultimaPosicion);
								remarcarCasillasVertical(juego.primeraPosicion)

							} else if(comprobarNuevoNumeroDeNuevoArreglo){
								
								let copiaJuegoPrimeraPosicioncopiaJuegoPrimeraPosicion = juego.primeraPosicion

								if(juego.columnaNuevosNumeros === 0){
									juego.primeraPosicion = 67;
								} else if(juego.columnaNuevosNumeros === 1){
									juego.primeraPosicion = 68;
								} else if(juego.columnaNuevosNumeros === 2){
									juego.primeraPosicion = 69;
								} else if(juego.columnaNuevosNumeros === 3){
									juego.primeraPosicion = 70;
								} else if(juego.columnaNuevosNumeros === 4){
									juego.primeraPosicion = 71;
								} else if(juego.columnaNuevosNumeros === 5){
									juego.primeraPosicion = 72;
								} else if(juego.columnaNuevosNumeros === 6){
									juego.primeraPosicion = 73;
								} else if(juego.columnaNuevosNumeros === 7){
									juego.primeraPosicion = 74;
								} else if(juego.columnaNuevosNumeros === 8){
									juego.primeraPosicion = 75;
								} else {
									juego.primeraPosicion = 76;
								}
								
								if(posicionDeLaCasillaActual === 87){
									let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

									desmarcarCasillas(restarElemento,posicionDeLaCasillaActual);
									remarcarCasillasVertical(juego.primeraPosicion);
									
								} else if(posicionDeLaCasillaActual === 98){
									let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

									desmarcarCasillas(restarElemento,posicionDeLaCasillaActual);
									remarcarCasillasVertical(juego.primeraPosicion);

								} else if(posicionDeLaCasillaActual === 109){
									let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

									desmarcarCasillas(restarElemento,posicionDeLaCasillaActual);
									remarcarCasillasVertical(juego.primeraPosicion)
								
								} else if((posicionDeLaCasillaActual >= 84 && posicionDeLaCasillaActual <= 86 ) || (posicionDeLaCasillaActual >= 95 && posicionDeLaCasillaActual <= 97) || (posicionDeLaCasillaActual  >= 106 && posicionDeLaCasillaActual <= 108)){								
								
									desmarcarCasillas(copiaJuegoPrimeraPosicioncopiaJuegoPrimeraPosicion,juego.ultimaPosicion);
									remarcarCasillasVertical(juego.primeraPosicion);
								
								}else {

									juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

									desmarcarCasillas(posicionDeLaCasillaActual, juego.ultimaPosicion);
									remarcarCasillasVertical(juego.primeraPosicion);
								}

							} else if(posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 115){
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								let incrementar = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
							
								desmarcarCasillas(posicionDeLaCasillaActual,incrementar);
								remarcarCasillasVertical(restarElemento)
								
							} else if(posicionDeLaCasillaActual === 116){
								
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								let incrementar = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;								
								juego.primeraPosicion = posicionDeLaCasillaActual;
								desmarcarCasillas(posicionDeLaCasillaActual,incrementar);
								remarcarCasillasVertical(restarElemento)
							
							} else if(posicionDeLaCasillaActual === 117){
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;

								desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
								remarcarCasillasVertical(restarElemento)
							
							} else if(posicionDeLaCasillaActual >= 117 && posicionDeLaCasillaActual <= 120){
								let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;

								desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
								remarcarCasillasVertical(restarElemento);

							} else if(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 72){
								
								juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
								
								desmarcarCasillas(posicionDeLaCasillaActual,juego.ultimaPosicion);
								remarcarCasillasVertical(posicionDeLaCasillaActual);								

							} else if(posicionDeLaCasillaActual >= 73 && posicionDeLaCasillaActual <= 76){
								
								let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

								desmarcarCasillas(restarElemento,posicionDeLaCasillaActual);
								desmarcarCasillas(72,76)
								remarcarCasillasVertical(posicionDeLaCasillaActual);

							}else if(posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65) {
								let comprobarNumeroSiEstaEnElArreglo = encontrarNumerosCorrespondientesDos(posicionDeLaCasillaActual);
							
								if(comprobarNumeroSiEstaEnElArreglo){
								
									if(juego.columnaNuevosNumeros === 0){
										juego.primeraPosicion = 6;
									} else if(juego.columnaNuevosNumeros === 1){
										juego.primeraPosicion = 18;
									} else if(juego.columnaNuevosNumeros === 2){
										juego.primeraPosicion = 28;
									} else if(juego.columnaNuevosNumeros === 3){
										juego.primeraPosicion = 39;
									} else if(juego.columnaNuevosNumeros === 4){
										juego.primeraPosicion = 50;
									} else {
										juego.primeraPosicion = 76;
									}									

									let copiaJuegoPrimeraPosicioncopiaJuegoPrimeraPosicion = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
									juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;

									desmarcarCasillas(copiaJuegoPrimeraPosicioncopiaJuegoPrimeraPosicion,juego.ultimaPosicion);
									desmarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
									remarcarCasillasVertical(posicionDeLaCasillaActual);



								} else {
									
									juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

									desmarcarCasillas(posicionDeLaCasillaActual,juego.ultimaPosicion);
									remarcarCasillasVertical(juego.primeraPosicion);
								}
							
							}
							
						} else {

								juego.modoDeColocacionDeBarco = false;  

								if(posicionDeLaCasillaActual === 110){
									let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
								
									juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
									
									juego.primeraPosicion = posicionDeLaCasillaActual;

									desmarcarCasillasVertical(restarElemento);
									
									remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);
								
								} else if(posicionDeLaCasillaActual === 66 || posicionDeLaCasillaActual === 77 || posicionDeLaCasillaActual === 88 || posicionDeLaCasillaActual === 99){
								
								juego.primeraPosicion = 66;
								juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

								desmarcarCasillasVertical(juego.primeraPosicion);
								remarcarCasillas(posicionDeLaCasillaActual,juego.ultimaPosicion)

								} else if(posicionDeLaCasillaActual >= 111 && posicionDeLaCasillaActual <= 115){
									let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);

									juego.ultimaPosicion = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
									juego.primeraPosicion = posicionDeLaCasillaActual;

									desmarcarCasillasVertical(restarElemento);
									remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
								
								} else if(posicionDeLaCasillaActual === 116){
									let restarElemento = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
									let incrementar = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
									
									desmarcarCasillasVertical(restarElemento);
									remarcarCasillas(posicionDeLaCasillaActual, incrementar);


								}else if(posicionDeLaCasillaActual === 117){
									let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
									let restarElementoALaUltimaBase = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);

									juego.primeraPosicion =  restarElemento;

									desmarcarCasillasVertical(restarElementoALaUltimaBase);
									remarcarCasillas(juego.primeraPosicion,posicionDeLaCasillaActual);


								} else if(posicionDeLaCasillaActual >= 117 && posicionDeLaCasillaActual <= 120){
									let restarElementoALaUltimaBase = posicionDeLaCasillaActual - (juego.cantidadDeCasillasBarco * 11);
									juego.primeraPosicion = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
									
									desmarcarCasillasVertical(restarElementoALaUltimaBase);
									remarcarCasillas(juego.primeraPosicion,posicionDeLaCasillaActual);
								
								} else if(comprobarNuevoNumeroDeNuevoArreglo){

									if(juego.columnaNuevosNumeros === 0){
										juego.primeraPosicion = 67;
									} else if(juego.columnaNuevosNumeros === 1){
										juego.primeraPosicion = 68;
									} else if(juego.columnaNuevosNumeros === 2){
										juego.primeraPosicion = 69;
									} else if(juego.columnaNuevosNumeros === 3){
										juego.primeraPosicion = 70;
									} else if(juego.columnaNuevosNumeros === 4){
										juego.primeraPosicion = 71;
									} else if(juego.columnaNuevosNumeros === 5){
										juego.primeraPosicion = 72;
									} else if(juego.columnaNuevosNumeros === 6){
										juego.primeraPosicion = 73;
									} else if(juego.columnaNuevosNumeros === 7){
										juego.primeraPosicion = 74;
									} else if(juego.columnaNuevosNumeros === 8){
										juego.primeraPosicion = 75;
									} else {
										juego.primeraPosicion = 76;
									}									

									if(posicionDeLaCasillaActual === 87){
										let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

										juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;

										desmarcarCasillasVertical(juego.primeraPosicion, juego.ultimaPosicion);
										remarcarCasillas(restarElemento,posicionDeLaCasillaActual);
									
									} else if(posicionDeLaCasillaActual === 98){
										let decrementarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
										
										juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;


										desmarcarCasillasVertical(juego.primeraPosicion,juego.ultimaPosicion);
										remarcarCasillas(decrementarElemento,posicionDeLaCasillaActual);

									} else if(posicionDeLaCasillaActual === 109){
										let decrementarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
										juego.ultimaPosicion = juego.primeraPosicion + (juego.cantidadDeCasillasBarco * 11);

										desmarcarCasillasVertical(juego.primeraPosicion,juego.ultimaPosicion);
										remarcarCasillas(decrementarElemento, posicionDeLaCasillaActual);

									} else if((posicionDeLaCasillaActual >= 84 && posicionDeLaCasillaActual <= 86 ) || (posicionDeLaCasillaActual >= 95 && posicionDeLaCasillaActual <= 97) || (posicionDeLaCasillaActual  >= 106 && posicionDeLaCasillaActual <= 108)){
										
										let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

										juego.ultimaPosicion = juego.primeraPosicion + (juego.cantidadDeCasillasBarco * 11);
										

										desmarcarCasillasVertical(juego.primeraPosicion,juego.ultimaPosicion);
										remarcarCasillas(restarElemento, posicionDeLaCasillaActual);
									} else {
										
										let incrementarElemento = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;

										juego.ultimaPosicion = juego.primeraPosicion + juego.cantidadDeCasillasBarco;


										desmarcarCasillasVertical(juego.primeraPosicion,juego.ultimaPosicion );
										remarcarCasillas(posicionDeLaCasillaActual,incrementarElemento)
									}

								} else if(posicionDeLaCasillaActual >= 67 && posicionDeLaCasillaActual <= 72){
									let incrementarElemento = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
									juego.ultimaPosicion = posicionDeLaCasillaActual + (juego.cantidadDeCasillasBarco * 11);

									desmarcarCasillasVertical(posicionDeLaCasillaActual,juego.ultimaPosicion);
									remarcarCasillas(posicionDeLaCasillaActual,incrementarElemento);
								
								} else if(posicionDeLaCasillaActual >= 73 && posicionDeLaCasillaActual <= 76){
									let restarElemento = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;

									juego.ultimaPosicion = posicionDeLaCasillaActual + (juego.cantidadDeCasillasBarco * 11);

									desmarcarCasillasVertical(posicionDeLaCasillaActual,juego.ultimaPosicion);
									remarcarCasillas(restarElemento,posicionDeLaCasillaActual);

								} else if(posicionDeLaCasillaActual >= 0 && posicionDeLaCasillaActual <= 65){
									let comprobarNumeroSiEstaEnElArreglo = encontrarNumerosCorrespondientesDos(posicionDeLaCasillaActual);
								
									if(comprobarNumeroSiEstaEnElArreglo){

										if(juego.columnaNuevosNumeros === 0){
											juego.primeraPosicion = 6;
										} else if(juego.columnaNuevosNumeros === 1){
											juego.primeraPosicion = 18;
										} else if(juego.columnaNuevosNumeros === 2){
											juego.primeraPosicion = 28;
										} else if(juego.columnaNuevosNumeros === 3){
											juego.primeraPosicion = 39;
										} else if(juego.columnaNuevosNumeros === 4){
											juego.primeraPosicion = 50;
										} else {
											juego.primeraPosicion = 76;
										}	
										
										let incrementarElemento = posicionDeLaCasillaActual + (juego.cantidadDeCasillasBarco * 11);
										juego.primeraPosicion = posicionDeLaCasillaActual - juego.cantidadDeCasillasBarco;
								

										desmarcarCasillasVertical(posicionDeLaCasillaActual,incrementarElemento);
										remarcarCasillas(juego.primeraPosicion, posicionDeLaCasillaActual);

										
									} else {

										let incrementarElemento = posicionDeLaCasillaActual + juego.cantidadDeCasillasBarco;
										juego.ultimaPosicion = posicionDeLaCasillaActual + (juego.cantidadDeCasillasBarco * 11);
										
										desmarcarCasillasVertical(posicionDeLaCasillaActual,juego.ultimaPosicion);
										remarcarCasillas(posicionDeLaCasillaActual, incrementarElemento);
									}							
								}
							
						
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