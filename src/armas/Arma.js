class Arma {

    constructor(ancho, alto, callback,) {

        this.moverArriba = new Animacion(imagenes.jugador_camina_sin_arma_arriba,
            ancho, alto, 6, 9, null);

        this.moverAbajo = new Animacion(imagenes.jugador_camina_sin_arma_abajo,
            ancho, alto, 6, 9, null);

        this.moverDerecha = new Animacion(imagenes.jugador_camina_sin_arma_derecha,
            ancho, alto, 6, 9, null);


        this.moverIzquierda = new Animacion(imagenes.jugador_camina_sin_arma_izquierda,
            ancho, alto, 6, 9, null);

        this.atacarArriba = new Animacion(imagenes.jugador_ataca_sin_arma_arriba,
            ancho, alto, 6, 6, callback);

        this.atacarAbajo = new Animacion(imagenes.jugador_ataca_sin_arma_abajo,
            ancho, alto, 6, 6, callback);

        this.atacarDerecha = new Animacion(imagenes.jugador_ataca_sin_arma_derecha,
            ancho, alto, 6, 6, callback);

        this.atacarIzquierda = new Animacion(imagenes.jugador_ataca_sin_arma_izquierda,
            ancho, alto, 6, 6, callback);

        this.morir =  new Animacion(imagenes.jugador_muere,
            ancho, alto, 6, 6, callback);


    }





}
