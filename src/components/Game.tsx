import * as React from "react";
import Countdown from "react-countdown";
import "react-simple-keyboard/build/css/index.css";
import { Clue, ClueError, CluesList } from "./clues";
import { ModalTypes, Result } from "./enums";
import Modal from "react-modal";
import { ModalContent } from "./ModalContent";
import { Stars } from "./Stars";
import { CustomKeyboard } from "./CustomKeyboard";

export const GAME_TITLE = "ACRONYMS";

export interface PlayerData {
  isGameOver: boolean;
  gameOverReason: Result;
  totalScore: number;
  currentScore: number;
  //hintsLeft: number;
  guessedLetters: string[];
  removedLetters: string;
  lastPlayed: Date;
}

const InitialPlayerData: PlayerData = {
  isGameOver: false,
  gameOverReason: Result.None,
  totalScore: 0,
  currentScore: 3,
  //hintsLeft: 2,
  guessedLetters: [],
  removedLetters: "",
  lastPlayed: new Date(),
};

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
  const solutionExplanationDescription = ClueOfTheDay.solutionExplanationDescription;

  Modal.setAppElement("body");

  const [input, setInput] = React.useState<string>("");
  const [showGameOverDisplay, setShowGameOverDisplay] =
    React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalTypes | undefined>(
    undefined
  );
  const [playerData, setPlayerData] =
    React.useState<PlayerData>(InitialPlayerData);

  const gameOver = React.useCallback(
    (result: Result, data: PlayerData) => {
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

      updatePlayerData({
        ...data,
        totalScore: data.totalScore + data.currentScore,
        isGameOver: true,
        gameOverReason: result,
      });
      setInput(solutionLetter.toUpperCase());
      setShowGameOverDisplay(true);
    },
    [input, solutionExplanation, solutionLetter, solutionWord]
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
    let playerData = localStorage.getItem(GAME_TITLE);

    if (playerData) {
      const data = JSON.parse(playerData) as PlayerData;

      updatePlayerData(data);

      if (data.isGameOver) {
        setInput(solutionLetter.toUpperCase());
        setShowGameOverDisplay(true);
      }
    } else {
      localStorage.setItem(GAME_TITLE, JSON.stringify(InitialPlayerData));
    }
  }, [solutionLetter]);

  // Update local storage
  const updatePlayerData = (data: PlayerData) => {
    let updatedData = { ...data, lastPlayed: new Date() };

    setPlayerData(updatedData);
    localStorage.setItem(GAME_TITLE, JSON.stringify(updatedData));
  };

  const updatedRemovedLetters = (letter: string): string => {
    return (
      playerData.removedLetters +
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
      gameOver(Result.Win, playerData);
    } else {
      let updatedData: PlayerData = {
        ...playerData,
        guessedLetters: [...playerData.guessedLetters, input.toUpperCase()],
        removedLetters: updatedRemovedLetters(input),
        currentScore: playerData.currentScore - 1,
      };

      if (playerData.currentScore === 1) {
        gameOver(Result.Lose, updatedData);
      } else {
        setInput("");
        updatePlayerData(updatedData);
        window.alert("Incorrect! Not " + input.toUpperCase() + ". Try again.");
      }
    }
  };

  console.log("test - rendering game");

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
              {solutionExplanationDescription}
            </span>
          )}
        </div>
        {showGameOverDisplay ? (
          <>
            <div className="game-over">
              <div className="game-over-score">
                <span className="your-score">Your score:</span>
                <Stars playerData={playerData} showGameOverDisplay={showGameOverDisplay} />
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
              <div><Stars playerData={playerData} showGameOverDisplay={showGameOverDisplay} /></div>
            </div>
            <div className="keyboard">
              <CustomKeyboard playerData={playerData} setInput={setInput} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
