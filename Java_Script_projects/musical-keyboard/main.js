function tocarSom(idAudio) {
    const audioElement = document.getElementById(idAudio);
    if (audioElement) {
        audioElement.play();
    } else {
        alert(`Elemento de áudio com ID '${idAudio}' não encontrado.`) || console.error(`Elemento de áudio com ID '${idAudio}' não encontrado.`);
    }
}

const listaDeAudios = document.querySelectorAll('.tecla');

for(let i = 0; i < listaDeAudios.length; i++) {
    const tecla = listaDeAudios[i];
    tecla.onclick = function () {
        const instrumento = tecla.classList[1];
        const idAudio = `som_${instrumento}`;
        tocarSom(idAudio);
    }
    tecla.onkeydown = function (event) {
        if (event.code === ('Enter') || event.code === ('Space')){
            tecla.classList.add('ativa');
        }
    }
    tecla.onkeyup = function (event) {
        if (event.code === ('Enter') || event.code === ('Space')){
            tecla.classList.remove('ativa');
        }
    }
}
