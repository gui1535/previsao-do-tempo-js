// VARIÁVEIS => Um espaço da memória do computador que guardamos algo (um numero, uma letra, um texto, uma imagem)
// FUNÇÃO => Um trecho de código que só é executado quando é chamado

let chave = "cebcd482eda57fa9a6714c1c2ba91885"
let formSearch = document.getElementById("form-search-cidade");

function mostrarPrevisao(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
}

function cidadeNaoEncontrada() {
    Swal.fire({
        icon: 'question',
        title: 'Ops...',
        text: 'Cidade não encontrada',
    })
}

function cidadeNaoDigitada() {
    Swal.fire({
        icon: 'error',
        title: "Campo obrigatório",
        text: 'Informe a cidade para procurar a previsão do tempo',
    })
}
async function buscarCidade(cidade) {
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    )
        .then(resposta => resposta.json())
    console.log(dados)
    if (dados.cod != '404') {
        mostrarPrevisao(dados)
    } else {
        cidadeNaoEncontrada();
    }
}

formSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    let cidade = document.querySelector(".input-cidade").value
    if (!cidade) {
        cidadeNaoDigitada()
        return;
    }
    buscarCidade(cidade)
});