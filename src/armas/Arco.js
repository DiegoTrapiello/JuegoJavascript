class Arco extends Arma {





    moverArriba(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_con_arco_arriba,
            ancho, alto, 6, 9,callback);
    }


    moverAbajo(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_con_arco_abajo,
            ancho, alto, 6, 9,callback);
    }


    moverDerecha(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_con_arco_derecha,
            ancho, alto, 6, 9,callback);


    }

    moverIzquierda(ancho,alto,callback){

        return new Animacion(imagenes.jugador_camina_con_arco_izquierda,
            ancho, alto, 6, 9,callback);

    }


    atacarArriba(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_arco_arriba,
            ancho, alto, 6, 13,callback);
    }


    atacarAbajo(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_arco_abajo,
            ancho, alto, 6, 13,callback);
    }

    atacarizquierda(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_arco_izquierda,
            ancho, alto, 6, 13,callback);
    }

    atacarDerecha(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_arco_derecha,
            ancho, alto, 6, 13,callback);
    }


}