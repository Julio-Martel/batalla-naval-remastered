export const ocuparCasillasDelTablero = (listadoDeTodasLasCasillas,casillasQueOcupaLaFichaDelBarco) => {   
   console.log(casillasQueOcupaLaFichaDelBarco)
   
    listadoDeTodasLasCasillas.forEach(casillaActual => {
        let casillaAOcupar = casillaActual.getAttribute('id');
        let idCasillaAOcupar = document.getElementById(casillaAOcupar);
        let existeEnElArregloEsaCasilla = casillasQueOcupaLaFichaDelBarco.includes(idCasillaAOcupar);

        if(existeEnElArregloEsaCasilla){
            casillaActual.style.pointerEvents = "none";
        } else {
            //casillaActual.style.pointerEvents = "auto";
        }
    });
}