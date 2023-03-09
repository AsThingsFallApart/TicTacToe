import { useRef, useState } from "react";
import "./App.css";

function GameSquare({ playerPiece }) {
  const [defaultText, setDefaultText] = useState("");

  function handlePiecePlacement(event) {
    const clickedBox = event.target;

    if (clickedBox.textContent === "") {
      clickedBox.textContent = playerPiece;
    }
  }

  return (
    <div className="gameSquare" onClick={handlePiecePlacement}>
      {defaultText}
    </div>
  );
}

function GameRow({ playerPiece }) {
  return (
    <div className="gameRow">
      <GameSquare playerPiece={playerPiece} />
      <GameSquare playerPiece={playerPiece} />
      <GameSquare playerPiece={playerPiece} />
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

      recordBoardState();
      checkForWinCondition();
    }
  }

  function checkForWinCondition() {}

  return (
    <div className="gameBoard" onClick={handlePlayerEndturn}>
      <GameRow playerPiece={playerPiece} />
      <GameRow playerPiece={playerPiece} />
      <GameRow playerPiece={playerPiece} />
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
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  function recordBoardState() {
    console.log(`boardState:\t${boardState}`);
    console.log(`boardState[0]:\t${boardState[0]}`);
    console.log(`boardState[1]:\t${boardState[1]}`);
    console.log(`boardState[2]:\t${boardState[2]}`);
  }

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
