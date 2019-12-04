class ModeloDaga extends ModeloArma {

    constructor(rutaImagen, x, y,ancho,alto,callback) {
        super(rutaImagen, x, y)
        this.armaAsociada = new Daga(ancho,alto,callback);
    }



}
