// select all elements 
const playerText = document.querySelector("[data-player]"),
      cells = Array.from(document.querySelectorAll(".cell")),
      result = document.querySelector("[data-result]"),
      btnReset = document.querySelector("[data-btn]");


// setting
let currentPlayer = "X";
let isGameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
const odds = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


cells.forEach((cell, index) => {
    cell.addEventListener("click", (e)=> {

        // if the cell is not empty >> return
        if(e.target.textContent !== "" || !isGameActive) return

        // showing to the board
        cell.innerText = currentPlayer;
        cell.classList.add(`player-${currentPlayer}`);

        // add to the board 
        updateBoard(index);

        // handle the result
        handleResult();
        // change the player
        changePlayer();
    });
});



const updateBoard = function(index){
    board[index] = currentPlayer;
}

const handleResult = function(){
    let roundWon = false;

    // compare between the odds and the board
    // to check if there a winner or not
    for(let i=0; i<=7; i++){
        const winCondition = odds[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if(a === '' || b === '' || c === '') continue;

        if(a === b && b === c){
            roundWon = true;
            isGameActive = false;
            break;
        }
    }

    // if the current player won
    if(roundWon){

        // remove hidden class to show the result
        result.classList.remove("hidden");

        // check who is the current player
        if(currentPlayer == "X"){
            result.innerHTML = 'Player <span class="player-X">X</span> won.';
        }else{
            result.innerHTML = 'Player <span class="player-O">O</span> won.';
        }
    }

    // draw
    if(!board.includes('')){
        result.innerHTML = 'A draw';
    }
}


// change current player
const changePlayer = function(){
    playerText.classList.remove(`player-${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O": "X";
    playerText.innerText = currentPlayer;
    playerText.classList.add(`player-${currentPlayer}`);
    
}


btnReset.addEventListener("click", function(){
    // reset the board
    board = ["", "", "", "", "", "", "", "", ""];

    // clear the class of cells
    cells.forEach(cell => {
        cell.classList.remove("player-X");
        cell.classList.remove("player-O");
        cell.innerText = '';
    });

    // make the game is active again
    isGameActive = true;

    // reset current player to X
    if(currentPlayer === "O") changePlayer();

    // hide the result again
    result.classList.add("hidden");

});