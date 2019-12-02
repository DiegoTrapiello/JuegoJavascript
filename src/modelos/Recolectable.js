class Recolectable extends Modelo {

    constructor(x, y) {
        super(imagenes.icono_recolectable, x, y)

        this.animacion = new Animacion(imagenes.animacion_recolectable, this.ancho, this.alto, 6, 8);
    }


    dibujar(scrollX) {
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

    actualizar() {
        this.animacion.actualizar();
    }
}