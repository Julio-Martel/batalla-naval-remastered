
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

import {ocuparCasillasDelTablero} from './ocuparCasillasDelTablero.js';

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, totalCasillasDelTablero,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

	let desactivarCeldas = false;
	let casillasQueHanSidoOcupadas = [];
	let fichaColocada = false;
	let tableroUsadoPorPrimeraVez = false; // si usamos por primera vez el tablero, todas las casillas estaran a nuestra disposicion, pero si ya fue usado todas las casillas pasaran por una condicional que nos permitira ignorar ciertas casillas

	tablero.style.pointerEvents = "auto";
	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:
			const cantidadDeCasillasBismark = 5;

			if(!tableroUsadoPorPrimeraVez) {
				totalCasillasDelTablero.forEach(casillaActualDelTablero => {
					
					casillaActualDelTablero.addEventListener('mouseover', () => {
						let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
						let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
					
						idCasillaActual.style.background = "darkred";

						let posicionDeLaCasillaActual = Array.from(totalCasillasDelTablero).indexOf(idCasillaActual);

						let siguientePosicion = posicionDeLaCasillaActual;

						for(let i = 0; i < cantidadDeCasillasBismark; i++) {
							let obtenerIdDeLaCasillaActual = document.getElementById(`casilla-0-${siguientePosicion}`);
							casillasQueHanSidoOcupadas.push(obtenerIdDeLaCasillaActual);
							siguientePosicion++;
							obtenerIdDeLaCasillaActual.style.background = "darkred";
						}					

						if (siguientePosicion === 12) {
							let ultimaCasilla;
							for(let j = 0; j < casillasQueHanSidoOcupadas.length; j++){
								let obtenerIdCasilla = casillasQueHanSidoOcupadas[j].getAttribute('id');
								let idCasilla = document.getElementById(obtenerIdCasilla);
								idCasilla.style.background = "none";
								idCasilla.style.pointerEvents = "none";
								ultimaCasilla =  idCasilla;
							}
							
							ultimaCasilla.style.pointerEvents = "auto";
						}
					});

					casillaActualDelTablero.addEventListener('mouseout', () => {
						if(desactivarCeldas) {
							return;
						}
						casillaActualDelTablero.style.background = "none";
						casillasBismark = [];
						verificadorDeCasillas = [];
						
						totalCasillasDelTablero.forEach(casillaActual => casillaActual.style.background = "none");	
					
					})

					/*casillaActualDelTablero.addEventListener('click', () => {
						
						for(let i = 0; i < casillasBismark.length; i++) {
							let casillaAAplicarElCambio = valorIdCasilla.getAttribute('id');
							let nodoObtenidoPorObjeto = document.getElementById(casillaAAplicarElCambio);
							casillasYaOcupadas.push(nodoObtenidoPorObjeto);
							nodoObtenidoPorObjeto.style.background = "green";
							nodoObtenidoPorObjeto.style.pointerEvents = "none";
							nodoObtenidoPorObjeto.style.cursor = "auto";				
						}

						desactivarCeldas = true;
						
						ocuparCasillasDelTablero(tablero,casillasYaOcupadas);

						tablero.style.opacity = "0.1";
						tablero.style.pointerEvents = "none";

						barcos.style.opacity = "1";
						barcos.style.pointerEvents = "auto"; // aqui llegamos
					
						console.log(casillasYaOcupadas);
					})*/
			
				});
			} else {

			}
		
		break;
		
		case 1: 
			let casillasQueOcupaLaFichaDelBarco = [];
			const cantidadDeCasillasTirpitz = 4;

			totalCasillasDelTablero.forEach(casillaActualDelTablero => {
				casillaActualDelTablero.addEventListener('mouseover', () => {
					let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id');
					let idCasillaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);
					let obtenerPosicionActualDeLaCasilla = Array.from(totalCasillasDelTablero).indexOf(idCasillaActualDelTablero);
					idCasillaActualDelTablero.style.background = "blue";
					
					for(let i = 0; i < cantidadDeCasillasTirpitz; i++) {
						let obtenerElIdDeLaCasillaParaAplicarEfecto = document.getElementById(`casilla-0-${obtenerPosicionActualDeLaCasilla}`);
						casillasQueOcupaLaFichaDelBarco.push(obtenerElIdDeLaCasillaParaAplicarEfecto);
						obtenerElIdDeLaCasillaParaAplicarEfecto.style.background = "blue";
						obtenerPosicionActualDeLaCasilla++;
					}
					
				})

				casillaActualDelTablero.addEventListener('mouseout', () => {
						
					if(fichaColocada) {
						return;
					}
						
					casillasQueOcupaLaFichaDelBarco.forEach(quitarEfectoDeLaCasillaActual => {
						quitarEfectoDeLaCasillaActual.style.background = "none";
					})
						
					casillasQueOcupaLaFichaDelBarco = [];
				})

				casillaActualDelTablero.addEventListener('click', () => {
					let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id');
					let idCasillaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);
						
					casillasQueOcupaLaFichaDelBarco.forEach(casillaActualAUsar => {
						casillaActualAUsar.style.background = "darkred";
						casillaActualAUsar.style.pointerEvents = "none";
					})

					fichaColocada = true;

					ocuparCasillasDelTablero(totalCasillasDelTablero,casillasQueOcupaLaFichaDelBarco);
						

					tablero.style.opacity = "0.1";
					tablero.style.pointerEvents = "none";

					barcos.style.opacity = "1";
					barcos.style.pointerEvents = "auto"; // aqui llegamos nuevamente					
					
				})
			})
		

		break;

		/*luego se probara con los demas barcos*/

	}
	});
}