
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

import {ocuparCasillasDelTablero} from './ocuparCasillasDelTablero.js';

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, totalCasillasDelTablero,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

	let desactivarCeldas = false;
	let casillasYaOcupadas = [];
	let tableroSeteadoPorPrimeravez = false;
	let fichaColocada = false;

	tablero.style.pointerEvents = "auto";
	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:
			let verificadorDeCasillas = [];
			let casillasBismark = [];

			tableroSeteadoPorPrimeravez = true;

			totalCasillasDelTablero.forEach(casillaDelTableroActual => {
				
				casillaDelTableroActual.addEventListener('mouseover', () => {
					let obtenerIdCasillaActualParaAñadirColor = casillaDelTableroActual.getAttribute('id');
					let casillaActualIdConElEfecto = document.getElementById(obtenerIdCasillaActualParaAñadirColor);
				
					casillaActualIdConElEfecto.style.background = "darkred";

					let posicionActualDeLaCasilla = Array.from(totalCasillasDelTablero).indexOf(casillaActualIdConElEfecto);

					let siguientePosicion = posicionActualDeLaCasilla;

					for(let i = 0; i < 5; i++) {
						let obtenerIdDeLaCasillaActual = document.getElementById(`casilla-0-${siguientePosicion}`);
						casillasBismark.push(obtenerIdDeLaCasillaActual);
						siguientePosicion++;
						obtenerIdDeLaCasillaActual.style.background = "darkred";
					}					

					if (siguientePosicion === 12) {
						let ultimaCasilla;
						for(let j = 0; j < casillasBismark.length; j++){
							let obtenerIdCasilla = casillasBismark[j].getAttribute('id');
							let idCasilla = document.getElementById(obtenerIdCasilla);
							idCasilla.style.background = "none";
							idCasilla.style.pointerEvents = "none";
							ultimaCasilla =  idCasilla;
						}
						
						ultimaCasilla.style.pointerEvents = "auto";
					}
				});

				casillaDelTableroActual.addEventListener('mouseout', () => {
					if(desactivarCeldas) {
						return;
					}
					casillaDelTableroActual.style.background = "none";
					casillasBismark = [];
					verificadorDeCasillas = [];
					
					totalCasillasDelTablero.forEach(casillaActual => casillaActual.style.background = "none");	
				
				})

				casillaDelTableroActual.addEventListener('click', () => {
					for(let i = 0; i < casillasBismark.length; i++) {
						let valorIdCasilla = casillasBismark[i];
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
				})
		
			});
		
		break;
		
		case 1: 
			let casillasQueOcupaLaFichaDelBarco = [];
			const cantidadDeCasillasTirpitz = 4;

			if(!tableroSeteadoPorPrimeravez) {
				tableroSeteadoPorPrimeravez = true;
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
						barcos.style.pointerEvents = "auto"; // aqui llegamos					
					
					})

				})
			}

		break;

		/*luego se provara con los demas barcos*/

	}
	});
}