let playerOne = {
  playerName: "",
  playerChoice: ""
};
let playerTwo = {
  playerName: "",
  playerChoice: ""
}

let game = (()=>{
  let winningCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board = ["","","","","","","","",""];
  let gameBoard = (()=>{
    function fillCell(cPlayer,index){
      if(board[index] == ""){
        board[index] = cPlayer;
        return 1;
      }else{
        return 0;
      }
    }
    function resetBoard(){
      for(let i=0; i<9; i++){
        board[i] = "";
      }
    }
    return {fillCell,resetBoard};
  })();
  function checkWinner(cPlayer){
    for(let combination of winningCombinations){
      let [a,b,c] = combination;
      if(board[a] === cPlayer && board[b] === cPlayer && board[c] === cPlayer){
        return combination;
      }
    }
    return undefined;
  }
  function checkDraw(){
    for(let valueAtIndex of board){
      if(valueAtIndex === ""){
        return;
      }
    }
    return 1;
  }
  return {checkWinner,checkDraw,gameBoard}
})();

const startButton = document.querySelector("body > .game-start > .start-button");
const startButtonContainer = document.querySelector("body > .game-start");
const playersEntryDialog = document.querySelector(".players-name--entry");
const dialogForm = document.querySelector(".players-name--form");
const winDrawDialog = document.querySelector(".win-draw--dialog");
const errorSmall = document.querySelector("p > small");
const currentPlayer = document.querySelector(".container > .turn > .current-player");
let cPlayer = "X";
const playerOneDisplay = document.querySelector(".container > .player-one");
const playerTwoDisplay = document.querySelector(".container > .player-two");
const xochoices = document.querySelector("dialog > .form-container > .players-name--form > .x-o");
const header = document.querySelector("body > .game-header");
const main = document.querySelector("body > .container");
const footer = document.querySelector("body > .game-footer");
const cellsContainer = document.querySelector(".container > .cells-container")
const message = winDrawDialog.querySelector(".dialog-content > .message");
const playAnotherRoundButton = winDrawDialog.querySelector(".dialog-content > .buttons > .play-again");
const quitButton = winDrawDialog.querySelector(".dialog-content > .buttons > .quit");

function displayContent(){
  header.classList.remove("hidden");
  main.classList.remove("hidden");
  footer.classList.remove("hidden");
  setTimeout(() => {
    header.classList.add("game-header--animate")
    main.classList.add("container-animate")
    footer.classList.add("game-footer--animate")
  }, 100);
}

function showresultDialog(msg){
  winDrawDialog.showModal();
  winDrawDialog.classList.add("dialog-animate");
  if(playerOne.playerChoice === cPlayer){
    message.textContent = `${playerOne.playerName} `+ msg;
  }else{
    message.textContent = `${playerTwo.playerName} `+ msg;
  }
}

function showWinner(comb){
  comb.forEach(index => {
    const cell = cellsContainer.querySelector(`[data-id="${index}"]`);
    cell.classList.add("winning-cells");
  });
  setTimeout(() => {
    showresultDialog("wins this round !!!");
  }, 800);
}
quitButton.addEventListener("click",()=>{
  winDrawDialog.classList.remove("dialog-animate");
  setTimeout(() => {
    winDrawDialog.close();
    header.classList.remove("game-header--animate");
    main.classList.remove("container-animate");
    footer.classList.remove("game-footer--animate");
    setTimeout(() => {
      header.classList.add("hidden");
      main.classList.add("hidden");
      footer.classList.add("hidden");
      startButtonContainer.classList.remove("hidden");
      setTimeout(() => {
      startButton.classList.remove("btn-animate");
      }, 200);
    }, 500);
  },500);
})
playAnotherRoundButton.addEventListener("click",()=>{
  cPlayer = "X";
  currentPlayer.textContent = cPlayer;
  winDrawDialog.classList.remove("dialog-animate");
  setTimeout(() => {
    winDrawDialog.close();
    game.gameBoard.resetBoard();
    const cells = cellsContainer.querySelectorAll(".cell");
    for (let cell of cells){
      cell.textContent = "";
      if(cell.classList.contains("winning-cells")){
        cell.classList.remove("winning-cells");
      }
    }
  }, 500);
})

dialogForm.addEventListener("click",(event)=>{

  if(event.target.classList.contains("choice-x") || event.target.classList.contains("choice-o")){
    if(event.target.classList.contains("choice-x")){
      xochoices.querySelector(".choice-o").classList.remove("is-selected");
      event.target.classList.add("is-selected");
      playerOne.playerChoice = "X";
      playerTwo.playerChoice = "O";
    }
    if(event.target.classList.contains("choice-o")){
      xochoices.querySelector(".choice-x").classList.remove("is-selected");
      event.target.classList.add("is-selected");
      playerOne.playerChoice = "O";
      playerTwo.playerChoice = "X";
    }
  }

  if(event.target.classList.contains("submit")){
    event.preventDefault();
    playerOne.playerName = dialogForm["0"].value;
    playerTwo.playerName = dialogForm["1"].value;
    if(playerOne.playerName === "" || playerOne.playerChoice === "" || playerTwo.playerName === "" || playerTwo.playerChoice === ""){
      errorSmall.classList.remove("hidden");
      return;
    }else{
      errorSmall.classList.add("hidden");
      currentPlayer.textContent = cPlayer;
      playerOneDisplay.textContent = `${playerOne.playerName} : ${playerOne.playerChoice}`;
      playerTwoDisplay.textContent = `${playerTwo.playerName} : ${playerTwo.playerChoice}`;
      dialogForm.reset();
      startButtonContainer.classList.add("hidden");
      playersEntryDialog.classList.remove("dialog-animate");
      setTimeout(() => {
        playersEntryDialog.close();
        displayContent();
      }, 400);
    }

  }
  if(event.target.classList.contains("reset")){
    playerOne.playerName = "";
    playerTwo.playerName = "";
    const selected = dialogForm.querySelector(".is-selected");
    if (selected) {
      selected.classList.remove("is-selected");
    }
    playerOne.playerChoice ="";
    playerTwo.playerChoice="";
  }
  if(event.target.classList.contains("cancel")){
    dialogForm.reset();
    errorSmall.classList.add("hidden");
    playerOne.playerName ="";
    playerOne.playerChoice ="";
    playerTwo.playerName ="";
    playerTwo.playerChoice="";
    const selected = dialogForm.querySelector(".is-selected");
    if (selected) {
      selected.classList.remove("is-selected");
    }
    playersEntryDialog.classList.remove("dialog-animate");
    setTimeout(() => {
      playersEntryDialog.close();
      startButton.classList.remove("btn-animate")
    }, 500);
  }

})

startButton.addEventListener("click",()=>{
  startButton.classList.add("btn-animate")
  setTimeout(() => {
    playersEntryDialog.showModal();
    playersEntryDialog.classList.add("dialog-animate");
  }, 500);

});

cellsContainer.addEventListener("click",(e)=>{
  if(e.target.classList.contains("cell")){
    const cell = e.target;
    if(game.gameBoard.fillCell(cPlayer,cell.dataset.id)){
      cell.textContent = cPlayer;
      let comb = game.checkWinner(cPlayer);
      if(comb){
        showWinner(comb);
      }else if(game.checkDraw()){
        winDrawDialog.showModal();
        winDrawDialog.classList.add("dialog-animate");
        message.textContent = `Draw !!!`;
      }else{
        if(cPlayer === "X"){
          cPlayer = "O";
        }
        else{
          cPlayer = "X";
        }
        currentPlayer.textContent = cPlayer;
      }
    }else{
      return;
    }
  }
})

