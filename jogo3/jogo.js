var rows = 6;
var columns = 6;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    //iniciao tabuleiro de 6x6
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./blank.jpg";

            //função arrastar
            tile.addEventListener("dragstart", dragStart); //clica na imagem para arrastar
            tile.addEventListener("dragover", dragOver); //arrasta a imagem
            tile.addEventListener("dragenter", dragEnter); //arrasntando a imagem pra outra
            tile.addEventListener("dragleave", dragLeave); //arrastando uma imagem pra longe de outra
            tile.addEventListener("drop", dragDrop); //solta imagem soubre a outra
            tile.addEventListener("dragend", dragEnd); //depois de concluir o arrastar e soltar

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); //coloca "1" a "36" no array (nomes das imagens do quebra-cabeça)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length); //embaralha as peças

        //trocar peças
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) { // inserindo peças do jogo
        let tile = document.createElement("img");
        tile.src = "" + pieces[i] + ".jpg";


        //função arrastar
        tile.addEventListener("dragstart", dragStart); //clica na imagem para arrastar
        tile.addEventListener("dragover", dragOver); //arrasta a imagem
        tile.addEventListener("dragenter", dragEnter); //arrasntando a imagem pra outra
        tile.addEventListener("dragleave", dragLeave); //arrastando uma imagem pra longe de outra
        tile.addEventListener("drop", dragDrop); //solta imagem soubre a outra
        tile.addEventListener("dragend", dragEnd); //depois de concluir o arrastar e soltar

        document.getElementById("pieces").append(tile);
    }
}

//arrastar peças
function dragStart() {
    currTile = this; //refere-se à imagem que foi clicada para arrastar
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //isso se refere à imagem que está sendo descartada
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}