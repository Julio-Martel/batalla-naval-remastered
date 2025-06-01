export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, totalCasillasDelTablero,tablero,barcos) => {
	return new Promise(resolve => {

	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:
			let casillasBismark = [];

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

				});
			
				casillaDelTableroActual.addEventListener('click', () => {	
			
					let casillaActualAAgregarEfecto = casillaDelTableroActual.getAttribute('id');
					let idCasillaActualAAgregarEfecto = document.getElementById(casillaActualAAgregarEfecto);

					let posicionActualDeLaCasilla = Array.from(totalCasillasDelTablero).indexOf(idCasillaActualAAgregarEfecto);

					let siguientePosicion = posicionActualDeLaCasilla;


					for(let i = 0; i < 5; i++) {
						let obtenerIdDeLaCasillaActual = document.getElementById(`casilla-0-${siguientePosicion}`);
						casillasBismark.push(obtenerIdDeLaCasillaActual);
						siguientePosicion++;
					}	

					totalCasillasDelTablero.forEach(casillaAAplicarColor => {
						let idCasillaColor = casillaAAplicarColor.getAttribute('id');
						let idCas = document.getElementById(idCasillaColor);
						let casillaEnCasillasBismark = casillasBismark.includes(idCas);
					
						if (casillaEnCasillasBismark) {
							idCas.style.background = "darkred";
							idCas.style.pointerEvents = "none";
							idCas.style.cursor = "none";
						}
					});

					tablero.style.opacity = "0.5";
					tablero.style.pointerEvents = "none";
					barcos.style.opacity = "1";
				})

			
				/*ARREGLAR ESTO*/

				casillaDelTableroActual.addEventListener('mouseout', () => {
					let obtenerIdDeLaCasillaActual = casillaDelTableroActual.getAttribute('id');
					let idCasillaActual = document.getElementById(obtenerIdDeLaCasillaActual);
					let existeCasillaEnArreglo = Array.from(casillasBismark).indexOf(idCasillaActual);

					if (existeCasillaEnArreglo) {
					let obtenerIdCasillaActualParaQuitarEfecto = casillaDelTableroActual.getAttribute('id');
					let casillaActualIdSinElEfecto = document.getElementById(obtenerIdCasillaActualParaQuitarEfecto);						
					
					casillaActualIdSinElEfecto.style.background = "none";
						
					casillasBismark.forEach(unaCasillaDelBismark => {
						unaCasillaDelBismark.style.background = "none"
					});	

					casillasBismark = [];
					}	
				})


			});
		
		break;

		/*luego se provara con los demas barcos*/

	}
	});
}