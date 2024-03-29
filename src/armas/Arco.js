class Arco extends Arma {

    constructor(ancho, alto, callback) {

        super(ancho, alto, callback);

        this.tiempoDisparo = 0;
        this.cadenciaDisparo = 24;
        this.tiempoVidaProyectil = 1000;
        this.sonido = efectos.impacto_arco;

        this
            .moverArriba = new Animacion(imagenes.jugador_camina_con_arco_arriba,
            ancho, alto, 3, 9, null);

        this
            .moverAbajo = new Animacion(imagenes.jugador_camina_con_arco_abajo,
            ancho, alto, 3, 9, null);

        this
            .moverDerecha = new Animacion(imagenes.jugador_camina_con_arco_derecha,
            ancho, alto, 3, 9, null);

        this
            .moverIzquierda = new Animacion(imagenes.jugador_camina_con_arco_izquierda,
            ancho, alto, 3, 9, null);

        this
            .atacarArriba = new Animacion(imagenes.jugador_ataca_con_arco_arriba,
            ancho, alto, 0.5, 13, callback);

        this
            .atacarAbajo = new Animacion(imagenes.jugador_ataca_con_arco_abajo,
            ancho, alto, 0.5, 13, callback);

        this
            .atacarDerecha = new Animacion(imagenes.jugador_ataca_con_arco_derecha,
            ancho, alto, 0.5, 13, callback);

        this
            .atacarIzquierda = new Animacion(imagenes.jugador_ataca_con_arco_izquierda,
            ancho, alto, 0.5, 13, callback);



        this.idleArriba = new Animacion(imagenes.jugador_idle_con_arco_arriba,
            ancho, alto, 3, 1, null);

        this.idleAbajo = new Animacion(imagenes.jugador_idle_con_arco_abajo,
            ancho, alto, 3, 1, null);

        this.idleIzquierda = new Animacion(imagenes.jugador_idle_con_arco_izquierda,
            ancho, alto, 3, 1, null);

        this.idleDerecha = new Animacion(imagenes.jugador_idle_con_arco_derecha,
            ancho, alto, 3, 1, null);


        this.proyectilIzquierda=imagenes.flecha_izquierda;
        this.proyectilDerecha=imagenes.flecha_derecha;
        this.proyectilArriba=imagenes.flecha_arriba;
        this.proyectilAbajo=imagenes.flecha_abajo;



        this.multiplicador = 2;

    }

}