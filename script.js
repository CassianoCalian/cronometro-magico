const focus = document.querySelector(".a-focus");
const focoBT = document.querySelector(".a-desc");
const descLong = document.querySelector(".a-long");
const botaoCircular = document.querySelector(".botao-circular");
const pontos = document.querySelectorAll(".botao-circular .pontos div");
const banner = document.querySelector(".img-personagem");
const firstTitle = document.querySelector(".titlee");
const startPauseBt = document.querySelector("#start-pause");
const tempoNaTela = document.querySelector(".cronomether");
const iniciarOuPausarBt = document.querySelector("#start-pause p");
const gradient1 = "linear-gradient(to top, #3e8e41, #245e36, #1a472a)";
const gradient2 = "linear-gradient(to top, #3c93e6, #173485, #041a3f)";
const gradient3 = "linear-gradient(to top, #160738fb, #41025c, #530999)";
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// Função para ativar música
const musicaFocoInput = document.querySelector("#toogle");
const musica = new Audio(
  "sons/ytmp3free.cc_harry-potter-ambient-music-hogwarts-relaxing-studying-sleeping-youtubemp3free.org.mp3"
);
const musicaPlay = new Audio("sons/play.wav");
const musicaPause = new Audio("sons/pause.mp3");
const musicaFinish = new Audio("sons/beep.mp3");
musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Começando a parte do Temporizador

// Função para remover a classe 'active' de todos os botões
function removeActiveClass() {
  const links = [focus, focoBT, descLong];
  links.forEach((link) => {
    link.classList.remove("active");
    link.classList.remove("app__card-button--foco");
  });
}

// Função para configurar o estilo quando um botão é clicado
function setButtonConfig(link, gradient, borderColor, imageSrc, titleText) {
  removeActiveClass(); // Remove 'active' de todos os botões

  // Adiciona 'active' ao botão clicado
  link.classList.add("active");
  link.classList.add("app__card-button--foco");

  // Altera o estilo do fundo e bordas
  document.body.style.background = gradient;

  // Atualiza a imagem do personagem
  banner.setAttribute("src", imageSrc);

  // Atualiza o título
  firstTitle.innerHTML = titleText;
}

// Eventos de clique nos botões
focus.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  setButtonConfig(
    focus,
    gradient3,
    "#a64dff",
    "images/personagem1-Photoroom.png",
    "Conjure sua concentração, <span>mergulhe no que é oculto.</span>"
  );
  mostrarTempo();
});

focoBT.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  setButtonConfig(
    focoBT,
    gradient1,
    "#02df09",
    "images/personagem2-Photoroom.png",
    "Invoque o feitiço do repouso: <span>Hora do descanso curto.</span>"
  );
  mostrarTempo();
});

descLong.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  setButtonConfig(
    descLong,
    gradient2,
    "#041a3f",
    "images/personagem3-Photoroom.png",
    "Duplique o feitiço de descanso, <span>pausa longa, renove a energia.</span>"
  );
  mostrarTempo();
});

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    alert("Tempo finalizado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  musicaPlay.play();
  if (intervaloId) {
    musicaPause.play();
    zerar();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  intervaloId = null;

  if (tempoDecorridoEmSegundos <= 0) {
    musicaFinish.play(); // Toca o som de "beep" apenas se o tempo acabar
  } else {
    musicaPause.play(); // Toca o som de "pause" se o usuário interromper
  }
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
