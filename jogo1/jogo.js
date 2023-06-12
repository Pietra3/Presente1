var rows = 6;
var columns = 6;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    //inicializa tabuleiro de 6x6
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./img1/blank.jpg";

            ///função arrastar
            tile.addEventListener("dragstart", dragStart); //clica na imagem para arrastar
            tile.addEventListener("dragover", dragOver); //arrasta a imagem
            tile.addEventListener("dragenter", dragEnter); //arrasntando a imagem pra outra
            tile.addEventListener("dragleave", dragLeave); //arrastando uma imagem pra longe de outra
            tile.addEventListener("drop", dragDrop); //solta imagem soubre a outra
            tile.addEventListener("dragend", dragEnd); //depois de concluir o arrastar e soltar

            document.getElementById("board").append(tile);
        }
    }

    //peças
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./img1/" + pieces[i] + ".jpg";


        ///função arrastar
        tile.addEventListener("dragstart", dragStart); //clica na imagem para arrastar
        tile.addEventListener("dragover", dragOver); //arrasta a imagem
        tile.addEventListener("dragenter", dragEnter); //arrasntando a imagem pra outra
        tile.addEventListener("dragleave", dragLeave); //arrastando uma imagem pra longe de outra
        tile.addEventListener("drop", dragDrop); //solta imagem soubre a outra
        tile.addEventListener("dragend", dragEnd); //depois de concluir o arrastar e soltar

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this;

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
    otherTile = this;
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