let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosDaLista == numeroMaximo) {
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
} 

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.0});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();

function limparCampo() {
    document.getElementById('saida').value = "";
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'Tentativa'; 
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `${tentativas} ${palavraTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Errou!');
        limparCampo();
        if (numeroSecreto > chute) {
            exibirTextoNaTela('p', 'Tente um número maior');
        } else {
            exibirTextoNaTela('p', 'Tente um número menor');
        }
    }
    tentativas++
}

function reiniciarJogo() {
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
