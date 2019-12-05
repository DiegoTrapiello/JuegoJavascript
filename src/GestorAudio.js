var musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;
musicaAmbiente.volume=0.05;

var efectos = {
    disparo : "res/efecto_disparo.mp3",
    explosion : "res/efecto_explosion.mp3",
    impacto_arma:"res/impacto_arma.mp4",
    impacto_daga:"res/impacto_daga.mp4",
    impacto_arco:"res/impacto_arco.mp4",
    impacto_lanza:"res/impacto_lanza.mp4",
    jugador_muere:"res/jugador_muere.mp3"
}

function reproducirMusica() {
    musicaAmbiente.play();

}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}
