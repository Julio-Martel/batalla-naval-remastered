
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

import {ocuparCasillasDelTablero} from './ocuparCasillasDelTablero.js';

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

		const juego = {
			desactivarCeldas: false,
			casillasQueHanSidoOcupadas: [],
			fichaColocada: false,
			tableroUsadoPorPrimeraVez: false,
			multiplosDeOnceMasUno: [],
			casillasABloquear: [],
			primeraPosicion: null,
			ultimaPosicion: null,
			posicionesCargadasPorPrimeraVez : false,
			listaPrimerasCasillasParaRemarcar: [],
			listadoParesOrdenados: [6,17,28,39,50,61,72,83,94,105,116],
			listadoSegundosValoresCoordenadas: [
				[6,10],[17,21],[28,32],[39,43],
				[50,54],[61,65],[72,76],[83,87],
				[94,98],[105,109],[116,120]
			]
		};

		const casillasDeCadaBarco = {
			cantidadDeCasillasBismark: 5
		};


		for(let k = 0; k < 11; k++){
			let multiploDeOnce = (k + 1) * 11;
			let sumarleUno = multiploDeOnce + 1;
			juego.multiplosDeOnceMasUno.push(sumarleUno);
		}

		let primerElementoListado = 6;
		for(let i = 0; i < 11; i++){
			juego.listaPrimerasCasillasParaRemarcar.push(primerElementoListado);
			let incrementarElemento = primerElementoListado + 11;
			juego.primerElementoListado = incrementarElemento;
		}

		const remarcarCasillas = (elementoPosicion1, elmentoPosicion2) => {
			for(let y = elementoPosicion1; y <= elmentoPosicion2; y++){
				let obtenerIdCasillaActual = document.getElementById(`casilla-0-${y}`);
				juego.casillasABloquear.push(obtenerIdCasillaActual);
				obtenerIdCasillaActual.style.background = "darkred"; 
			}								
		}

		const desmarcarCasillas = (elementoPosicion1,elmentoPosicion2) => {

		}

////////////////////////////////////

		tablero.style.pointerEvents = "auto";
		tablero.style.opacity = "1";
		barcos.style.opacity = "0.5";

		switch(nroBarcoSeleccionado) {
			case 0:		
				if(!juego.tableroUsadoPorPrimeraVez) {
						
					casillasDelTablero.forEach(casillaActualDelTablero => {
						
						casillaActualDelTablero.addEventListener('mouseover', () => {
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);	
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
					
							// corregir aqui

							if(verifEstadoPosicion) {
								
								juego.primeraPosicion = posicionDeLaCasillaActual;
								juego.ultimaPosicion = juego.primeraPosicion + 4;
								
								
								console.log(juego.primeraPosicion, juego.ultimaPosicion);

								remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion)
								

							} else if(juego.primeraPosicion !== null && juego.ultimaPosicion !== null && (posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion) ) {
			
								remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);


							} else {
								let incrementarElemento = posicionDeLaCasillaActual + 4;
								
								
								remarcarCasillas(posicionDeLaCasillaActual,incrementarElemento);		
							}
							
							console.log(juego.casillasABloquear)
						
						});


						// corregir problema de que aun seleccionando las ultimas casillas, aun se guardan las demas, que al pasar por otras casillas, las anteriores se ven marcadas

						casillaActualDelTablero.addEventListener('mouseout', () => {
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
													
							if(verifEstadoPosicion && ((posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion))){
					
								for(let x = juego.primeraPosicion; x <= juego.ultimaPosicion; x++) {
									let aplicarColorACasilla = document.getElementById(`casilla-0-${x}`);
									aplicarColorACasilla.style.background = "none";	
								}												
								
							} else {
								if((posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual < juego.ultimaPosicion)) {
									
									for(let x = juego.primeraPosicion; x <= juego.ultimaPosicion; x++) {
										let aplicarColorACasilla = document.getElementById(`casilla-0-${x}`);
										aplicarColorACasilla.style.background = "none";	
									}									
									
								} else {
									casillasDelTablero.forEach(casilla => casilla.style.background = "none");
								}
							
								
							}

							juego.casillasABloquear = [];

						})

					});
				
				
			
						
				
				} else {

					// AGREGANDO EL ELSE EN CASO DE QUE SI NO ES LA PRIMERA VEZ, LA MISMA PODRA SELECCIONAR LAS CASILLAS PERO NO SE PODRA SUPERPONER SOBRE CASILLAS YA SELECCIONADAS

					casillasABloquear.forEach(casillaActual => {
						let casillaOcupada = casillasABloquear.includes(casillaActual);
						if(!casillaActual){
							casillaActual.addEventListener('mouseover')
						}
					});

							
				}
			
			break;
		

		}

	// AGREGAR EL RESOLVE QUE RETORNARA UNA PROMESA QUE PARA CUANDO SE COLOQUEN TODAS LAS CASILLAS EL BOTON DE EMPEZAR LA BATALLA ESTE LISTO PARA USARSE

	});
}