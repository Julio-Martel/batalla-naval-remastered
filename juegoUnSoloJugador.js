export const generarJuegoUnSoloJugador = async(contenido) => {
	const presentacion = document.createElement('div');
	const titutuloIntroduccion = document.createElement('h1');
	const imagenIntroduccion = document.createElement('img');
	const textoImagen = document.createElement('div');
	const textoIntroduccion = document.createElement('p');
	const botonContinuar = document.createElement('button');

	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	contenido.innerHTML = ``;
	contenido.appendChild(presentacion);

	presentacion.classList.add('contenido-introduccion');
	presentacion.appendChild(titutuloIntroduccion);
	presentacion.appendChild(textoImagen);

	titutuloIntroduccion.classList.add('titulo-introduccion');
	titutuloIntroduccion.textContent = 'Introduccion';

	textoImagen.classList.add('texto-imagen');
	textoImagen.appendChild(imagenIntroduccion);

	imagenIntroduccion.classList.add('imagen-introduccion');
	imagenIntroduccion.src = './images/introduccion.jpg'

	textoImagen.appendChild(textoIntroduccion);

	textoIntroduccion.classList.add('texto-introduccion');

	textoIntroduccion.textContent = `
		Año 1941. El océano Atlántico se ha convertido en el campo de batalla más largo y crucial de la Segunda Guerra Mundial. En este juego, te sumergirás en los enfrentamientos navales que definieron el destino del mundo libre. Como comandante de una flota de guerra, tu misión es localizar y destruir a la armada enemiga antes de que ellos acaben contigo.

		Inspirado en los hechos reales de la Batalla del Atlántico, donde convoyes aliados se enfrentaban a letales submarinos alemanes (U-Boote), este juego pone a prueba tu estrategia, astucia y capacidad de reacción. Cada disparo puede marcar la diferencia entre la victoria y el hundimiento.

		Prepárate para zarpar... ¡La batalla ha comenzado!
	`;

	presentacion.appendChild(botonContinuar);
	botonContinuar.classList.add('button');
	botonContinuar.textContent = `Continuar`;

	const generarPartida = async() => {

		presentacion.classList.add('contenido-ocultar');
		presentacion.classList.add('opacar-contenido-introduccion');
		botonContinuar.style.pointerEvents = 'none';

		await delay(500);

		const eleccionDeBandos = document.createElement('div');

		contenido.innerHTML = ``;
		contenido.appendChild(eleccionDeBandos);

		eleccionDeBandos.classList.add('contenedor-bandos','opacidad-contenedor');

		await delay(500);

		eleccionDeBandos.classList.add('mostrar-opacidad-contenedor');

		

	}

	botonContinuar.addEventListener('click', generarPartida);

	await delay(500);

	presentacion.classList.add('mostrar-contenido');


}