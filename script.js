//    ***********************************************
//    * WELCOME TO ANDREI AND YOSSI'S SODOKU GAME   *
//    ***********************************************

let idCellEdit;
let steps = 0;
let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];



//   *********************************************************
//   * Functions for finding duplicate numbers in the board  *
//   *********************************************************

const hasErrorInRow = (row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && col !== i) {
      return [true, i];
    }
  }
  return [false];
}

const hasErrorInColumn = (row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && row !== i) {
      return [true, i];
    }
  }
  return [false];
}

const hasErrorInSmallMat = (row, col, num) => {
  const firstCubeIndex = {
    0: 0,
    1: 0,
    2: 0,
    3: 3,
    4: 3,
    5: 3,
    6: 6,
    7: 6,
    8: 6,
  }
  let i = firstCubeIndex[row];
  let j = firstCubeIndex[col];
  let maxj = j + 3;
  let maxi = i + 3;

  for (i; i < maxi; i++) {
    for (j; j < maxj; j++) {
      if (board[i][j] === num) {
        return [true, i, j];
      }
    }
    j = firstCubeIndex[col];
  }
  return [false];
}


const hasError = (row, col, num) => {
  return hasErrorInRow(row, col, num)[0] || hasErrorInColumn(row, col, num)[0] || hasErrorInSmallMat(row, col, num)[0];
}

const getErrorCell = (row, col, num) => {
  const errorInRow = hasErrorInRow(row, col, num)
  if (errorInRow[0]) {
    return {
      row,
      column: errorInRow[1]
    };
  }

  const errorInColumn = hasErrorInColumn(row, col, num)
  if (errorInColumn[0]) {
    return {
      row: errorInColumn[1],
      column: col
    };
  }

  const errorInSmallMat= hasErrorInSmallMat(row, col, num)
  if (errorInSmallMat[0]) {
    return {
      row: errorInSmallMat[1],
      column: errorInSmallMat[2]
    };
  }

  return null;
}

//************************************************************

const rollNewNumber = () => {
  steps++;
  return Math.floor(Math.random() * 9) + 1;
}

const rollByPercent = () => {

  return Math.floor(Math.random() * 100) + 1;
}

const rollNumberForReveal = () => {

  return Math.floor(Math.random() * 9);
}

//   ***********************************************
//   * A function that builds an entire game board *
//   ***********************************************

const fillBoard = () => {
  
  let count = 0;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      num = rollNewNumber();

      while (hasError(row, col, num)) {
        while (count < 50 && hasError(row, col, num)) {
          num = rollNewNumber();
          count++;
        }
        if (count == 50) {
          col = 0;
          board[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          row--;
          board[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        count = 0;
      }
      board[row][col] = num;
    }
  }
  //console.log(board);
  return board;
}

//************************************************************

const logInUser = (userInput, passInput) => {
  const userList = [{ userName: 'abcd', password: 1234 }]
  if (userInput == userList[0].userName && passInput == userList[0].password){
    return true;
  }
  else{return false;}
}

//   ***********************************************
//   * A function that selects a difficulty level  *
//   ***********************************************



const chooseDificulty = (level) => {
  board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0]];
  fillBoard();
  let flag = 0, col, row;
  for (let i = 0; i < (level * 20); i++) {
    flag = 0;
    while (flag == 0) {
      col = rollNumberForReveal();
      row = rollNumberForReveal();
      if (board[row][col] == 0) {
        continue;
      }
      else {
        flag = 1;
        board[row][col] = 0;
      }
    }
  }
  difficultyLevelSelectionWindow.style.display = "none";
  welcomeUser.style.display = "none";
  //debugger;
  boardToHTML();
  gameBar.style.display = "block";

}


const selectNumberForCell = function (e) {
  idCellEdit = e.target.id;
  e.stopPropagation();

  const left = (e.clientX - 70) + 'px',
    top = (e.clientY - 70) + 'px';

  openPopup({ left, top });
}

const insertNum = (num) => {
  const editedCell = document.getElementById(idCellEdit);
  const row = Number.parseInt(idCellEdit[0], 10);
  const column = Number.parseInt(idCellEdit[1], 10);
  
  if (hasError(row, column, num)) {
    editedCell.classList += ' invalid';
  } else {
    editedCell.classList = editedCell.classList.value.split('invalid').join('')
  }

  board[row][column] = num;
  editedCell.innerHTML = num;
  closePopup();
}

const createInMemoryBoard = () => {
  const newGameBoard = document.createElement('div');
  newGameBoard.classList = 'board';
  newGameBoard.id = 'board';
  return newGameBoard;
}

const createCell = (row, column) => {
  const cell = document.createElement('a');
  cell.classList = 'cell';
  cell.id = `${row}${column}`;

  if (board[row][column] === 0) {
    cell.onclick = selectNumberForCell;
  } else {
    cell.innerHTML = board[row][column];
    cell.classList = 'cell blocked';
  }

  if (row === 3 || row === 6) {
    cell.classList += ' mat-top-3'
  }
  return cell;
}

const setBoard = (board) => {
  const htmlBorad = document.getElementById('board');
  htmlBorad.replaceWith(board);
}

const deleteBoard = () => {
  setBoard(createInMemoryBoard());
}

const boardToHTML = () => {
  const newGameBoard = createInMemoryBoard();

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const cell = createCell(row, column);
      newGameBoard.appendChild(cell);
    }
  }

  setBoard(newGameBoard);
}

//**************************************************

const openPopup = ({ top, left }) => {
  const popup = document.getElementById('popup2');
  popup.style.left = left;
  popup.style.top = top;
  popup.style.display = "block";
}

const closePopup = () => {
  const popup = document.getElementById('popup2');
  popup.style.display = "none";
}

const signIn = () => {
  userAndPasswordWindow.style.display = "block";
}


const enterForDifficultyWindow = () => {
  let userInput = document.getElementById('user').value;
  let passInput = document.getElementById('pass').value;
  if (logInUser(userInput, passInput)){
    userAndPasswordWindow.style.display = "none";
    signin.style.display = "none";
    difficultyLevelSelectionWindow.style.display = "list-item";
    // chooseLevel.style.display = "block";
    welcome.style.display = "block";
    document.getElementById('welcomeUser').innerHTML = "welcome" +" "+ userInput;
  }
  else{
    alert("ERROR: wrong user name or password")
  }
}


window.onclick = closePopup;

const again = () => {
  gameBar.style.display ="none";
  deleteBoard();
  difficultyLevelSelectionWindow.style.display = "block";
  welcomeUser.style.display = "block";
}

const finish = () => {
  let flag=0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(document.getElementById(`${i}${j}`).classList.contains("invalid") || document.getElementById(`${i}${j}`).innerHTML==''){
        flag=1;
      }
    }    
  }
  if(flag==0){
    document.getElementById('win').style.display="inline";
  }
  else{
    document.getElementById('lose').style.display="inline";
  }
}

const closeWin = () => {
  document.getElementById('win').style.display="none";
}

const closeLose = () => {
  document.getElementById('lose').style.display="none";


}


fillBoard();
//chooseDificulty(1) //this func get number level 1=easy 2=medium 3=hard
// boardToHTML();





