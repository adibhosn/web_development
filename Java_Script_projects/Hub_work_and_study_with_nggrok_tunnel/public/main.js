// Seleciona o elemento HTML principal
const html = document.querySelector('html');

// Variáveis de botões
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

// Variáveis de imagem e texto
const foto = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');

// Variáveis de áudio
const musicaFoco = document.getElementById("alternar-musica");
let audios = [
    { nome: 'musicaFoco', caminho: '/sons/luna-rise-part-one.mp3' },
    { nome: 'audioBeep', caminho: '/sons/beep.mp3' },
    { nome: 'audioPause', caminho: '/sons/pause.mp3' },
    { nome: 'audioPlay', caminho: '/sons/play.wav' },
];
let musica = new Audio(audios[0].caminho);
let beep = new Audio(audios[1].caminho);
let pause = new Audio(audios[2].caminho);
let play = new Audio(audios[3].caminho);

// Variáveis do temporizador
const comecarBt = document.getElementById("start-pause");
const inicarOuPausarBt = document.getElementById("start-pause");
const imagemBt = document.querySelector('.app__card-primary-button-icon');
let tempo = 0;
let tempoInicial = 40 * 60;
tempo = tempoInicial;
let intervaloId = null;
let somInicio = false;

// Variáveis do cronômetro
const cronometro = document.getElementById("timer");

// Configura a música para tocar em loop
musica.loop = true;

// Alternar a reprodução da música de foco ao clicar no botão
musicaFoco.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Configurações para o botão de foco
focoBt.addEventListener('click', (event) => {
    tempoInicial = 40 * 60;
    tempo = tempoInicial;
    alterarContexto('foco', '/imagens/foco.png');
    mudarTexto(texto, ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`);
    alterarBotao(event);
});

// Configurações para o botão de descanso curto
curtoBt.addEventListener('click', (event) => {
    tempoInicial = 5 * 60;
    tempo = tempoInicial;
    alterarContexto('descanso-curto', '/imagens/descanso-curto.png');
    mudarTexto(texto, `Que tal uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`);
    alterarBotao(event);
});

// Configurações para o botão de descanso longo
longoBt.addEventListener('click', (event) => {
    tempoInicial = 15 * 60;
    tempo = tempoInicial;
    alterarContexto('descanso-longo', '/imagens/descanso-longo.png');
    mudarTexto(texto, `Hora de voltar à superfice<br>
        <strong class="app__title-strong">Faça uma pausa longa!</strong>`);
    alterarBotao(event);
});

// Função para alterar o texto
function mudarTexto(elemento, novoTextoNormal) {
    elemento.innerHTML = novoTextoNormal;
}

// Função para alterar o contexto, incluindo a imagem e o atributo de contexto no HTML
function alterarContexto(contexto, caminhoImg) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    foto.setAttribute('src', caminhoImg);
}

// Função para alterar o botão ativo
function alterarBotao(event) {
    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.app__card-button').forEach((button) => {
        button.classList.remove('active');
    });
    // Adiciona a classe 'active' ao botão clicado
    event.target.classList.add('active');
}

// Função para contagem regressiva do temporizador
function contagemRegressiva() {
    if (tempo <= 0) {
        beep.currentTime = 3;
        beep.volume = 0.5;
        beep.play();
        zerar();
        reiniciar();
        return;
    }
    tempo -= 1;
    mostrarTempo();
}

// Iniciar ou pausar o temporizador ao clicar no botão
comecarBt.addEventListener('click', () => {
    if(!somInicio){
        play.play();
        somInicio = true;
    }
    contagemRegressiva();
    iniciarOuPausar();
});

// Função para iniciar ou pausar o temporizador
function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        pause.play();
        return;
    }
    play.play();
    inicarOuPausarBt.innerHTML = `<strong>Pausar</strong>`;
    imagemBt.setAttribute('src', '/imagens/pause.png');
    intervaloId = setInterval(() => {
        contagemRegressiva();
    }, 1000);
}

// Função para zerar o temporizador
function zerar() {
    clearInterval(intervaloId);
    inicarOuPausarBt.innerHTML = `<strong>Retomar</strong>`;
    intervaloId = null;
    if(tempo === 0){
        inicarOuPausarBt.innerHTML = `<strong>Reiniciar</strong>`;
    }
}

// Função para mostrar o tempo no formato de cronômetro
function mostrarTempo() {
    let data = new Date(tempo * 1000);
    let opcoes = { minute: '2-digit', second: '2-digit' };
    cronometro.innerHTML = data.toLocaleTimeString('pt-BR', opcoes);
}

// Função para reiniciar o temporizador com o tempo inicial
function reiniciar() {
    tempo = tempoInicial;
    mostrarTempo();
}

// Exibe o tempo inicial ao carregar a página
mostrarTempo();
