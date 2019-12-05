class GameLayer extends Layer {


    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.espacio = new Espacio(0);


        this.scrollX = 0;


        this.bloques = [];
        this.bloquesDestruibles = [];
        this.bloquesRompenAlPisar = [];
        this.bloquesSalto = [];
        this.puntosDeGuardado = [];
        this.recolectables = [];
        this.modelosArmas = [];

        this.fondo = new Fondo(imagenes.hierba, 480 * 0.5, 320 * 0.5);

        this.enemigos = [];


        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);


        this.disparosJugador = [];
        this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        this.fondoRecolectables =
            new Fondo(imagenes.icono_recolectable, 480 * 0.7, 320 * 0.05);

        this.textoRecolectables = new Texto(0, 480 * 0.75, 320 * 0.07);

        this.fondoVidas =
            new Fondo(imagenes.icono_vidas, 480 * 0.55, 320 * 0.05);



        this.cargarMapa("res/" + nivelActual + ".txt");

        this.textoVidas = new Texto(5, 480 * 0.6, 320 * 0.07);
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
            this.disparosJugador[i].tiempo--;
            if (this.disparosJugador[i].tiempo <= 0) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            } else {
                if (this.disparosJugador[i] != null &&
                    this.disparosJugador[i].vx == 0 && this.disparosJugador[i].vy == 0) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                }
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
            if (this.enemigos[i].estaEnPantalla()) {
                this.enemigos[i].posJugadorX = this.jugador.x;
                this.enemigos[i].posJugadorY = this.jugador.y;
            }
            this.enemigos[i].actualizar();


        }

        for (var i = 0; i < this.recolectables.length; i++) {
            this.recolectables[i].actualizar();
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }


        if (this.jugador.estado == estados.muerto) {
            this.iniciar();
        }
        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                if (this.enemigos[i].estado != estados.muriendo  && this.enemigos[i].estado != estados.muerto) {
                    this.jugador.golpeado();
                    this.textoVidas.valor=this.jugador.vidas;
                    if (this.jugador.vidas <= 0) {
                        if (!this.jugador.efectoMorirReproducido){
                            reproducirEfecto(this.jugador.efectoMorir);
                            this.jugador.efectoMorirReproducido=true;
                        }
                        this.jugador.estado = estados.muriendo;
                        this.enemigos[i].vx = 0;
                        this.enemigos[i].vy = 0;
                    }
                }

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
                this.jugador.tiempoInvulnerable =100;
                this.recolectables.splice(i, 1);
                i = i - 1;
            }
        }

        for (var i = 0; i < this.modelosArmas.length; i++) {
            if (this.jugador.colisiona(this.modelosArmas[i])) {
                this.jugador.armas.push(this.modelosArmas[i].armaAsociada);
                this.jugador.armaActual = this.modelosArmas[i].armaAsociada;
                this.jugador.cargarAnimaciones();
                this.espacio.eliminarCuerpoDinamico(this.modelosArmas[i]);
                this.modelosArmas.splice(i, 1);
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
            if (this.bloquesRompenAlPisar[i].pisado) {
                this.bloquesRompenAlPisar[i].romperse--;
            }

            if (this.bloquesRompenAlPisar[i].romperse <= 0) {
                this.espacio.eliminarCuerpoEstatico(this.bloquesRompenAlPisar[i]);
                this.bloquesRompenAlPisar.splice(i, 1);
                i = i - 1;

            }
        }


        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].estado != estados.muriendo &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    this.enemigos[j].vida = this.enemigos[j].vida - this.disparosJugador[i].dmg;
                    this.enemigos[j].impactado();
                    if (this.enemigos[j].estado == estados.muriendo) {
                        reproducirEfecto(this.jugador.armaActual.sonido);
                        this.puntos.valor++;
                    }
                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
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

        for (var i = 0; i < this.modelosArmas.length; i++) {
            this.modelosArmas[i].dibujar(this.scrollX);
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

        this.fondoVidas.dibujar();
        this.textoVidas.dibujar();

        this.fondo
        if (!this.pausa && entrada == entradas.pulsaciones) {
            this.botonDisparo.dibujar();
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

        } else {
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

        if (controles.cambiarArma > -1) {
            if (this.jugador.estado != estados.disparando) {
                if (this.jugador.armas[controles.cambiarArma] != null) {
                    console.log(this.jugador.armas[controles.cambiarArma] + "dentro del if");
                    this.jugador.armaActual = this.jugador.armas[controles.cambiarArma];
                    this.jugador.cargarAnimaciones();
                }
            }
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

            case "O":
                var enemigo = new EnemigoClon(x, y);
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
            case "R":
                var armaArco = new ModeloArco(imagenes.modelo_arco, x, y, this.jugador.ancho, this.jugador.alto, this.jugador.finAnimacionDisparar.bind(this.jugador));
                armaArco.y = armaArco.y - armaArco.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.modelosArmas.push(armaArco);
                this.espacio.agregarCuerpoDinamico(armaArco);
                break;
            case "D":
                var armaDaga = new ModeloDaga(imagenes.modelo_daga, x, y, this.jugador.ancho, this.jugador.alto, this.jugador.finAnimacionDisparar.bind(this.jugador));
                armaDaga.y = armaDaga.y - armaDaga.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.modelosArmas.push(armaDaga);
                this.espacio.agregarCuerpoDinamico(armaDaga);
                break;
            case "L":
                //tengo que multiplicar por 3 porque el sprite tiene un escalado diferente al de los demas
                var armaLanza = new ModeloLanza(imagenes.modelo_lanza, x, y, this.jugador.ancho * 3, this.jugador.alto * 3, this.jugador.finAnimacionDisparar.bind(this.jugador));
                armaLanza.y = armaLanza.y - armaLanza.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.modelosArmas.push(armaLanza);
                this.espacio.agregarCuerpoDinamico(armaLanza);
                break;
        }
    }


}
