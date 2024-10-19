import * as React from "react";
import Countdown from "react-countdown";
import "react-simple-keyboard/build/css/index.css";
import { Clue, ClueError, CluesList } from "./CluesList";
import { ModalTypes, Result } from "./enums";
import Modal from "react-modal";
import { ModalContent } from "./ModalContent";
import { Stars } from "./Stars";
import { CustomKeyboard } from "./CustomKeyboard";

export const GAME_TITLE = "ACRONYX";

export interface GameData {
  gameDate: Date;
  isGameOver: boolean;
  gameOverReason: Result;
  currentScore: number;
  guessedLetters: string[];
  removedLetters: string;
  //hintsLeft: number;
}

const InitialGameData: GameData = {
  gameDate: new Date(new Date().setHours(0, 0, 0, 0)),
  isGameOver: false,
  gameOverReason: Result.None,
  currentScore: 3,
  guessedLetters: [],
  removedLetters: "",
  //hintsLeft: 2
};

export interface PlayerData {
  games: GameData[];
  totalScore: number;
}

const InitialPlayerData: PlayerData = {
  games: [],
  totalScore: 0,
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getTodaysClue = (): Clue => {
  const today = new Date();

  const todaysClue = CluesList.find((clue) => {
    return (
      new Date(today.setHours(0, 0, 0, 0)).getTime() === clue.clueDate.getTime()
    );
  });

  return todaysClue ?? ClueError;
};

export function Game() {
  const ClueOfTheDay = getTodaysClue();

  const clue = ClueOfTheDay.clue;
  const solutionLetter = ClueOfTheDay.solutionLetter;
  const solutionWord = ClueOfTheDay.solutionWord;
  const solutionExplanation = ClueOfTheDay.solutionExplanation;

  Modal.setAppElement("body");

  const [input, setInput] = React.useState<string>("");
  const [showGameOverDisplay, setShowGameOverDisplay] =
    React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalTypes | undefined>(
    undefined
  );
  const [playerData, setPlayerData] =
    React.useState<PlayerData>({...InitialPlayerData});
  const [gameData, setGameData] = React.useState<GameData>({...InitialGameData});

  const gameOver = React.useCallback(
    (result: Result, data: GameData) => {
      switch (result) {
        case Result.Win:
          window.alert(
            "Correct! " +
              input.toUpperCase() +
              " for " +
              solutionWord +
              ". These letters represent " +
              solutionExplanation +
              "."
          );
          break;
        case Result.Lose:
          window.alert(
            "Game over! The correct answer is " +
              solutionLetter +
              ". These letters represent " +
              solutionExplanation +
              "."
          );
          break;
        default:
          break;
      }

      const updatedGameData = {...data, isGameOver: true, gameOverReason: result};
      const updatedPlayerData = {...playerData, totalScore: playerData.totalScore + data.currentScore};

      updateLocalStorage(updatedPlayerData, updatedGameData);
      setInput(solutionLetter.toUpperCase());
      setShowGameOverDisplay(true);
    },
    [input, solutionExplanation, solutionLetter, solutionWord, playerData]
  );

  React.useEffect(() => {
    const textContainer = document.getElementById("wave-container");

    if (!textContainer?.textContent && !textContainer?.childNodes.length) {
      clue.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("wave-text");
        span.style.animationDelay = `${index * 50}ms`;
        textContainer!.appendChild(span);
      });
    }
  }, [clue]);

  // Get/initialize local storage
  React.useEffect(() => {
    let localStorageData = localStorage.getItem(GAME_TITLE);

    if (localStorageData) {
      const data = JSON.parse(localStorageData) as PlayerData;

      const currentGame = data.games.find((game: GameData) => {
        return game.gameDate ? new Date(game.gameDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) : false;
      }) ?? {...InitialGameData};

      setPlayerData(data);
      setGameData(currentGame);

      if (currentGame.isGameOver) {
        setInput(solutionLetter.toUpperCase());
        setShowGameOverDisplay(true);
      }
    } else {
      localStorage.setItem(GAME_TITLE, JSON.stringify(InitialPlayerData));
    }
  }, [solutionLetter]);

  // Update local storage
  const updateLocalStorage = (updatedPlayerData: PlayerData, updatedGameData: GameData) => {
    let gamesPlayed: GameData[] = [...updatedPlayerData.games];
    
    if(updatedPlayerData.games.length === 0 || (updatedPlayerData.games.length > 0 && updatedPlayerData.games[updatedPlayerData.games.length - 1].gameDate !== updatedGameData.gameDate)) {      
      gamesPlayed.push(updatedGameData);
    }
    else if(updatedPlayerData.games[updatedPlayerData.games.length - 1].gameDate === updatedGameData.gameDate) {
      gamesPlayed[updatedPlayerData.games.length - 1] = updatedGameData;
    }
    
    let updatedLocalStorageData = { ...updatedPlayerData, games: gamesPlayed };

    setGameData(updatedGameData);
    setPlayerData(updatedLocalStorageData);

    localStorage.setItem(GAME_TITLE, JSON.stringify(updatedLocalStorageData));
  };

  const updatedRemovedLetters = (letter: string): string => {
    return (
      gameData.removedLetters +
      " " +
      letter.toUpperCase() +
      " " +
      letter.toLowerCase()
    );
  };

  const openModal = (modalType: ModalTypes) => {
    setShowModal(true);
    setModalType(modalType);
  };

  const makeGuess = () => {
    if (input.toUpperCase() === solutionLetter.toUpperCase()) {
      gameOver(Result.Win, gameData);
    } else {
      let updatedData: GameData = {
        ...gameData,
        guessedLetters: [...gameData.guessedLetters, input.toUpperCase()],
        removedLetters: updatedRemovedLetters(input),
        currentScore: gameData.currentScore - 1,
      };

      if (gameData.currentScore === 1) {
        gameOver(Result.Lose, updatedData);
      } else {
        setInput("");
        updateLocalStorage(playerData, updatedData);
        window.alert("Incorrect! Not " + input.toUpperCase() + ". Try again.");
      }
    }
  };

  return (
    <div>
      <div className="header">
        {GAME_TITLE}
        <div
          className="help"
          onClick={() => {
            openModal(ModalTypes.Help);
          }}
        >
          ?
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel={modalType ?? undefined}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            inset: "30px",
          },
        }}
      >
        <ModalContent
          modalType={modalType}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      </Modal>
      <div className="flex-container">
        <div className="board">
          <span id="wave-container" className="clue"></span>
          <input value={input.toUpperCase()} readOnly />
          {showGameOverDisplay && (
            <span className="solution-description">
              {capitalizeFirstLetter(solutionExplanation)}
            </span>
          )}
        </div>
        {showGameOverDisplay ? (
          <>
            <div className="game-over">
              <div className="game-over-score">
                <span className="your-score">Your score:</span>
                <Stars gameData={gameData} showGameOverDisplay={showGameOverDisplay} />
              </div>
            </div>
            <Countdown
              date={new Date().setHours(24, 0, 0, 0)}
              renderer={({ formatted }) => {
                return (
                  <div className="countdown">
                    Next clue in:
                    <span className="time">
                      {" " +
                        formatted.hours +
                        ":" +
                        formatted.minutes +
                        ":" +
                        formatted.seconds}
                    </span>
                  </div>
                );
              }}
            />
          </>
        ) : (
          <>
            <div className="flex-container-2">
              <div className="buttonBar">
                {/* <button
                  className={"hint" + (playerData.hintsLeft === 0 ? " disabled" : "")}
                  onClick={() => { updatePlayerData({...playerData, hintsLeft: playerData.hintsLeft - 1}); }}
                  disabled={playerData.hintsLeft === 0}
                >
                  Hint
                </button> */}
                <button
                  className={"submit" + (input.length === 0 ? " disabled" : "")}
                  onClick={makeGuess}
                  disabled={input.length === 0}
                >
                  Guess
                </button>
              </div>
              {/* <div style={{ fontSize: '14px' }}>{'Hints remaining: ' + playerData.hintsLeft}</div> */}
              <div><Stars gameData={gameData} showGameOverDisplay={showGameOverDisplay} /></div>
            </div>
            <div className="keyboard">
              <CustomKeyboard gameData={gameData} setInput={setInput} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
