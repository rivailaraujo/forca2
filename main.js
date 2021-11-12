class Palavra {
    constructor(palavra) {
        this.palavra = palavra;
    }
    tamanho() {
        return this.palavra.length;
    }
}

let palavra;
let palavrachute = [];
let chutes = [];
let letraschutadas = [];
let pontuacao = 1000;
let gamestatus = false;
let timer;


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
        console.log("Vazio")
    }
    if (palavra.palavra === document.getElementById("entrada").value) {
        document.getElementById("entrada").value = "";
        console.log("Acertou");
        mostrarResultadoSucesso();
        endGame();
        viewStart();
        document.getElementsByClassName("keyboard")[0].classList.add("keyboard--hidden");;
    } else {
        console.log("Errou");
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
        document.getElementById("letra-chutada").innerHTML += letra;
        let palavraArray = Array.from(palavra.palavra);
        temLetraNoArray(letra, palavraArray);
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
            pontuacao += 100;
            let chuteatual = palavrachute.toString().split(',').join('');
            localStorage.setItem('chutes', JSON.stringify(chutes));
            localStorage.setItem('letraschutadas', letraschutadas);
            if (chuteatual == palavra.palavra) {
                console.log("ACABOU")
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
    pontuacao = 1000;
}

function mostrarResultadoSucesso() {
    Swal.fire(
        'Acertou!',
        pontuacao.toString() + ' Pontos!',
        'success'
    )
}

async function iniciarGame() {
    viewGame();
    let umapalavra;
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
    } else {
        umapalavra = await getPalavra();
    }

    localStorage.setItem("Palavra", umapalavra);
    palavra = new Palavra(umapalavra.toLowerCase())
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
            pontuacao = pontuacao - 5;
            localStorage.setItem('pontuacao', pontuacao);
        } else {
            paraPontuacao();
        }
        document.getElementById("pontuacao").innerText = pontuacao;

    }, 1000);
}

if (localStorage.getItem("Palavra")) {
    document.getElementById("btn-iniciar").innerText = "Continuar"
}
document.getElementById("btn-iniciar").addEventListener("click", () => {
    iniciarGame();
})