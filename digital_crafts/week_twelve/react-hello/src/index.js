import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TicTacToe extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlayer: 'O',
      gameBoard: [['','',''],['','',''],['','','']]
    };
  }
  markSquare(idx1, idx2) {
    if(this.state.gameBoard[idx1][idx2] === '') {
      this.state.gameBoard[idx1][idx2] = this.state.currentPlayer;
      this.state.currentPlayer = this.state.currentPlayer === 'O' ? 'X' : 'O';
    }
    // let value;
    // if (this.state.currentPlayer === 'O') {
    //   value = 'X';
    // } else {
    //   value = 'O';
    // }
    this.setState({
      gameBoard: this.state.gameBoard,
      currentPlayer: this.state.currentPlayer
    });
  }
  render() {
    let gameBoard = this.state.gameBoard;
    let winner;
    if(
      (gameBoard[1][1] !== '' && (gameBoard[1][1] === gameBoard[0][0] && gameBoard[1][1] === gameBoard[2][2] ||
       gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] === gameBoard[2][0]))

        || (gameBoard[0][0] !== '' && (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2]) || gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2] || gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2]) {
         winner = this.state.currentPlayer
       }
    return(
      <div>
      <label>Winner: {winner}</label><br>
      <label>Current Player: {this.state.currentPlayer}</label>
      {gameBoard.map((item, idx1) =>
        <div className="row">
        {item.map((innerItem, idx2) =>
          <div className="buttons" onClick={() => this.markSquare(idx1, idx2)}>{innerItem}</div>)}
        </div>
      )}
      </div>
    )

  }
}


ReactDOM.render(
  <TicTacToe/>,
  document.getElementById('root')
);
