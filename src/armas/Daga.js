class Daga extends Arma {

    constructor(ancho,alto,callback){

        super(ancho,alto,callback);

        this.moverArriba = new Animacion(imagenes.jugador_camina_con_daga_arriba,
            ancho, alto, 3, 9, null);

        this.moverAbajo = new Animacion(imagenes.jugador_camina_con_daga_abajo,
            ancho, alto, 3, 9, null);

        this.moverDerecha = new Animacion(imagenes.jugador_camina_con_daga_derecha,
            ancho, alto, 3, 9, null);

        this.moverIzquierda = new Animacion(imagenes.jugador_camina_con_daga_izquierda,
            ancho, alto, 3, 9, null);

        this.atacarArriba = new Animacion(imagenes.jugador_ataca_con_daga_arriba,
            ancho, alto, 3, 6, callback);

        this.atacarAbajo = new Animacion(imagenes.jugador_ataca_con_daga_abajo,
            ancho, alto, 3, 6, callback);

        this.atacarDerecha = new Animacion(imagenes.jugador_ataca_con_daga_derecha,
            ancho, alto, 3, 6, callback);

        this.atacarIzquierda = new Animacion(imagenes.jugador_ataca_con_daga_izquierda,
            ancho, alto, 3, 6, callback);

        this.idleArriba = new Animacion(imagenes.jugador_idle_con_daga_arriba,
            ancho, alto, 3, 1, null);

        this.idleAbajo = new Animacion(imagenes.jugador_idle_con_daga_abajo,
            ancho, alto, 3, 1, null);

        this.idleIzquierda = new Animacion(imagenes.jugador_idle_con_daga_izquierda,
            ancho, alto, 3, 1, null);

        this.idleDerecha = new Animacion(imagenes.jugador_idle_con_daga_derecha,
            ancho, alto, 3, 1, null);


}


}