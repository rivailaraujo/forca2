class Palavra {
    constructor(palavra) {
        this.palavra = palavra;
    }
    tamanho() {
        return this.palavra.length;
    }
}
class UsuarioData {
    constructor(pontuacao) {
        this.pontuacao = pontuacao;
    }

    getPontuacao() {
        return this.pontuacao;
    }

    static getPontuacaoMaxima() {
        return localStorage.getItem('pontuacaoMaxima');
    }

    setPontuacao(pontuacao) {
        this.pontuacao = pontuacao;
    }

}

let palavra;
let usuario;
let palavrachute = [];
let chutes = [];
let letraschutadas = [];
let gamestatus = false;
let timer;
let erros = 0;


async function getPalavra() {
    const url = 'https://raw.githubusercontent.com/rivailaraujo/JsonNomes/main/nomes.json';
    let response = await fetch(url);
    let data = await response.json();
    let num = Math.floor(Math.random() * 1000);
    return data[num];
}

function preencheEspaco(tamanho) {
    let i = 0
    do {
        document.getElementById("palavra").innerHTML += `<h1 id = "${i}"> _</h1>`;
        i++;
    } while (i < tamanho);
}

function apenasLetras(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        } else if (e) {
            var charCode = e.which;
        } else {
            return true;
        }
        if (
            (charCode > 64 && charCode < 91) ||
            (charCode > 96 && charCode < 123) ||
            (charCode > 191 && charCode <= 255) // letras com acentos
        ) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        alert(err.Description);
    }
}

function chutar() {

    if (document.getElementById("entrada").value == "") {
        //console.log("Vazio")
    }
    if (palavra.palavra === document.getElementById("entrada").value) {
        document.getElementById("entrada").value = "";
        mostrarResultadoSucesso();
        endGame();
        viewStart();
    } else {
        document.getElementById("entrada").value = "";
    }
}

function verificarCampo(value) {
    if (value != "") {
        document.getElementById("btn-chutar").disabled = false;
    } else {
        document.getElementById("btn-chutar").disabled = true;
    }

}

function chutarLetra(letra) {

    const letraencontrada = letraschutadas.find(element => element == letra);

    if (letraencontrada) {
        console.log("Letra ja chutada!");
    } else {
        letraschutadas.push(letra);
        localStorage.setItem('letraschutadas', letraschutadas);
        document.getElementById("letra-chutada").innerHTML += letra;
        let palavraArray = Array.from(palavra.palavra);
        if (!temLetraNoArray(letra, palavraArray)) {
            erros = erros + 1;
            localStorage.setItem('erros', erros);
            mostrarBoneco();
        }
    }
}

function temLetraNoArray(letra, array) {
    let temLetra = false
    for (let i = 0; i < array.length; i++) {
        if (array[i] == letra) {
            temLetra = true;
            alterarEspaco(i, letra);
            chutes.push({
                position: i,
                letra: letra
            });
            palavrachute[i] = letra;
            usuario.setPontuacao(usuario.getPontuacao() + 100);
            let chuteatual = palavrachute.toString().split(',').join('');
            localStorage.setItem('chutes', JSON.stringify(chutes));
            if (chuteatual == palavra.palavra) {
                //console.log("ACABOU");
                mostrarResultadoSucesso();
                endGame();
                viewStart();
            }
        }
    }
    return temLetra;
}


function alterarEspaco(posicao, letra) {
    document.getElementById((posicao)).innerHTML = letra;
}


function viewGame() {
    document.getElementById("input-chute").style.display = "block";
    document.getElementById("div-chutes").style.display = "block";
    document.getElementById("btn-iniciar").style.display = "none";
    document.getElementById("div-pontuacao").style.display = "block";
}

function viewStart() {
    document.getElementById("input-chute").style.display = "none";
    document.getElementById("div-chutes").style.display = "none";
    document.getElementById("btn-iniciar").style.display = "block";
    document.getElementById("palavra").innerHTML = "";
    document.getElementById("btn-iniciar").innerText = "Iniciar"
    document.getElementById("letra-chutada").innerHTML = "";
    document.getElementById("div-pontuacao").style.display = "none";
    document.getElementsByClassName("cabeca")[0].style.display = "none";
    document.getElementsByClassName("corpo")[0].style.display = "none";
    document.getElementsByClassName("b-direito")[0].style.display = "none";
    document.getElementsByClassName("b-esquerdo")[0].style.display = "none";
    document.getElementsByClassName("p-esquerda")[0].style.display = "none"
    document.getElementsByClassName("p-direita")[0].style.display = "none";
}


function paraPontuacao() {
    clearInterval(timer);
}

function endGame() {
    localStorage.clear();
    palavra = "";
    palavrachute = [];
    chutes = [];
    letraschutadas = [];
    gamestatus = false;
    //pontuacao = 1000;
    erros = 0;
}

function mostrarResultadoSucesso() {
    Swal.fire(
        'Acertou!',
        usuario.getPontuacao().toString() + ' Pontos!',
        'success'
    )
    document.getElementsByClassName("keyboard")[0].classList.add("keyboard--hidden");
}

function mostrarBoneco() {

    switch (erros) {
        case 1:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            break;
        case 2:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            document.getElementsByClassName("corpo")[0].style.display = "block";
            break;
        case 3:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            document.getElementsByClassName("corpo")[0].style.display = "block";
            document.getElementsByClassName("b-direito")[0].style.display = "block";
            break;
        case 4:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            document.getElementsByClassName("corpo")[0].style.display = "block";
            document.getElementsByClassName("b-direito")[0].style.display = "block";
            document.getElementsByClassName("b-esquerdo")[0].style.display = "block";
            break;
        case 5:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            document.getElementsByClassName("corpo")[0].style.display = "block";
            document.getElementsByClassName("b-direito")[0].style.display = "block";
            document.getElementsByClassName("b-esquerdo")[0].style.display = "block";
            document.getElementsByClassName("p-esquerda")[0].style.display = "block";
            break;
        case 6:
            document.getElementsByClassName("cabeca")[0].style.display = "block";
            document.getElementsByClassName("corpo")[0].style.display = "block";
            document.getElementsByClassName("b-direito")[0].style.display = "block";
            document.getElementsByClassName("b-esquerdo")[0].style.display = "block";
            document.getElementsByClassName("p-esquerda")[0].style.display = "block";
            document.getElementsByClassName("p-direita")[0].style.display = "block";
            break;
        case 7:
            Swal.fire(
                'GAME OVER!',
                'Seu ruim!',
                'error'
            )
            document.getElementsByClassName("keyboard")[0].classList.add("keyboard--hidden");
            endGame();
            viewStart();
    }
}

async function iniciarGame() {
    viewGame();
    let umapalavra;
    let pontuacao;
    if (localStorage.getItem("Palavra")) {
        umapalavra = localStorage.getItem("Palavra");
        if (localStorage.getItem("chutes")) {
            chutes = JSON.parse(localStorage.getItem("chutes"));
        }
        if (localStorage.getItem("letraschutadas")) {
            let letras = localStorage.getItem("letraschutadas");
            letraschutadas = letras.split(',');
            for (let i = 0; i < letraschutadas.length; i++) {
                document.getElementById("letra-chutada").innerHTML += letraschutadas[i];
            }
        }
        if (localStorage.getItem("pontuacao")) {
            pontuacao = localStorage.getItem("pontuacao");
        }

        if (localStorage.getItem("erros")) {
            erros = parseInt(localStorage.getItem("erros"));
            mostrarBoneco();
        }

    } else {
        umapalavra = await getPalavra();
        pontuacao = 1000;
    }

    localStorage.setItem("Palavra", umapalavra);
    palavra = new Palavra(umapalavra.toLowerCase());
    usuario = new UsuarioData(pontuacao);
    console.log(palavra.palavra)
    preencheEspaco(palavra.tamanho());
    if (chutes) {
        chutes.map(x => {
            palavrachute[x.position] = x.letra;
            alterarEspaco(x.position, x.letra);
        })
    }
    gamestatus = true;

    timer = setInterval(() => {
        if (gamestatus == true && pontuacao > 0) {
            usuario.setPontuacao(usuario.getPontuacao() - 5)
            localStorage.setItem('pontuacao', usuario.getPontuacao());
        } else {
            paraPontuacao();
        }
        document.getElementById("pontuacao").innerText = usuario.getPontuacao();

    }, 1000);
}

if (localStorage.getItem("Palavra")) {
    document.getElementById("btn-iniciar").innerText = "Continuar"
}
document.getElementById("btn-iniciar").addEventListener("click", () => {
    iniciarGame();
})