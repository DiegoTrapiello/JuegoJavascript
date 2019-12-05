class EnemigoClon extends Enemigo {

    constructor(x, y) {
        super(x, y);
        this.aMover = new Animacion(imagenes.jugador_ataca_con_daga_arriba,
            this.ancho, this.alto, 4, 6,null);

        this.aMoverArriba = new Animacion(imagenes.jugador_ataca_con_daga_arriba,
            this.ancho, this.alto, 4, 6, null);

        this.aMoverAbajo= new Animacion(imagenes.jugador_ataca_con_daga_abajo,
            this.ancho, this.alto, 4, 6, null);

        this.aMoverDerecha = new Animacion(imagenes.jugador_ataca_con_daga_derecha,
            this.ancho, this.alto, 4, 6, null);

        this.aMoverIzquierda = new Animacion(imagenes.jugador_ataca_con_daga_izquierda,
            this.ancho, this.alto, 4, 6, null);

        this.aMorir = new Animacion(imagenes.jugador_muere,
            this.ancho, this.alto, 6, 6, this.finAnimacionMorir.bind(this));


        this.aImpactado = new Animacion(imagenes.jugador_idle_sin_arma_abajo,
            this.ancho, this.alto, 20, 1, this.finAnimacionImpactado.bind(this));


        this.vida = 200;
    }


    actualizar() {
        this.animacion.actualizar();

        switch (this.estado) {
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
            case estados.impactado:
                this.animacion = this.aImpactado;
                break;
        }

        if (this.estado == estados.muriendo || this.estado == estados.impactado) {
            this.vx = 0;
            this.vy = 0;
        } else {


            if (this.posJugadorX > this.x) {
                this.vx = 1;
                this.animacion= this.aMoverDerecha;
            }
            else if (this.posJugadorX < this.x) {
                this.vx = -1;
                this.animacion= this.aMoverIzquierda;
            }

            if (this.posJugadorY > this.y) {
                this.vy = 1;
            }
            else  if (this.posJugadorY < this.y) {
                this.vy = -1;
            }


            if (parseInt(this.posJugadorY) == parseInt(this.y)) {

                this.vy = 0;

            }
            if (parseInt(this.posJugadorX) == parseInt(this.x)) {
                this.vx = 0;
            }


        }

    }




}
