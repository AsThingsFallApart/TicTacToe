import { useState } from "react";
import "./App.css";

function GameSquare({
  boardPiece,
  playerPiece,
  squareID,
  rowID,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
  transitionSequenceSquare,
}) {
  console.log(`Rendering square (${rowID}, ${squareID})...`);
  console.log(`\tboardPiece:\t${boardPiece}`);

  function handleClick(e) {
    // place a piece
    if (!isGameOver) {
      transitionSequenceSquare.transitionDuration = 0;
      advanceGameState(rowID, squareID, playerPiece);
      checkForWinCondition();
      transferPlacementPriority();
      // calcTransitionSequence();
    }
  }

  if (transitionSequenceSquare.transitionDuration > 0) {
    return (
      <div className="game-square" onClick={handleClick}>
        <div
          className="game-square-text-fading"
          style={{
            animationDuration:
              transitionSequenceSquare.transitionDuration + "ms",
            animationDelay: transitionSequenceSquare.transitionDelay + "ms",
          }}
        >
          {transitionSequenceSquare.boardPiece}
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-square" onClick={handleClick}>
        <div className="game-square-text">{boardPiece}</div>
      </div>
    );
  }
}

function GameRow({
  boardRow,
  playerPiece,
  rowID,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
  transitionSequenceRow,
}) {
  return (
    <div className="game-row">
      <GameSquare
        boardPiece={boardRow[0]}
        playerPiece={playerPiece}
        squareID={0}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceSquare={transitionSequenceRow[0]}
      />
      <GameSquare
        boardPiece={boardRow[1]}
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceSquare={transitionSequenceRow[1]}
      />
      <GameSquare
        boardPiece={boardRow[2]}
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceSquare={transitionSequenceRow[2]}
      />
    </div>
  );
}

function GameBoard({
  boardState,
  playerPiece,
  advanceGameState,
  isGameOver,
  checkForWinCondition,
  transferPlacementPriority,
  transitionSequence,
}) {
  return (
    <div className="game-board">
      <GameRow
        boardRow={boardState[0]}
        playerPiece={playerPiece}
        rowID={0}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceRow={transitionSequence[0]}
      />
      <GameRow
        boardRow={boardState[1]}
        playerPiece={playerPiece}
        rowID={1}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceRow={transitionSequence[1]}
      />
      <GameRow
        boardRow={boardState[2]}
        playerPiece={playerPiece}
        rowID={2}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequenceRow={transitionSequence[2]}
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
  isGameOver,
  setIsGameOver,
  transitionSequence,
  playerPiece,
  playerID,
  setPlayerPiece,
  setPlayerID,
}) {
  const [winnerPiece, setWinnerPiece] = useState("");
  const [winnerID, setWinnnerID] = useState("");

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
    setIsGameOver(true);
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
        boardState={boardState}
        playerPiece={playerPiece}
        isGameOver={isGameOver}
        advanceGameState={advanceGameState}
        checkForWinCondition={checkForWinCondition}
        transferPlacementPriority={transferPlacementPriority}
        transitionSequence={transitionSequence}
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

  const [rowHistory, setRowHistory] = useState([-1]);
  const [columnHistory, setColumnHistory] = useState([-1]);
  const [currentTurnNumber, setCurrentTurnNumber] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [transitionSequence, setTransitionSequence] = useState([
    [
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
    ],
    [
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
    ],
    [
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
      { boardPiece: "", transitionDuration: 0, transitionDelay: 0 },
    ],
  ]);
  const [playerPiece, setPlayerPiece] = useState("X");
  const [playerID, setPlayerID] = useState(1);

  function updateChangedSquareHistory(turnNumberToReturnTo) {
    const rowChangesBeforeTurn = rowHistory.slice(0, turnNumberToReturnTo + 1);
    const columnChangesBeforeTurn = columnHistory.slice(
      0,
      turnNumberToReturnTo + 1
    );
    setRowHistory(rowChangesBeforeTurn);
    setColumnHistory(columnChangesBeforeTurn);
  }

  function calcTransitionSequence(turnNumberToReturnTo) {
    console.log(rowHistory);
    console.log(columnHistory);

    const mostRecentRowChanges = rowHistory.slice(
      turnNumberToReturnTo + 1,
      rowHistory.length
    );
    mostRecentRowChanges.reverse();
    const mostRecentColumnChanges = columnHistory.slice(
      turnNumberToReturnTo + 1,
      columnHistory.length
    );
    mostRecentColumnChanges.reverse();

    console.log("changed squares from most recent to oldest:");
    for (let i = 0; i < mostRecentColumnChanges.length; i++) {
      if (mostRecentColumnChanges[i] === -1) {
        console.log(
          `${i}:\t(${mostRecentRowChanges[i]}, ${mostRecentColumnChanges[i]})`
        );
      } else {
        console.log(
          `${i}:\t(${mostRecentRowChanges[i]}, ${
            mostRecentColumnChanges[i]
          })\t("${
            boardState[mostRecentRowChanges[i]][mostRecentColumnChanges[i]]
          }")`
        );
      }
    }

    const transitionDuration = 1000 / mostRecentRowChanges.length;
    console.log(`transitionDuration:\t${transitionDuration}`);
    let transitionSequenceCopy = [...transitionSequence];
    console.log(transitionSequenceCopy);

    for (let i = 0; i < mostRecentRowChanges.length; i++) {
      for (let j = 0; j < mostRecentColumnChanges.length; j++) {
        transitionSequenceCopy[mostRecentRowChanges[i]][
          mostRecentColumnChanges[j]
        ].boardPiece =
          boardState[mostRecentRowChanges[i]][mostRecentColumnChanges[j]];
        transitionSequenceCopy[mostRecentRowChanges[i]][
          mostRecentColumnChanges[j]
        ].transitionDuration = transitionDuration;
        transitionSequenceCopy[mostRecentRowChanges[i]][
          mostRecentColumnChanges[j]
        ].transitionDelay = i * transitionDuration;
      }
    }

    console.log(transitionSequence);

    setTransitionSequence(transitionSequenceCopy);
  }

  function handleHistoryButtonClick(turnNumberToReturnTo) {
    console.log(
      `Button clicked:\n\tReverting to turn #${turnNumberToReturnTo}...`
    );

    calcTransitionSequence(turnNumberToReturnTo);

    const nextBoardState = oldBoards[turnNumberToReturnTo];
    setBoardState(nextBoardState);
    // forget moves that are after old turn
    const nextTimeline = JSON.parse(
      JSON.stringify(oldBoards.slice(0, turnNumberToReturnTo + 1))
    );
    console.log("nextTimeline:");
    console.log(nextTimeline);
    setOldBoards(nextTimeline);

    setIsGameOver(false);

    updateChangedSquareHistory(turnNumberToReturnTo);
    setCurrentTurnNumber(turnNumberToReturnTo);

    if (turnNumberToReturnTo % 2 === 0) {
      setPlayerPiece("X");
      setPlayerID(1);
    } else {
      setPlayerPiece("O");
      setPlayerID(2);
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

  return (
    <div className="app-layout">
      <GameArea
        boardState={boardState}
        advanceGameState={advanceGameState}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        transitionSequence={transitionSequence}
        calcTransitionSequence={calcTransitionSequence}
        playerPiece={playerPiece}
        playerID={playerID}
        setPlayerPiece={setPlayerPiece}
        setPlayerID={setPlayerID}
      />
      <GameHistory
        oldBoards={oldBoards}
        handleHistoryButtonClick={handleHistoryButtonClick}
      />
    </div>
  );
}
