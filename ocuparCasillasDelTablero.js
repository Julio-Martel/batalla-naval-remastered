export const ocuparCasillasDelTableo = (tableroDeLosBarcos,listadoDeCasillasOcupadas) => {
    tableroDeLosBarcos.forEach(casillaActualDelTablero => {
        let obtenerIdCasillaActualDelTablero = casillaActualDelTablero.getAttribute('id');
        let idCasillaActualDelTablero = document.getElementById(obtenerIdCasillaActualDelTablero);

        const estaOcupada  = (casillaActual, listadoDeCasillasOcupadas) => {
            listadoDeCasillasOcupadas.forEach(casillaAVerificar => {
                if(casillaActual === casillaAVerificar) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        let verificarSiLaCasillaEstaOcupada = estaOcupada(casillaActualDelTablero,listadoDeCasillasOcupadas);

        if(verificarSiLaCasillaEstaOcupada) {
            casillaActualDelTablero.style.pointerEvents = "auto";
        } else {
            casillaActualDelTablero.style.pointerEvents = "none";
        }
    });
}