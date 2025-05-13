export const generarJuegoUnSoloJugador = async(contenido) => {
	const presentacion = document.createElement('div');
	const titutuloIntroduccion = document.createElement('h1');
	const imagenIntroduccion = document.createElement('img');
	const textoImagen = document.createElement('div');

	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	contenido.innerHTML = ``;
	contenido.appendChild(presentacion);

	presentacion.classList.add('contenido-introduccion');
	presentacion.appendChild(titutuloIntroduccion);
		
	titutuloIntroduccion.classList.add('titulo-introduccion');
	titutuloIntroduccion.textContent = 'Introduccion';

	

	//presentacion.appendChild(imagenIntroduccion);
	//imagenIntroduccion.classList.add('imagen-introduccion');
	//imagenIntroduccion.src = './images/introduccion.jpg'


	await delay(1000);

	presentacion.classList.add('mostrar-contenido');


}