class Arma {

    moverArriba(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_sin_arma_arriba,
            ancho, alto, 6, 9,callback);
    }


    moverAbajo(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_sin_arma_abajo,
            ancho, alto, 6, 9,callback);
    }


    moverDerecha(ancho,alto,callback){
        return new Animacion(imagenes.jugador_camina_sin_arma_derecha,
            ancho, alto, 6, 9,callback);


    }

    moverIzquierda(ancho,alto,callback){

        return new Animacion(imagenes.jugador_camina_sin_arma_izquierda,
            ancho, alto, 6, 9,callback);

    }


    atacarArriba(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_sin_arma_arriba,
            ancho, alto, 6, 6,callback);
    }


    atacarAbajo(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_sin_arma_abajo,
            ancho, alto, 6, 6,callback);
    }

    atacarizquierda(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_sin_arma_izquierda,
            ancho, alto, 6, 6,callback);
    }

    atacarDerecha(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_sin_arma_derecha,
            ancho, alto, 6, 6,callback);
    }



    morir(ancho,alto,callback){
        return new Animacion(imagenes.jugador_muere,
            ancho, alto, 6, 6,callback);
    }


}
