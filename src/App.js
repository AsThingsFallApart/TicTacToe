import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";
import { useState } from "react";
import "./App.css";

function GameSquare({
  playerPiece,
  squareID,
  rowID,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
}) {
  const [text, setText] = useState("");

  function handleClick(e) {
    // place a piece
    if (!isGameOver) {
      setText(playerPiece);
      advanceGameState(rowID, squareID, playerPiece);
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
  advanceGameState,
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
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
    </div>
  );
}

function GameBoard({
  playerPiece,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
}) {
  return (
    <div className="gameBoard">
      <GameRow
        playerPiece={playerPiece}
        rowID={0}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={1}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={2}
        advanceGameState={advanceGameState}
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

function GameArea({ boardState, advanceGameState }) {
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
        advanceGameState={advanceGameState}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
      />
    </div>
  );
}

function GameHistory({ oldBoards, returnToOldBoardState }) {
  const buttonList = oldBoards.map((boardState, turnNumber) => {
    if (turnNumber === 0) {
      return (
        <button
          key={turnNumber}
          onClick={() => returnToOldBoardState(boardState)}
        >
          Go to game beginning
        </button>
      );
    } else {
      return (
        <button
          key={turnNumber}
          onClick={() => returnToOldBoardState(boardState)}
        >
          Go to turn #{turnNumber}
        </button>
      );
    }
  });

  return <div className="historyArea">{buttonList}</div>;
}

export default function App() {
  const [turnNumber, setTurnNumber] = useState(0);
  const [boardState, setBoardState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [oldBoards, setOldBoards] = useState([
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ]);

  function addToHistory() {
    const boardStateDeepCopy = JSON.parse(JSON.stringify(boardState));
    setOldBoards([...oldBoards, boardStateDeepCopy]);
  }

  function advanceGameState(changedRowID, changedSquareID, playerPiece) {
    setTurnNumber(turnNumber + 1);
    recordBoardState(changedRowID, changedSquareID, playerPiece);
  }

  function recordBoardState(changedRowID, changedSquareID, playerPiece) {
    const boardCopy = [...boardState];
    boardCopy[changedRowID][changedSquareID] = playerPiece;
    setBoardState(boardCopy);
    addToHistory();
  }

  function returnToOldBoardState(boardState) {
    console.log(`Going to...`);
    console.log(boardState);
  }

  return (
    <div className="appLayout">
      <GameArea boardState={boardState} advanceGameState={advanceGameState} />
      <GameHistory
        turnNumber={turnNumber}
        oldBoards={oldBoards}
        returnToOldBoardState={returnToOldBoardState}
      />
    </div>
  );
}
