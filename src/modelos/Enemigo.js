class Enemigo extends Modelo {

    constructor(x, y) {

        super(imagenes.enemigo, x, y)

        this.estado = estados.moviendo;
        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 6, 3);
        this.aMorir = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));
        this.aImpactado = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 3, 8, this.finAnimacionImpactado.bind(this));

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vxInteligencia = 1;
        this.vyInteligencia = 1;
        this.vx = this.vxInteligencia;
        this.vy = this.vyInteligencia;

        this.posJugadorX = this.x;
        this.posJugadorY = this.y;

        this.vida = 40;
    }

    finAnimacionMorir() {
        this.estado = estados.muerto;
    }

    finAnimacionImpactado() {
        this.estado = estados.moviendo;
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
            }
            else if (this.posJugadorX < this.x) {
                this.vx = -1;
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

    dibujar(scrollX) {
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }


    impactado() {

        if (this.vida <= 0) {
            this.estado = estados.muriendo;
        } else {
            this.estado = estados.impactado;
        }
    }


}
