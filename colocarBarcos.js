
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
	let casillasABloquear = [];

	for(let k = 0; k < 11; k++){
		let multiploDeOnce = (k + 1) * 11;
		let sumarleUno = multiploDeOnce + 1;
		multiplosDeOnceMasUno.push(sumarleUno);
	}

	tablero.style.pointerEvents = "auto";
	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:
			
			const cantidadDeCasillasBismark = 5;

			if(!tableroUsadoPorPrimeraVez) {
					
				casillasDelTablero.forEach(casillaActualDelTablero => {
				
					casillaActualDelTablero.addEventListener('mouseover', () => {

						let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
						let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
						let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);

						if(posicionDeLaCasillaActual === 6 || posicionDeLaCasillaActual === 7 || posicionDeLaCasillaActual === 8 || posicionDeLaCasillaActual === 9 || posicionDeLaCasillaActual === 10) {
							
							for(let u = 6; u < 11; u++) {
								let obtenerIdPosicion = document.getElementById(`casilla-0-${u}`);
								casillasABloquear.push(obtenerIdPosicion)
								obtenerIdPosicion.style.background = "darkred";
							}
						
						} else {
						
							let oscurecerSiguienteCasilla = posicionDeLaCasillaActual;
						
							for(let k = 0; k < 5; k++){				
								let IdCasillaActualAOscurecer = document.getElementById(`casilla-0-${oscurecerSiguienteCasilla}`);
								IdCasillaActualAOscurecer.style.background = "darkred";
								casillasABloquear.push(IdCasillaActualAOscurecer);
								oscurecerSiguienteCasilla++;
							}								
						}

						casillasABloquear = [];
					});

					casillaActualDelTablero.addEventListener('mouseout', () => {
			
						if(desactivarCeldas) {
							return;
						}
						
						// AVERIGUAR COMO HACER QUE LAS CASILLAS CERCANAS AL BORDE DEL TABLERO DESAPAREZCAN PARA LUEGO PODER HACE QUE TODOS LAS CASILLAS SELECCIONADAS DESAPAREZCAN

						let idcasilla = casillaActualDelTablero.getAttribute('id');
						let casillaid = document.getElementById(idcasilla);

						let poscasilla = Array.from(casillasDelTablero).indexOf(casillaid);

						casillasDelTablero.forEach(casilla => casilla.style.background = "none")
						
						
						casillasABloquear = [];
					})

					casillaActualDelTablero.addEventListener('click', () => {
						let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id');
						let idCasillaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);
						
						idCasillaActualDelTablero.style.background = "yellow";
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
			
			
			
			
			
			
			
			} /*else {

				casillasDelTablero.forEach(casillaActualDelTablero => {
					let casillaOcupada = casillasQueHanSidoOcupadas.includes(casillaActualDelTablero);
					if(!casillaOcupada){
						casillaActualDelTablero.addEventListener('mouseover', () => {
							
							console.log('adasds')
							
							let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id')
							let idCasilaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);

							idCasilaActualDelTablero.style.background = "pink";
						})
					}	
				});			
			}*/
		
		break;
	

	}
	});
}