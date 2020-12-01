import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

class Square extends React.Component {
  render() {
    return (
      <div className="square" style={squareStyle} onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleBoxClick(index) {
    const boxes = this.state.boxes.slice();

    boxes[index] = this.state.xIsNext ? "x" : "o";

    this.setState({
      boxes: boxes,
      xIsNext: !this.state.xIsNext
    });
  }

  handleBoardRestart = () => {
    this.setState({
      boxes: Array(9).fill(null),
      xIsNext: true
    });
  };

  findWinner(boxes) {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < rows.length; i++) {
      const [a, b, c] = rows[i];

      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }

    return null;
  }

  areAllBoxesClicked(boxes) {
    let count = 0;

    boxes.forEach(function (item) {
      if (item !== null) {
        count++;
      }
    });

    if (count === 9) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const winner = this.findWinner(this.state.boxes);
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>
          Next player: {this.state.xIsNext ? "x" : "o"}
        </div>
        <div className="winner" style={instructionsStyle}>
          Winner: {winner ? `${winner}` : "None"}
        </div>
        <button style={buttonStyle} onClick={this.handleBoardRestart}>
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.boxes[0]}
              onClick={() => this.handleBoxClick(0)}
            />
            <Square
              value={this.state.boxes[1]}
              onClick={() => this.handleBoxClick(1)}
            />
            <Square
              value={this.state.boxes[2]}
              onClick={() => this.handleBoxClick(2)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.boxes[3]}
              onClick={() => this.handleBoxClick(3)}
            />
            <Square
              value={this.state.boxes[4]}
              onClick={() => this.handleBoxClick(4)}
            />
            <Square
              value={this.state.boxes[5]}
              onClick={() => this.handleBoxClick(5)}
            />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square
              value={this.state.boxes[6]}
              onClick={() => this.handleBoxClick(6)}
            />
            <Square
              value={this.state.boxes[7]}
              onClick={() => this.handleBoxClick(7)}
            />
            <Square
              value={this.state.boxes[8]}
              onClick={() => this.handleBoxClick(8)}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
