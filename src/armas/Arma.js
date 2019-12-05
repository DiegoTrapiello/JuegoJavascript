class Arma {

    constructor(ancho, alto, callback,) {

        this.tiempoDisparo = 0;
        this.cadenciaDisparo = 24;
        this.tiempoVidaProyectil = 3.5;
        this.multiplicador = 1.5;
        this.sonido = efectos.impacto_arma;

        this.moverArriba = new Animacion(imagenes.jugador_camina_sin_arma_arriba,
            ancho, alto, 3, 9, null);

        this.moverAbajo = new Animacion(imagenes.jugador_camina_sin_arma_abajo,
            ancho, alto, 3, 9, null);

        this.moverDerecha = new Animacion(imagenes.jugador_camina_sin_arma_derecha,
            ancho, alto, 3, 9, null);

        this.idleArriba = new Animacion(imagenes.jugador_idle_sin_arma_arriba,
            ancho, alto, 3, 1, null);

        this.idleAbajo = new Animacion(imagenes.jugador_idle_sin_arma_abajo,
            ancho, alto, 3, 1, null);

        this.idleIzquierda = new Animacion(imagenes.jugador_idle_sin_arma_izquierda,
            ancho, alto, 3, 1, null);

        this.idleDerecha = new Animacion(imagenes.jugador_idle_sin_arma_derecha,
            ancho, alto, 3, 1, null);


        this.moverIzquierda = new Animacion(imagenes.jugador_camina_sin_arma_izquierda,
            ancho, alto, 3, 9, null);

        this.atacarArriba = new Animacion(imagenes.jugador_ataca_sin_arma_arriba,
            ancho, alto, 3, 6, callback);

        this.atacarAbajo = new Animacion(imagenes.jugador_ataca_sin_arma_abajo,
            ancho, alto, 3, 6, callback);

        this.atacarDerecha = new Animacion(imagenes.jugador_ataca_sin_arma_derecha,
            ancho, alto, 3, 6, callback);

        this.atacarIzquierda = new Animacion(imagenes.jugador_ataca_sin_arma_izquierda,
            ancho, alto, 3, 6, callback);

        this.morir = new Animacion(imagenes.jugador_muere,
            ancho, alto, 3, 6, null);


        this.proyectilIzquierda= imagenes.invisible;

        this.proyectilDerecha=imagenes.invisible;

        this.proyectilArriba=imagenes.invisible;

        this.proyectilAbajo=imagenes.invisible;



    }




}
