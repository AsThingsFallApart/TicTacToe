import { useState } from "react";
import "./App.css";

function GameSquare({
  playerPiece,
  squareID,
  rowID,
  recordBoardState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
}) {
  const [text, setText] = useState("");

  function handleClick(event) {
    // place a piece
    if (!isGameOver) {
      const clickedBox = event.target;

      if (clickedBox.textContent === "") {
        clickedBox.textContent = playerPiece;
      }

      setText(clickedBox.textContent);
      recordBoardState(rowID, squareID, playerPiece);
      checkForWinCondition();
      transferPlacementPriority();
    }
  }

  return (
    <div className="gameSquare" onClick={handleClick}>
      {text}
    </div>
  );
}

function GameRow({
  playerPiece,
  rowID,
  recordBoardState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
}) {
  return (
    <div className="gameRow">
      <GameSquare
        playerPiece={playerPiece}
        squareID={0}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
    </div>
  );
}

function GameBoard({
  playerPiece,
  recordBoardState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
}) {
  return (
    <div className="gameBoard">
      <GameRow
        playerPiece={playerPiece}
        rowID={0}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={1}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={2}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
    </div>
  );
}

function GameDescription({
  playerID,
  playerPiece,
  winnerID,
  winnerPiece,
  isGameOver,
}) {
  if (!isGameOver) {
    return (
      <div>
        <p>
          Player {playerID}'s Turn: Place an {playerPiece}!
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Player {winnerID} ({winnerPiece}) wins!
        </p>
      </div>
    );
  }
}

function GameArea({ boardState, recordBoardState }) {
  const [playerPiece, setPlayerPiece] = useState("X");
  const [playerID, setPlayerID] = useState(1);
  const [winnerPiece, setWinnerPiece] = useState("");
  const [winnerID, setWinnnerID] = useState("");
  const [isGameOver, setGameOver] = useState(false);

  function transferPlacementPriority() {
    console.log(`isGameOver:\t${isGameOver}`);
    if (!isGameOver) {
      console.log("\ttransfering placement priority...");
      if (playerPiece === "X") {
        console.log(`Piece in play is ${playerPiece}`);
        setPlayerPiece("O");
        console.log(`Piece in play is now ${playerPiece}`);
      } else {
        setPlayerPiece("X");
      }

      if (playerID === 1) {
        setPlayerID(2);
      } else {
        setPlayerID(1);
      }
    }
  }

  function checkForWinCondition() {
    // only eight possible win conditions, so hard-code all eight.
    //  alternatively, a breadth-first search would be a scalable solution.
    /*
     * How the board is internally stored:
     *       -----------------------------------------------------------
     *       -                  -                  -                   -
     *       - boardState[0][0] - boardState[0][1] - boardstate[0][2]  -
     *       -                  -                  -                   -
     *       -----------------------------------------------------------
     *       -                  -                  -                   -
     *       - boardState[1][0] - boardState[1][1] - boardstate[1][2]  -
     *       -                  -                  -                   -
     *       -----------------------------------------------------------
     *       -                  -                  -                   -
     *       - boardState[2][0] - boardState[2][1] - boardstate[2][2]  -
     *       -                  -                  -                   -
     *       -----------------------------------------------------------
     */

    // check rows
    if (
      boardState[0][0] === playerPiece &&
      boardState[0][1] === playerPiece &&
      boardState[0][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
    if (
      boardState[1][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[1][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
    if (
      boardState[2][0] === playerPiece &&
      boardState[2][1] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }

    // check columns
    if (
      boardState[0][0] === playerPiece &&
      boardState[1][0] === playerPiece &&
      boardState[2][0] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
    if (
      boardState[0][1] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[2][1] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
    if (
      boardState[0][2] === playerPiece &&
      boardState[1][2] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }

    // check diagonals
    if (
      boardState[0][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
    if (
      boardState[2][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[0][2] === playerPiece
    ) {
      declareWinner(playerPiece);
    }
  }

  function declareWinner() {
    setGameOver(true);
    setWinnnerID(playerID);
    setWinnerPiece(playerPiece);
  }

  return (
    <div className="gameArea">
      <GameDescription
        playerID={playerID}
        playerPiece={playerPiece}
        winnerID={winnerID}
        winnerPiece={winnerPiece}
        isGameOver={isGameOver}
      />
      <GameBoard
        playerPiece={playerPiece}
        isGameOver={isGameOver}
        recordBoardState={recordBoardState}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
    </div>
  );
}

function HistoryButton({ boardState, returnToOldBoardState }) {
  return (
    <div>
      <button onClick={returnToOldBoardState}>Go back to game beginning</button>
    </div>
  );
}

function GameHistory({ boardState, returnToOldBoardState }) {
  return (
    <div className="historyArea">
      <HistoryButton
        boardState={boardState}
        returnToOldBoardState={returnToOldBoardState}
      />
    </div>
  );
}

export default function App() {
  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function recordBoardState(changedRowID, changedSquareID, playerPiece) {
    const boardCopy = [...boardState];
    boardCopy[changedRowID][changedSquareID] = playerPiece;
    setBoardState(boardCopy);
  }

  function returnToOldBoardState(boardState) {}

  return (
    <div className="appLayout">
      <GameArea boardState={boardState} recordBoardState={recordBoardState} />
      <GameHistory
        boardState={boardState}
        returnToOldBoardState={returnToOldBoardState}
      />
    </div>
  );
}
