import { useEffect, useRef, useState } from "react";
import "./App.css";

function GameSquare({ playerPiece, squareID, rowID, recordBoardState }) {
  const [text, setText] = useState("");

  function handlePiecePlacement(event) {
    const clickedBox = event.target;

    if (clickedBox.textContent === "") {
      clickedBox.textContent = playerPiece;
    }

    setText(clickedBox.textContent);
    recordBoardState(rowID, squareID, playerPiece);
  }

  return (
    <div className="gameSquare" onClick={handlePiecePlacement}>
      {text}
    </div>
  );
}

function GameRow({ playerPiece, rowID, recordBoardState }) {
  return (
    <div className="gameRow">
      <GameSquare
        playerPiece={playerPiece}
        squareID={0}
        rowID={rowID}
        recordBoardState={recordBoardState}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        recordBoardState={recordBoardState}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        recordBoardState={recordBoardState}
      />
    </div>
  );
}

function GameBoard({
  playerID,
  setPlayerID,
  playerPiece,
  setPlayerPiece,
  boardState,
  recordBoardState,
  isGameOver,
}) {
  function handlePlayerEndturn() {
    if (!isGameOver) {
      if (playerPiece === "X") {
        setPlayerPiece("O");
      } else {
        setPlayerPiece("X");
      }

      if (playerID === 1) {
        setPlayerID(2);
      } else {
        setPlayerID(1);
      }

      checkForWinCondition();
    }
  }

  function checkForWinCondition() {}

  return (
    <div className="gameBoard" onClick={handlePlayerEndturn}>
      <GameRow
        playerPiece={playerPiece}
        rowID={0}
        recordBoardState={recordBoardState}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={1}
        recordBoardState={recordBoardState}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={2}
        recordBoardState={recordBoardState}
      />
    </div>
  );
}

function GameDescription({ playerID, playerPiece }) {
  return (
    <div>
      <p>
        Player {playerID}, place your {playerPiece}
      </p>
    </div>
  );
}

function GameArea({ isGameOver, boardState, recordBoardState }) {
  const [playerPiece, setPlayerPiece] = useState("X");
  const [playerID, setPlayerID] = useState(1);

  return (
    <div className="gameArea">
      <GameDescription playerID={playerID} playerPiece={playerPiece} />
      <GameBoard
        playerID={playerID}
        setPlayerID={setPlayerID}
        playerPiece={playerPiece}
        setPlayerPiece={setPlayerPiece}
        isGameOver={isGameOver}
        boardState={boardState}
        recordBoardState={recordBoardState}
      />
    </div>
  );
}

function HistoryButton() {
  return (
    <div>
      <button>Go back to game beginning</button>
    </div>
  );
}

function GameHistory({ boardState }) {
  return (
    <div className="historyArea">
      <HistoryButton />
    </div>
  );
}

export default function App() {
  const [isGameOver, setGameOver] = useState(false);
  // represent the board as a string of length 8.
  //  Index 0 = top left square, index 1 = top middle square, and so forth...
  //  Char '0' represents empty space, '1' represents 'X', '2' represents 'O'.
  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [row0, setRow0] = useState([]);
  const [row1, setRow1] = useState(["", "", ""]);
  const [row2, setRow2] = useState([]);

  function recordBoardState(changedRowID, changedSquareID, playerPiece) {
    const boardCopy = [...boardState];
    boardCopy[changedRowID][changedSquareID] = playerPiece;
    setBoardState(boardCopy);
  }

  function returnToOldBoardState(boardState) {}

  return (
    <div className="appLayout">
      <GameArea
        isGameOver={isGameOver}
        boardState={boardState}
        recordBoardState={recordBoardState}
      />
      <GameHistory boardState={boardState} />
    </div>
  );
}
