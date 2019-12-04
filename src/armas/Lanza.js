class Lanza extends Arma{

    constructor(ancho,alto,callback){


        //divido por 3 para que el resto de animaciones tengan el escalado correcto ( mirar cargarObjetoMapa del GameLayer )
        super(ancho/3,alto/3,callback);

        this.atacarArriba = new Animacion(imagenes.jugador_ataca_con_lanza_arriba,
            ancho, alto, 3, 8,callback);

        this.atacarAbajo =  new Animacion(imagenes.jugador_ataca_con_lanza_abajo,
            ancho, alto, 3, 8,callback);

        this.atacarDerecha = new Animacion(imagenes.jugador_ataca_con_lanza_derecha,
            ancho, alto, 3, 8,callback);

        this.atacarIzquierda = new Animacion(imagenes.jugador_ataca_con_lanza_izquierda,
            ancho, alto, 3, 8,callback);

    }


}