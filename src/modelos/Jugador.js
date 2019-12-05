class Jugador extends Modelo {


    constructor(x, y) {

        super(imagenes.jugador, x, y);

        this.vidas = 5;
        this.tiempoInvulnerable = 0;

        this.estado = estados.moviendo;

        this.orientacion = orientaciones.derecha;

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        //Arma
        this.armaActual = new Arma(this.ancho, this.alto, this.finAnimacionDisparar.bind(this));
        this.armas =[];
        this.armas.push(this.armaActual);

        // Disparo
        this.armaActual.cadenciaDisparo = 24;
        this.armaActual.tiempoDisparo = 0;

        this.cargarAnimaciones();


        this.animacion = this.aIdleDerecha;


        this.efectoMorir = efectos.jugador_muere;
        this.efectoMorirReproducido = false;

    }

    cargarAnimaciones() {
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

        this.aMorir = new Animacion(imagenes.jugador_muere,
            this.ancho,this.alto,6,6, this.finAnimacionMorir.bind(this));
    }

    actualizar() {

        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable --;
        }

        this.animacion.actualizar();


        // Establecer orientación
        if (this.vx > 0) {
            this.orientacion = orientaciones.derecha;
        }
        if (this.vx < 0) {
            this.orientacion = orientaciones.izquierda;
        }
        if (this.vy < 0) {
            this.orientacion = orientaciones.arriba;
        }
        if (this.vy > 0) {
            this.orientacion = orientaciones.abajo;
        }

        switch (this.estado) {
            case estados.muriendo:
                this.animacion=this.aMorir;
                break;
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
                if (this.vx != 0) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if (this.vy != 0) {
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aCorriendoArriba;
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aCorriendoAbajo;
                    }
                }
                if (this.vx == 0) {
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
        if (this.armaActual.tiempoDisparo > 0) {
            this.armaActual.tiempoDisparo--;
        }


    }


    moverX(direccion) {
        if (this.estado != estados.disparando   && this.estado != estados.muriendo) {
            this.vx = direccion * 3;
        }
        else{
            this.vx=0;
            this.vy = 0;
        }
    }

    moverY(direccion) {
        if (this.estado != estados.disparando  && this.estado!= estados.muriendo) {
            this.vy = direccion * 3;
        }else{
            this.vx=0;
            this.vy = 0;
        }
    }

    disparar() {


        if (this.armaActual.tiempoDisparo == 0) {
            this.vx = 0;
            this.vy = 0;

            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.armaActual.tiempoDisparo = this.armaActual.cadenciaDisparo;
            var disparo;
            if (this.orientacion == orientaciones.izquierda) {
                disparo= new DisparoJugador(this.armaActual.proyectilIzquierda,this.x,this.y ,this.armaActual.tiempoVidaProyectil);
                disparo.vy = 0;
                disparo.vx = disparo.vx * -1;

            }
            if (this.orientacion == orientaciones.arriba) {
                disparo= new DisparoJugador(this.armaActual.proyectilArriba,this.x,this.y,this.armaActual.tiempoVidaProyectil);
                disparo.vx =0;
                disparo.vy = disparo.vy * -1;
            }
            if (this.orientacion == orientaciones.abajo) {
                disparo= new DisparoJugador(this.armaActual.proyectilAbajo,this.x,this.y,this.armaActual.tiempoVidaProyectil);
                disparo.vx=0;

            }
            if (this.orientacion == orientaciones.derecha) {
                disparo= new DisparoJugador(this.armaActual.proyectilDerecha,this.x,this.y,this.armaActual.tiempoVidaProyectil);
                disparo.vy=0;
            }

            //CALCULO DEL DAÑO
            disparo.dmg=disparo.dmg * this.armaActual.multiplicador;
            return disparo;

        } else {
            return null;
        }

    }

    finAnimacionDisparar() {
        this.estado = estados.moviendo;
    }


    dibujar(scrollX) {
        scrollX = scrollX || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y);
        }
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
        reproducirEfecto(this.jugador.efectoMorir);
    }

    golpeado (){
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 100;
            }
        }
    }


}
