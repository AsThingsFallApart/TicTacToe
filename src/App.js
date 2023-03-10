import { useState } from "react";
import "./App.css";

function GameSquare({
  playerPiece,
  squareID,
  rowID,
  recordBoardState,
  isGameOver,
}) {
  const [text, setText] = useState("");

  function handlePiecePlacement(event) {
    console.log("first");
    if (!isGameOver) {
      const clickedBox = event.target;

      if (clickedBox.textContent === "") {
        clickedBox.textContent = playerPiece;
      }

      setText(clickedBox.textContent);
      recordBoardState(rowID, squareID, playerPiece);
    }
  }

  return (
    <div className="gameSquare" onClick={handlePiecePlacement}>
      {text}
    </div>
  );
}

function GameRow({ playerPiece, rowID, recordBoardState, isGameOver }) {
  return (
    <div className="gameRow">
      <GameSquare
        playerPiece={playerPiece}
        squareID={0}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={1}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
      <GameSquare
        playerPiece={playerPiece}
        squareID={2}
        rowID={rowID}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
    </div>
  );
}

function GameBoard({
  playerPiece,
  transferPlacementPriority,
  recordBoardState,
  isGameOver,
  checkForWinCondition,
}) {
  function handlePlayerEndturn() {
    console.log("second...?");
    console.log(`Player with ${playerPiece} piece's turn has ended...`);

    checkForWinCondition();
    transferPlacementPriority();
  }

  return (
    <div className="gameBoard" onClick={handlePlayerEndturn}>
      <GameRow
        playerPiece={playerPiece}
        rowID={0}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={1}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
      <GameRow
        playerPiece={playerPiece}
        rowID={2}
        recordBoardState={recordBoardState}
        isGameOver={isGameOver}
      />
    </div>
  );
}

function GameDescription({ playerID, playerPiece, isGameOver }) {
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
        <p>Player {playerID} wins!</p>
      </div>
    );
  }
}

function GameArea({
  isGameOver,
  boardState,
  recordBoardState,
  handleThreeInARow,
}) {
  const [playerPiece, setPlayerPiece] = useState("X");
  const [playerID, setPlayerID] = useState(1);

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
      handleThreeInARow(playerPiece);
    }
    if (
      boardState[1][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[1][2] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }
    if (
      boardState[2][0] === playerPiece &&
      boardState[2][1] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }

    // check columns
    if (
      boardState[0][0] === playerPiece &&
      boardState[1][0] === playerPiece &&
      boardState[2][0] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }
    if (
      boardState[0][1] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[2][1] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }
    if (
      boardState[0][2] === playerPiece &&
      boardState[1][2] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }

    // check diagonals
    if (
      boardState[0][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[2][2] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }
    if (
      boardState[2][0] === playerPiece &&
      boardState[1][1] === playerPiece &&
      boardState[0][2] === playerPiece
    ) {
      handleThreeInARow(playerPiece);
    }
  }

  return (
    <div className="gameArea">
      <GameDescription
        playerID={playerID}
        playerPiece={playerPiece}
        isGameOver={isGameOver}
      />
      <GameBoard
        playerPiece={playerPiece}
        transferPlacementPriority={transferPlacementPriority}
        isGameOver={isGameOver}
        recordBoardState={recordBoardState}
        checkForWinCondition={checkForWinCondition}
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
  const [isGameOver, setGameOver] = useState(false);
  // represent the board as a string of length 8.
  //  Index 0 = top left square, index 1 = top middle square, and so forth...
  //  Char '0' represents empty space, '1' represents 'X', '2' represents 'O'.
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

  function handleThreeInARow(winningPiece) {
    setGameOver(true);
  }

  return (
    <div className="appLayout">
      <GameArea
        isGameOver={isGameOver}
        boardState={boardState}
        recordBoardState={recordBoardState}
        handleThreeInARow={handleThreeInARow}
      />
      <GameHistory
        boardState={boardState}
        returnToOldBoardState={returnToOldBoardState}
      />
    </div>
  );
}
