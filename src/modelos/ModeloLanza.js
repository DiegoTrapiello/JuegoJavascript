class ModeloLanza extends ModeloArma {

    constructor(rutaImagen, x, y,ancho,alto,callback) {
        super(rutaImagen, x, y)
        this.armaAsociada = new Lanza(ancho,alto,callback);
    }

}
