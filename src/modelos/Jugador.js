class Jugador extends Modelo {


    constructor(x, y) {

        super(imagenes.jugador , x, y);
        this.estado = estados.moviendo;

        this.orientacion = orientaciones.derecha;

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        //Arma
        this.armaActual = new Arma(this.ancho,this.alto,this.finAnimacionDisparar.bind(this));
        this.armas = new Array(4);
        this.armas.push(this.armaActual);

        // Disparo
        this.cadenciaDisparo = 24;
        this.tiempoDisparo = 0;

        // Animaciones
        this.aIdleDerecha = this.armaActual.idleDerecha;
        this.aIdleIzquierda = this.armaActual.idleIzquierda;
        this.aIdleArriba = this.armaActual.idleArriba;
        this.aIdleAbajo = this.armaActual.idleAbajo;

        //Moverse
        this.aCorriendoDerecha = this.armaActual.moverDerecha;
        this.aCorriendoIzquierda = this.armaActual.moverIzquierda;
        this.aCorriendoArriba = this.armaActual.moverArriba;
        this.aCorriendoAbajo = this.armaActual.moverAbajo;

        //Disparar / Atacar
        this.aDispararDerecha = this.armaActual.atacarDerecha;
        this.aDispararIzquierda = this.armaActual.atacarIzquierda;
        this.aDispararArriba = this.armaActual.atacarArriba;
        this.aDispararAbajo = this.armaActual.atacarAbajo;



        this.animacion = this.aIdleDerecha;

    }

    actualizar(){
        this.animacion.actualizar();

        // ¿Esta en el aire?
        if (this.choqueAbajo == true){
            this.enElAire = false;
        } else {
            this.enElAire = true;
        }

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }
        if (this.vy < 0 ){
            this.orientacion = orientaciones.arriba;
        }
        if(this.vy > 0){
            this.orientacion= orientaciones.abajo;
        }

        switch (this.estado){
            case estados.disparando:
                if (this.orientacion == orientaciones.derecha) {
                    this.animacion = this.aDispararDerecha;
                }
                if (this.orientacion == orientaciones.izquierda) {
                    this.animacion = this.aDispararIzquierda;
                }
                if (this.orientacion == orientaciones.arriba) {
                    this.animacion = this.aDispararArriba;
                }
                if (this.orientacion == orientaciones.abajo) {
                    this.animacion = this.aDispararAbajo;
                }
                break;
            case estados.moviendo:
                if ( this.vx != 0 ) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if (this.vy != 0){
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aCorriendoArriba;
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aCorriendoAbajo;
                    }
                }
                if ( this.vx == 0) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aIdleDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aIdleIzquierda;
                    }

                    if (this.vy == 0) {
                        if (this.orientacion == orientaciones.arriba) {
                            this.animacion = this.aIdleArriba;
                        }
                        if (this.orientacion == orientaciones.abajo) {
                            this.animacion = this.aIdleAbajo;
                        }

                    }
                }
                break;
        }




        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }


    }


    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){

        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoJugador(this.x, this.y);
            if ( this.orientacion == orientaciones.izquierda ){
                disparo.vx = disparo.vx*-1; //invertir
            }
            return disparo;

        } else {
            return null;
        }

    }

    finAnimacionDisparar(){
        this.estado = estados.moviendo;
    }


    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }



}
