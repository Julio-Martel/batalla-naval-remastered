import { generarMenuPrincipal } from './menuPrincipal.js';

const botonStart = document.getElementById('button-start');
const contenedorPrincipal = document.getElementById('start-container');

botonStart.addEventListener('click', () => generarMenuPrincipal(contenedorPrincipal));



 