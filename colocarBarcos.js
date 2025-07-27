
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

import {ocuparCasillasDelTablero} from './ocuparCasillasDelTablero.js';

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

	let desactivarCeldas = false;
	let casillasQueHanSidoOcupadas = [];
	let fichaColocada = false;
	let tableroUsadoPorPrimeraVez = false; // si usamos por primera vez el tablero, todas las casillas estaran a nuestra disposicion, pero si ya fue usado todas las casillas pasaran por una condicional que nos permitira ignorar ciertas casillas
	let multiplosDeOnceMasUno = [];
	let casillasABloquear;
	let listaPrimerasCasillasParaRemarcar = [];


	for(let k = 0; k < 11; k++){
		let multiploDeOnce = (k + 1) * 11;
		let sumarleUno = multiploDeOnce + 1;
		multiplosDeOnceMasUno.push(sumarleUno);
	}

	let primerElementoListado = 6;
	for(let i = 0; i < 11; i++){
		listaPrimerasCasillasParaRemarcar.push(primerElementoListado);
		let incrementarElemento = primerElementoListado + 11;
		primerElementoListado = incrementarElemento;
	}

	const remarcarCasillas = (elementoPosicion1, elmentoPosicion2) => {
		for(let y = elementoPosicion1; y < elmentoPosicion2; y++){
			let obtenerIdCasillaActual = document.getElementById(`casilla-0-${y}`);
			casillasABloquear.push(obtenerIdCasillaActual);
			obtenerIdCasillaActual.style.background = "darkred";
		}								
	}

	const verificarPosicionEnListado = (posicionAverificar,primeraPosicion) => {
		const listadoParesOrdenados = [6,17,28,39,50,61,72,83,94,105,116];
		const listadoSegundosValoresCoordenadas = [[6,10],[17,21],[28,32],[39,43],[50,54],[61,65],[72,76],[83,87],[94,98],[105,109],[116,120]];
		let verificado = false;

		let verificaPosicionEnElArreglo = listadoParesOrdenados.includes(posicionAverificar);



		// agregar condicional de verificaPosicionEnElArreglo
		if(verificaPosicionEnElArreglo) {
			listadoSegundosValoresCoordenadas.forEach(parOrdenado => {
				let primerValorParOrdenado = parOrdenado[0];
				let segundoValorParOrdenado;
				if(primerValorParOrdenado === posicionAverificar) {
					segundoValorParOrdenado = parOrdenado[1] + 1;
					
					primeraPosicion = posicionAverificar;
					
					console.log(primeraPosicion,segundoValorParOrdenado)

					remarcarCasillas(primeraPosicion,segundoValorParOrdenado);				
				} else {
					remarcarCasillas(primeraPosicion,segundoValorParOrdenado);	
				}
			})
		
			verificado = true;
		}
	
		return verificado;
	}


	tablero.style.pointerEvents = "auto";
	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:		
			const cantidadDeCasillasBismark = 5;
			let ultimaPosicion, primeraPosicion;

			if(!tableroUsadoPorPrimeraVez) {
					
				casillasDelTablero.forEach(casillaActualDelTablero => {
				
					casillaActualDelTablero.addEventListener('mouseover', () => {

						casillasABloquear = [];

						let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
						let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
						let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
						
						let verifEstadoPosicion = verificarPosicionEnListado(posicionDeLaCasillaActual,primeraPosicion);

						if(!verifEstadoPosicion) {
							idCasillaActual.style.background = "darkred"
							casillasABloquear.push(idCasillaActual);
							
							let asignarPosicionComoValorIncremental = posicionDeLaCasillaActual;

							for(let k = 1; k < 5; k++ ){
								asignarPosicionComoValorIncremental++;
								let siguientePosicionEnCambiarDeColor = document.getElementById(`casilla-0-${asignarPosicionComoValorIncremental}`);
								siguientePosicionEnCambiarDeColor.style.background = "darkred";
								casillasABloquear.push(siguientePosicionEnCambiarDeColor);
							}
						} 
						
						
						
						
						/*if((posicionDeLaCasillaActual >= 6 && posicionDeLaCasillaActual <= 10) || (posicionDeLaCasillaActual >= 17 && posicionDeLaCasillaActual <= 21) || (posicionDeLaCasillaActual >= 28 && posicionDeLaCasillaActual <= 33) || (posicionDeLaCasillaActual >= 116 && posicionDeLaCasillaActual <= 120)) {

							console.log(posicionDeLaCasillaActual)

							let primerPosicionClave = listaPrimerasCasillasParaRemarcar.includes(posicionDeLaCasillaActual);

							if(primerPosicionClave){   
								primeraPosicion = posicionDeLaCasillaActual;
								ultimaPosicion = primeraPosicion + 5;
								
								remarcarCasillas(primeraPosicion,ultimaPosicion);
														
							} else {
								remarcarCasillas(primeraPosicion,ultimaPosicion);
							}

						} else {
							
							idCasillaActual.style.background = "darkred"
							casillasABloquear.push(idCasillaActual);
							
							let asignarPosicionComoValorIncremental = posicionDeLaCasillaActual;

							for(let k = 1; k < 5; k++ ){
								asignarPosicionComoValorIncremental++;
								let siguientePosicionEnCambiarDeColor = document.getElementById(`casilla-0-${asignarPosicionComoValorIncremental}`);
								siguientePosicionEnCambiarDeColor.style.background = "darkred";
								casillasABloquear.push(siguientePosicionEnCambiarDeColor);
							}
						}*/
					});

					casillaActualDelTablero.addEventListener('mouseout', () => {
						let obtenerIdCasillaActualASoltar = casillaActualDelTablero.getAttribute('id');
						let idCasillaActualIdASoltar = document.getElementById(obtenerIdCasillaActualASoltar);
						let posicionDeLaCasillaActualASoltar = Array.from(casillasDelTablero).indexOf(idCasillaActualIdASoltar);

						// SOLUCION PARCIAL	

						// UNA SOLUCION QUE PODRIA AGREGAR ES, MEDIANTE UNA CONDICIONAL QUE AL DETECTAR LA POSICION, LA MISMA SEA BUSCADA EN UN ARRAY DONDE SE ENCUENTREN EL PAR ORDENADO DE DICHAS COORDENADAS, SEGUN CUAL SEA COMPARANDO LA POSICION CON EL VALOR 0 DEL ARREGLO DEL PRIMER ELEMENTO, PODRIAMOS DETECTARLO ASI APLICAR LA DESARICION DE LOS CUADRADOS EN ROJO

						if((posicionDeLaCasillaActualASoltar >= 6 && posicionDeLaCasillaActualASoltar <= 10) || (posicionDeLaCasillaActualASoltar >= 17 && posicionDeLaCasillaActualASoltar <= 21) || (posicionDeLaCasillaActualASoltar >= 28 && posicionDeLaCasillaActualASoltar <= 32) || (posicionDeLaCasillaActualASoltar >= 116 && posicionDeLaCasillaActualASoltar <= 120)) {
								casillasDelTablero.forEach(casillaASoltar => {
									casillaASoltar.style.background = "none";
								})
						} else {

							casillasDelTablero.forEach(casillaASoltarGeneral => {
								casillaASoltarGeneral.style.background = "none";
							})
						}
					
						casillasABloquear = [];
					})

					casillaActualDelTablero.addEventListener('click', () => {
						let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id');
						let idCasillaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);
						
						idCasillaActualDelTablero.style.background = "darkred";
						idCasillaActualDelTablero.style.pointerEvents = "none";

						for(let j = 0; j < casillasQueHanSidoOcupadas.length; j++){	
							let ObtenerIdCasillaYaOcupada = casillasQueHanSidoOcupadas[j].getAttribute('id');						
							let idCasillaYaOcupada = document.getElementById(ObtenerIdCasillaYaOcupada);
				
							idCasillaYaOcupada.style.background = "yellow";
							idCasillaYaOcupada.style.pointerEvents = "none";
						}

						desactivarCeldas = true;
						
						ocuparCasillasDelTablero(casillasDelTablero,casillasQueHanSidoOcupadas);

						tablero.style.opacity = "0.1";
						tablero.style.pointerEvents = "none";

						barcos.style.opacity = "1";
						barcos.style.pointerEvents = "auto"; 			
				
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