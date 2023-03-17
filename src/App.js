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
  isRewinding,
  columnToRewind,
  rowToRewind,
  rewindOneTurn,
}) {
  const [text, setText] = useState("");

  console.log(`Rendering square (${rowID}, ${squareID})...`);
  console.log(`\tisRewinding:\t${isRewinding}`);
  console.log(`\trowToRewind:\t${rowToRewind}`);
  console.log(`\tcolumnToRewind:\t${columnToRewind}`);

  function handleClick(e) {
    // place a piece
    if (!isGameOver && text === "" && !isRewinding) {
      setText(playerPiece);
      advanceGameState(rowID, squareID, playerPiece);
      checkForWinCondition();
      transferPlacementPriority();
    }
  }

  if (isRewinding && rowID === rowToRewind && squareID === columnToRewind) {
    return (
      <div className="game-square" onClick={handleClick}>
        <div className="game-square-text-fading">{text}</div>
      </div>
    );
  } else {
    return (
      <div className="game-square" onClick={handleClick}>
        <div className="game-square-text">{text}</div>
      </div>
    );
  }
}

function GameRow({
  playerPiece,
  rowID,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
  isRewinding,
  rowToRewind,
  columnToRewind,
  rewindOneTurn,
}) {
  return (
    <div className="game-row">
      <GameSquare
        playerPiece={playerPiece}
        squareID={0}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
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
  isRewinding,
  rowToRewind,
  columnToRewind,
  rewindOneTurn,
}) {
  return (
    <div className="game-board">
      <GameRow
        playerPiece={playerPiece}
        rowID={0}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={1}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={2}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
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

function GameArea({
  boardState,
  advanceGameState,
  isRewinding,
  rowToRewind,
  columnToRewind,
  rewindOneTurn,
}) {
  const [playerPiece, setPlayerPiece] = useState("X");
  const [playerID, setPlayerID] = useState(1);
  const [winnerPiece, setWinnerPiece] = useState("");
  const [winnerID, setWinnnerID] = useState("");
  const [isGameOver, setGameOver] = useState(false);

  function transferPlacementPriority() {
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
    <div className="game-area">
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
        isRewinding={isRewinding}
        rowToRewind={rowToRewind}
        columnToRewind={columnToRewind}
        rewindOneTurn={rewindOneTurn}
      />
    </div>
  );
}

function GameHistory({ oldBoards, handleHistoryButtonClick }) {
  const buttonList = oldBoards.map((boardState, turnNumber) => {
    if (turnNumber === 0) {
      return (
        <button
          className="history-button"
          key={turnNumber}
          onClick={() => handleHistoryButtonClick(turnNumber)}
        >
          Go to game beginning
        </button>
      );
    } else {
      return (
        <button
          className="history-button"
          key={turnNumber}
          onClick={() => handleHistoryButtonClick(turnNumber)}
        >
          Go to turn #{turnNumber}
        </button>
      );
    }
  });

  return <div className="history-area">{buttonList}</div>;
}

export default function App() {
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

  const [isRewinding, setIsRewinding] = useState(false);
  const [rowHistory, setRowHistory] = useState([-1]);
  const [columnHistory, setColumnHistory] = useState([-1]);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const [oldTurnNumber, setOldTurnNumber] = useState(-1);

  function rewindOneTurn() {
    if (isRewinding) {
      if (currentTurnNumber !== oldTurnNumber) {
        console.log(`Reverting, piece by piece, to turn #${oldTurnNumber}...`);
        console.log(`\tcurrentTurn:\t${currentTurnNumber}`);
        console.log(`\tpiecesToRemove:\t${currentTurnNumber - oldTurnNumber}`);
        console.log(oldBoards);

        console.log(rowHistory);
        console.log(columnHistory);
        console.log(
          `Removing turn #${currentTurnNumber}'s piece: "${
            oldBoards[currentTurnNumber][rowHistory[currentTurnNumber]][
              columnHistory[currentTurnNumber]
            ]
          }" @ square (${rowHistory[currentTurnNumber]}, ${
            columnHistory[currentTurnNumber]
          })...`
        );
        console.log(
          `Sending the rewind signal to square (${
            rowHistory[rowHistory.length - 1]
          }, ${columnHistory[columnHistory.length - 1]})!`
        );

        const nextRowHistory = rowHistory.slice(0, -1);
        setRowHistory(nextRowHistory);
        const nextColumnHistory = columnHistory.slice(0, -1);
        setColumnHistory(nextColumnHistory);

        setCurrentTurnNumber(currentTurnNumber - 1);
      } else {
        setIsRewinding(false);
      }
    }
  }

  function addToSquareHistory(changedRowID, changedSquareID) {
    setRowHistory([...rowHistory, changedRowID]);
    setColumnHistory([...columnHistory, changedSquareID]);

    console.log("rowHistory:");
    console.log(rowHistory);
    console.log("columnHistory:");
    console.log(columnHistory);

    console.log(
      `lastChangedSquare:\t(${rowHistory[rowHistory.length - 1]}, ${
        columnHistory[columnHistory.length - 1]
      })`
    );
  }

  function addToBoardHistory() {
    const boardStateDeepCopy = JSON.parse(JSON.stringify(boardState));
    setOldBoards([...oldBoards, boardStateDeepCopy]);
  }

  function advanceGameState(changedRowID, changedSquareID, playerPiece) {
    setCurrentTurnNumber(currentTurnNumber + 1);
    recordBoardState(changedRowID, changedSquareID, playerPiece);
  }

  function recordBoardState(changedRowID, changedSquareID, playerPiece) {
    const boardCopy = [...boardState];
    boardCopy[changedRowID][changedSquareID] = playerPiece;
    setBoardState(boardCopy);
    addToBoardHistory();
    addToSquareHistory(changedRowID, changedSquareID);
  }

  function handleHistoryButtonClick(turnNumberToReturnTo) {
    console.log(
      `Button clicked:\n\tReverting to turn #${turnNumberToReturnTo}...`
    );
    setIsRewinding(true);
    setOldTurnNumber(turnNumberToReturnTo);
  }

  return (
    <div className="app-layout">
      <GameArea
        boardState={boardState}
        advanceGameState={advanceGameState}
        isRewinding={isRewinding}
        rowToRewind={rowHistory[rowHistory.length - 1]}
        columnToRewind={columnHistory[columnHistory.length - 1]}
        rewindOneTurn={rewindOneTurn}
      />
      <GameHistory
        oldBoards={oldBoards}
        handleHistoryButtonClick={handleHistoryButtonClick}
      />
    </div>
  );
}
