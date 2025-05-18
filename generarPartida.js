export const generarPartidaParaUnSoloJugador = async(bandoSeleccionado,contenido) => {
	if (bandoSeleccionado === 'a') {
		const contenidoBandoNazi = `
			<div class="contenido-configuracion-tablero">
				<h1>Configura tu tablero</h1>
				<div class="seleccion-barcos-tablero">
					<div class="seccion-barcos">
					</div>
					<div class="tablero">
						<div class="casilla" id="casilla-vacia">
						</div>
						<div class="casilla" id="0-1">
						</div>
						<div class="casilla" id="0-2">
						</div>
						<div class="casilla" id="0-3">
						</div>
						<div class="casilla" id="0-4">
						</div>
						<div class="casilla" id="0-5">
						</div>					
						<div class="casilla" id="0-6">
						</div>
						<div class="casilla" id="0-7">
						</div>
						<div class="casilla" id="0-8">
						</div>
						<div class="casilla" id="0-9">
						</div>
						<div class="casilla" id="0-10">
						</div>			
					</div>
				</div>
			</div>
		`;	

		contenido.innerHTML = '';


	} else {
		// aca bando britanico
	}	
}