class Lanza extends Arma{

    atacarArriba(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_lanza_arriba,
            ancho, alto, 6, 8,callback);
    }


    atacarAbajo(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_lanza_abajo,
            ancho, alto, 6, 8,callback);
    }

    atacarizquierda(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_lanza_izquierda,
            ancho, alto, 6, 8,callback);
    }

    atacarDerecha(ancho,alto,callback){
        return new Animacion(imagenes.jugador_ataca_con_lanza_derecha,
            ancho, alto, 6, 8,callback);
    }

}