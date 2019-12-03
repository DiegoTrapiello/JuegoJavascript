class GameLayer extends Layer {


    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio(0);

        this.botonSalto = new Boton(imagenes.boton_salto, 480 * 0.9, 320 * 0.55);
        this.botonDisparo = new Boton(imagenes.boton_disparo, 480 * 0.75, 320 * 0.83);
        this.pad = new Pad(480 * 0.14, 320 * 0.8);


        this.scrollX = 0;


        this.bloques = [];
        this.bloquesDestruibles = [];
        this.bloquesRompenAlPisar= [];
        this.bloquesSalto = [];
        this.puntosDeGuardado = [];
        this.recolectables = [];
        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.enemigos = [];


        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);


        this.disparosJugador = [];
        this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        this.fondoRecolectables =
            new Fondo(imagenes.icono_recolectable, 480 * 0.7, 320 * 0.05);

        this.textoRecolectables = new Texto(0, 480 * 0.75, 320 * 0.07);


        this.cargarMapa("res/" + nivelActual + ".txt");
    }

    actualizar() {
        this.espacio.actualizar();

        if (this.copa.colisiona(this.jugador)) {
            nivelActual++;
            this.puntoDeGuardadoX = null;
            this.puntoDeGuardadoY = null;
            if (nivelActual > nivelMaximo) {
                nivelActual = 0;
            }
            this.iniciar();
        }



        // Eliminar disparos sin velocidad
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }


        // elementos fuera
        // Enemigos muertos fuera del juego
        for (var j = 0; j < this.enemigos.length; j++) {
            if (this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j - 1;
            }
        }


        console.log("disparosJugador: " + this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);

                this.disparosJugador.splice(i, 1);
                i = i - 1;
            }
        }


        this.jugador.actualizar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }

        for (var i = 0; i < this.recolectables.length; i++) {
            this.recolectables[i].actualizar();
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                this.iniciar();
            }
        }


        for (var i = 0; i < this.puntosDeGuardado.length; i++) {
            if (this.jugador.colisiona(this.puntosDeGuardado[i])) {
                this.puntoDeGuardadoX = this.puntosDeGuardado[i].x;
                this.puntoDeGuardadoY = this.puntosDeGuardado[i].y;
                this.puntosDeGuardado.splice(i, 1);
                i = i - 1;
            }
        }

        for (var i = 0; i < this.recolectables.length; i++) {
            if (this.jugador.colisiona(this.recolectables[i])) {
                this.textoRecolectables.valor++;
                this.recolectables.splice(i, 1);
                i = i - 1;
            }
        }

        for (var i = 0; i < this.bloquesSalto.length; i++) {
            if (this.jugador.colisiona(this.bloquesSalto[i])) {
                if (this.jugador.y + this.jugador.alto / 2 <= this.bloquesSalto[i].y - this.bloquesSalto[i].alto / 2) {
                    this.jugador.vy = -21;
                    this.jugador.enElAire = true;
                }
            }
        }

        for (var i = 0; i < this.bloquesRompenAlPisar.length; i++) {
            if (this.jugador.colisiona(this.bloquesRompenAlPisar[i])) {
                if (this.jugador.y + this.jugador.alto / 2 <= this.bloquesRompenAlPisar[i].y - this.bloquesRompenAlPisar[i].alto / 2 && !this.bloquesRompenAlPisar[i].pisado) {
                    this.bloquesRompenAlPisar[i].pisado = true;
                }
            }
            if (this.bloquesRompenAlPisar[i].pisado){
                this.bloquesRompenAlPisar[i].romperse--;
            }

            if (this.bloquesRompenAlPisar[i].romperse<=0){
                this.espacio.eliminarCuerpoEstatico(this.bloquesRompenAlPisar[i]);
                this.bloquesRompenAlPisar.splice(i,1);
                i=i-1;

            }
        }




        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].estado != estados.muriendo &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                    this.enemigos[j].impactado();

                    this.puntos.valor++;
                }
            }
        }
        //Colisiones disparos con bloques destruibles
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.bloquesDestruibles.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.bloquesDestruibles[j] != null &&
                    this.disparosJugador[i].colisiona(this.bloquesDestruibles[j])) {
                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                    this.espacio
                        .eliminarCuerpoEstatico(this.bloquesDestruibles[j]);
                    this.bloquesDestruibles.splice(j, 1);
                    j = j - 1;

                }
            }
        }


    }

    calcularScroll() {
        // limite izquierda
        if (this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }
        // limite derecha
        if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }

    }


    dibujar() {
        this.calcularScroll();

        this.fondo.dibujar();
        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar(this.scrollX);
        }

        for (var i = 0; i < this.bloquesDestruibles.length; i++) {
            this.bloquesDestruibles[i].dibujar(this.scrollX);
        }

        for (var i = 0; i < this.puntosDeGuardado.length; i++) {
            this.puntosDeGuardado[i].dibujar(this.scrollX);
        }

        for (var i = 0; i < this.recolectables.length; i++) {
            this.recolectables[i].dibujar(this.scrollX);
        }


        for (var i = 0; i < this.bloquesSalto.length; i++) {
            this.bloquesSalto[i].dibujar(this.scrollX);
        }

        for (var i = 0; i < this.bloquesRompenAlPisar.length; i++) {
            this.bloquesRompenAlPisar[i].dibujar(this.scrollX);
        }

        this.copa.dibujar(this.scrollX);
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX);
        }


        this.jugador.dibujar(this.scrollX);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX);
        }


        // HUD
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        this.fondoRecolectables.dibujar();
        this.textoRecolectables.dibujar();
        if (!this.pausa && entrada == entradas.pulsaciones) {
            this.botonDisparo.dibujar();
            this.botonSalto.dibujar();
            this.pad.dibujar();
        }

    }


    procesarControles() {
        // disparar
        if (controles.disparo) {
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);

            }


        }

        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        }
        else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }


    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 40;
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];

                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo) {
            case "C":
                this.copa = new Bloque(imagenes.copa, x, y);
                this.copa.y = this.copa.y - this.copa.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;
            case "E":
                var enemigo = new Enemigo(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                if (this.puntoDeGuardadoX) {
                    this.jugador = new Jugador(this.puntoDeGuardadoX, this.puntoDeGuardadoY);
                }
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "U":
                var bloque = new BloqueDestruible(imagenes.bloque_metal, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloquesDestruibles.push(bloque);
                //this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "A":
                var puntoGuardado = new PuntoGuardado(imagenes.puntoGuardado, x, y);
                puntoGuardado.y = puntoGuardado.y - puntoGuardado.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.puntosDeGuardado.push(puntoGuardado);
                this.espacio.agregarCuerpoDinamico(puntoGuardado);
                break;
            case "P":
                var recolectable = new Recolectable(x, y);
                recolectable.y = recolectable.y - recolectable.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.recolectables.push(recolectable);
                this.espacio.agregarCuerpoDinamico(recolectable);
                break;
            case "Y":
                var bloqueSalto = new BloqueSalto(imagenes.plataforma_salto, x, y);
                bloqueSalto.y = bloqueSalto.y - bloqueSalto.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloquesSalto.push(bloqueSalto);
                this.espacio.agregarCuerpoEstatico(bloqueSalto);
                break;
            case "W":
                var bloque = new BloqueRompeAlPisar(imagenes.bloque_rompe_al_pisar, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloquesRompenAlPisar.push(bloque);
                //this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    calcularPulsaciones(pulsaciones) {
        // Suponemos botones no estan pulsados
        this.botonDisparo.pulsado = false;
        this.botonSalto.pulsado = false;

        // suponemos que el pad está sin tocar
        controles.moverX = 0;


        for (var i = 0; i < pulsaciones.length; i++) {
            if (this.pad.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                if (orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = 1;
                }
                if (orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = -1;
                }
            }


            if (this.botonDisparo.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.botonDisparo.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.disparo = true;
                }
            }

            if (this.botonSalto.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.botonSalto.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }

        }

        // No pulsado - Boton Disparo
        if (!this.botonDisparo.pulsado) {
            controles.disparo = false;
        }

        // No pulsado - Boton Salto
        if (!this.botonSalto.pulsado) {
            controles.moverY = 0;
        }
    }


}
