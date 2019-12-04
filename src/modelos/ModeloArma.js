class ModeloArma extends Modelo {

    constructor(rutaImagen, x, y,ancho,alto,callback) {
        super(rutaImagen, x, y);

        this.armaAsociada= new Arma(ancho,alto,callback);
    }


}
