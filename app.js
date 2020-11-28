const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

const board = document.getElementById("board");
const cellElements = document.querySelectorAll('[data-cell]');
const finalDisp = document.getElementsByClassName("winning-message")[0];
const restartButton = document.getElementById('restartButton');
let circleTurn = false;

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
    board.classList.add(X_CLASS);
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once : true});
    })    
    finalDisp.classList.remove('show');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //placeMark
    placeMark(cell, currentClass);

    //Check for win
    for(let i = 0; i < 7; i+=3){ //Row Check
        if(cellElements[i].className == "cell x" && 
        cellElements[i+1].className == "cell x" && 
        cellElements[i+2].className == "cell x" ) {
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray X Won!";
            placeMark(finalDisp,"show");
        }    

        if(cellElements[i].className == "cell circle" && 
        cellElements[i+1].className == "cell circle" && 
        cellElements[i+2].className == "cell circle" ){
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray Circle Won!";
            placeMark(finalDisp,"show");
        }  

    }

    for(let i=0; i < 3; i++){ //Column Check
        if(cellElements[i].className == "cell x" && 
        cellElements[i+3].className == "cell x" && 
        cellElements[i+6].className == "cell x" ) {
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray X Won!";
            placeMark(finalDisp,"show");
        }

        if(cellElements[i].className == "cell circle" && 
        cellElements[i+3].className == "cell circle" && 
        cellElements[i+6].className == "cell circle" ) {
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray Circle Won!";
            placeMark(finalDisp,"show");
        }    
    }

     //Diagnol Check
        if((cellElements[0].className == "cell x" && cellElements[4].className == "cell x" 
        && cellElements[8].className == "cell x") || (cellElements[2].className == "cell x" &&
        cellElements[4].className == "cell x" && cellElements[6].className == "cell x")) {
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray X Won!";
            placeMark(finalDisp,"show");
        }

        if((cellElements[0].className == "cell circle" && cellElements[4].className == "cell circle" 
        && cellElements[8].className == "cell circle") || (cellElements[2].className == "cell circle" &&
        cellElements[4].className == "cell circle" && cellElements[6].className == "cell circle")) {
            finalDisp.querySelector('[data-winning-message-text]').innerHTML = "Hurray Circle Won!";
            placeMark(finalDisp,"show");
        }

    //check for draw
    let flag = 1;
    for(let i=0;i<9;i++){
        if(cellElements[i].className == "cell"){
            flag = 0;
            break;
        }
    }
    
    if(flag){
        finalDisp.querySelector('[data-winning-message-text]').innerHTML = "It's a Draw";
        placeMark(finalDisp,"show");    
    }
    //switch turns
    circleTurn = !circleTurn;
    swapHoverClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}