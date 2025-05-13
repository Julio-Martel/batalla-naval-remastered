export const generarJuegoUnSoloJugador = async(contenido) => {
	const presentacion = document.createElement('div');
	const titutuloIntroduccion = document.createElement('h1');
	
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	contenido.innerHTML = ``;
	contenido.appendChild(presentacion);

	presentacion.classList.add('contenido-introduccion');
	presentacion.appendChild(titutuloIntroduccion);
		
	titutuloIntroduccion.classList.add('titulo-introduccion');
	titutuloIntroduccion.textContent = 'Introduccion';

	await delay(1500);

	presentacion.classList.add('mostrar-contenido');

	
}