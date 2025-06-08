
//*he pensado en agregar un unico arreglo que en general pueda identeficar a un barco, se puede implementar mediante la longitud del arreglo
// . Ejemplo, el Bismark ocupa 5 casillas, entonces segun ese barco seleccionado, la longitud general se activira segun el barco que hayas seleccionado. usar parametros
//  */

export const colocarBarcosEnElTablero = async(nroBarcoSeleccionado, totalCasillasDelTablero,tablero,barcos,listadoDeCasillasOcupadas) => {
	return new Promise(resolve => {

	let desactivarCeldas = false;
	let casillasYaOcupadas = [];

	tablero.style.pointerEvents = "auto";
	tablero.style.opacity = "1";
	barcos.style.opacity = "0.5";

	switch(nroBarcoSeleccionado) {
		case 0:
			let verificadorDeCasillas = [];
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
					
					tablero.style.opacity = "0.1";
					tablero.style.pointerEvents = "none";

					barcos.style.opacity = "1";
					barcos.style.pointerEvents = "auto"; // aqui llegamos
				
					console.log(casillasYaOcupadas);
				})
		
			});
		
		break;

		/*luego se provara con los demas barcos*/

	}
	});
}