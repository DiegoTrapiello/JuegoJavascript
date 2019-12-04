class ModeloArco extends ModeloArma {

    constructor(rutaImagen, x, y,ancho,alto,callback) {
        super(rutaImagen, x, y)
        this.armaAsociada = new Arco(ancho,alto,callback);
    }

}
