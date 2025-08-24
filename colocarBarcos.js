
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, casillasDelTablero ,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

		const juego = {
			desactivarCeldas: false,
			casillasQueHanSidoOcupadas: [],
			fichaColocada: false,
			multiplosDeOnceMasUno: [],
			casillasABloquear: [],
			primeraPosicion: null,
			ultimaPosicion: null,
			casillaColocada: false,
			listadoParesOrdenados: [6,17,28,39,50,61,72,83,94,105,116],
			listadoParesOrdenadosY: [10,21,32,43,54,65,76,87,98,109,120],
			coordenadasXY: [[6,10],[17,21],[28,32],[39,43],[50,54],[61,65],[72,76],[83,87],[94,98],[105,109],[116,120]]
		};

		const casillasDeCadaBarco = {
			cantidadDeCasillasBismark: 5
		};


		for(let k = 0; k < 11; k++){
			let multiploDeOnce = (k + 1) * 11;
			let sumarleUno = multiploDeOnce + 1;
			juego.multiplosDeOnceMasUno.push(sumarleUno);
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

		tablero.style.pointerEvents = "auto";
		tablero.style.opacity = "1";
		barcos.style.opacity = "0.5";

		switch(nroBarcoSeleccionado) {
			case 0:							
					casillasDelTablero.forEach(casillaActualDelTablero => {
						
						casillaActualDelTablero.addEventListener('mouseover', () => {
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);	
							let posicionDeLaCasillaActualY = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);
							let verifEstadoPosicionY = juego.listadoParesOrdenadosY.includes(posicionDeLaCasillaActualY);
							let numeroEntreRango = comprobarRango(posicionDeLaCasillaActual);

							if(verifEstadoPosicion) {
								juego.primeraPosicion = posicionDeLaCasillaActual;
								juego.ultimaPosicion = juego.primeraPosicion + 4;

								remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);

							} else if(juego.primeraPosicion !== null && juego.ultimaPosicion !== null && (posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion)) {
						
								remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion)			
						
							} else if(verifEstadoPosicionY){				
								let decrementarElemento = posicionDeLaCasillaActual - 4;	
								juego.primeraPosicion = decrementarElemento;
								juego.ultimaPosicion = posicionDeLaCasillaActual;
								
								remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);		
							
							} else if (numeroEntreRango) {
								remarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);
							
							} else {
				
								let incrementarElemento = posicionDeLaCasillaActual + 4;

								juego.primeraPosicion = posicionDeLaCasillaActual;
								juego.ultimaPosicion = incrementarElemento;

								remarcarCasillas(juego.primeraPosicion,juego.ultimaPosicion);
							}
						
						});

						casillaActualDelTablero.addEventListener('mouseout', () => {
							
							let obtenerIdCasillaActual = casillaActualDelTablero.getAttribute('id');
							let idCasillaActual = document.getElementById(obtenerIdCasillaActual);
							let posicionDeLaCasillaActual = Array.from(casillasDelTablero).indexOf(idCasillaActual);
							let verifEstadoPosicion = juego.listadoParesOrdenados.includes(posicionDeLaCasillaActual);

							if(verifEstadoPosicion && ((posicionDeLaCasillaActual >= juego.primeraPosicion && posicionDeLaCasillaActual <= juego.ultimaPosicion))){

								desmarcarCasillas(juego.primeraPosicion, juego.ultimaPosicion);												
								
							} else if (juego.primeraPosicion === null) {
								console.log(juego.primeraPosicion)
								let incrementarCasillaDeLaPosicionActual = juego.primeraPosicion + 4;	
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
							
							juego.casillasABloquear = [];

						})

						casillaActualDelTablero.addEventListener('click', () => {

							juego.casillaColocada = true;

							tablero.style.opacity = "0.1";
							tablero.style.pointerEvents = "none";
						
							barcos.style.opacity = "1";
							barcos.style.pointerEvents = "auto";
						})

						casillaActualDelTablero.addEventListener("contextmenu", (event) => {
							event.preventDefault();
						})
					
					
					});
			
			break;
		

		}

	// AGREGAR EL RESOLVE QUE RETORNARA UNA PROMESA QUE PARA CUANDO SE COLOQUEN TODAS LAS CASILLAS EL BOTON DE EMPEZAR LA BATALLA ESTE LISTO PARA USARSE


		

	});
}