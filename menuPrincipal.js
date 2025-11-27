import { generarJuegoUnSoloJugador } from './juegoUnSoloJugador.js';

export const generarMenuPrincipal = (contenido) => {

	contenido.innerHTML = `
		<div class="options">
			<img src="./images/logo.png" class="logo">
			<button class="boton-opcion" id="unSoloJugador">Un solo jugador</button>
			<button class="boton-opcion" id="dosJugadores">Dos jugadores</button>
			<button class="boton-opcion">Datos historicos</button>
		</div>
	`;

	//const botonUnSoloJugador = document.getElementById('unSoloJugador(no disponible)');
	const botonDosJugadores = document.getElementById('dosJugadores');

	botonDosJugadores.addEventListener('click', () => generarJuegoUnSoloJugador(contenido));
}