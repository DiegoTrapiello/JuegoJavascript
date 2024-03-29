
var cache = [];
// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",
    fondo : "res/fondo.png",
    enemigo : "res/enemigo.png",
    enemigo_movimiento : "res/enemigo_movimiento.png",
    disparo_jugador : "res/disparo_jugador.png",
    disparo_enemigo : "res/disparo_enemigo.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vidas : "res/icono_vidas.png",
    icono_recolectable : "res/icono_recolectable.png",
    fondo_2 : "res/fondo_2.png",
    jugador_idle_derecha : "res/jugador_idle_derecha.png",
    jugador_idle_izquierda : "res/jugador_idle_izquierda.png",
    jugador_corriendo_derecha : "res/jugador_corriendo_derecha.png",
    jugador_corriendo_izquierda : "res/jugador_corriendo_izquierda.png",
    jugador_disparando_derecha : "res/jugador_disparando_derecha.png",
    jugador_disparando_izquierda : "res/jugador_disparando_izquierda.png",
    jugador_saltando_derecha : "res/jugador_saltando_derecha.png",
    jugador_saltando_izquierda : "res/jugador_saltando_izquierda.png",
    enemigo_morir : "res/enemigo_morir.png",
    bloque_tierra : "res/bloque_tierra.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
    copa : "res/copa.png",
    pad :"res/pad.png",
    boton_disparo : "res/boton_disparo.png",
    boton_salto : "res/boton_salto.png",
    boton_pausa : "res/boton_pausa.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    mensaje_como_jugar : "res/mensaje_como_jugar.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
    puntoGuardado: "res/punto_guardado.png",
    animacion_recolectable:"res/recolectable.png",
    plataforma_salto:"res/plataforma_salto.png",
    bloque_rompe_al_pisar:"res/bloque_al_pisar.png",
    jugador_ataca_con_arco_abajo:"res/jugador_ataca_con_arco_abajo.png",
    jugador_ataca_con_arco_arriba:"res/jugador_ataca_con_arco_arriba.png",
    jugador_ataca_con_arco_derecha:"res/jugador_ataca_con_arco_derecha.png",
    jugador_ataca_con_arco_izquierda:"res/jugador_ataca_con_arco_izquierda.png",
    jugador_ataca_con_daga_abajo:"res/jugador_ataca_con_daga_abajo.png",
    jugador_ataca_con_daga_arriba:"res/jugador_ataca_con_daga_arriba.png",
    jugador_ataca_con_daga_derecha:"res/jugador_ataca_con_daga_derecha.png",
    jugador_ataca_con_daga_izquierda:"res/jugador_ataca_con_daga_izquierda.png",
    jugador_ataca_con_lanza_abajo:"res/jugador_ataca_con_lanza_abajo.png",
    jugador_ataca_con_lanza_arriba:"res/jugador_ataca_con_lanza_arriba.png",
    jugador_ataca_con_lanza_derecha:"res/jugador_ataca_con_lanza_derecha.png",
    jugador_ataca_con_lanza_izquierda:"res/jugador_ataca_con_lanza_izquierda.png",
    jugador_ataca_sin_arma_abajo:"res/jugador_ataca_sin_arma_abajo.png",
    jugador_ataca_sin_arma_arriba:"res/jugador_ataca_sin_arma_arriba.png",
    jugador_ataca_sin_arma_derecha:"res/jugador_ataca_sin_arma_derecha.png",
    jugador_ataca_sin_arma_izquierda:"res/jugador_ataca_sin_arma_izquierda.png",
    jugador_camina_con_arco_abajo:"res/jugador_camina_con_arco_abajo.png",
    jugador_camina_con_arco_arriba:"res/jugador_camina_con_arco_arriba.png",
    jugador_camina_con_arco_derecha:"res/jugador_camina_con_arco_derecha.png",
    jugador_camina_con_arco_izquierda:"res/jugador_camina_con_arco_izquierda.png",
    jugador_camina_con_daga_abajo:"res/jugador_camina_con_daga_abajo.png",
    jugador_camina_con_daga_arriba:"res/jugador_camina_con_daga_arriba.png",
    jugador_camina_con_daga_derecha:"res/jugador_camina_con_daga_derecha.png",
    jugador_camina_con_daga_izquierda:"res/jugador_camina_con_daga_izquierda.png",
    jugador_camina_sin_arma_abajo:"res/jugador_camina_sin_arma_abajo.png",
    jugador_camina_sin_arma_arriba:"res/jugador_camina_sin_arma_arriba.png",
    jugador_camina_sin_arma_derecha:"res/jugador_camina_sin_arma_derecha.png",
    jugador_camina_sin_arma_izquierda:"res/jugador_camina_sin_arma_izquierda.png",
    jugador_muere:"res/jugador_muere.png",
    jugador_idle_con_arco_abajo:"res/jugador_idle_con_arco_abajo.png",
    jugador_idle_con_arco_arriba:"res/jugador_idle_con_arco_arriba.png",
    jugador_idle_con_arco_derecha:"res/jugador_idle_con_arco_derecha.png",
    jugador_idle_con_arco_izquierda:"res/jugador_idle_con_arco_izquierda.png",
    jugador_idle_con_daga_abajo:"res/jugador_idle_con_daga_abajo.png",
    jugador_idle_con_daga_arriba:"res/jugador_idle_con_daga_arriba.png",
    jugador_idle_con_daga_derecha:"res/jugador_idle_con_daga_derecha.png",
    jugador_idle_con_daga_izquierda:"res/jugador_idle_con_daga_izquierda.png",
    jugador_idle_sin_arma_abajo:"res/jugador_idle_sin_arma_abajo.png",
    jugador_idle_sin_arma_arriba:"res/jugador_idle_sin_arma_arriba.png",
    jugador_idle_sin_arma_derecha:"res/jugador_idle_sin_arma_derecha.png",
    jugador_idle_sin_arma_izquierda:"res/jugador_idle_sin_arma_izquierda.png",
    modelo_daga:"res/modelo_daga.png",
    modelo_arco:"res/modelo_arco.png",
    modelo_lanza:"res/modelo_lanza.png",
    flecha_derecha:"res/flecha_derecha.png",
    flecha_abajo:"res/flecha_abajo.png",
    flecha_arriba:"res/flecha_arriba.png",
    flecha_izquierda:"res/flecha_izquierda.png",
    invisible:"res/invisible.png",
    hierba:"res/hierba.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {

            //PROYECTIL INVISIBLE PARA ATAQUES A MELÉ
            cache[imagenes.invisible]= new Image(25,25);
            iniciarJuego();
        }
    }
}
