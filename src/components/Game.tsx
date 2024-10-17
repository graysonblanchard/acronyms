import * as React from "react";
import Countdown from "react-countdown";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { CluesList } from "./clues";
import { ModalTypes, Result } from "./enums";
import Modal from 'react-modal';
import { ModalContent } from "./ModalContent";

interface PlayerData {
  isGameOver: boolean;
  gameOverReason: Result;
  score: number;
  guessesLeft: number;
  hintsLeft: number;
  guessedLetters: string[];
  removedLetters: string;
}

const InitialPlayerData: PlayerData = {
  isGameOver: false,
  gameOverReason: Result.None,
  score: 0,
  guessesLeft: 3,
  hintsLeft: 2,
  guessedLetters: [],
  removedLetters: ""
}

export function Game() {
  const clue = CluesList[0].clue;
  const solutionLetter = CluesList[0].solutionLetter;
  const solutionWord = CluesList[0].solutionWord;
  const solutionExplanation = CluesList[0].solutionExplanation;
  const solutionExplanationDescription = CluesList[0].solutionExplanationDescription;

  const [input, setInput] = React.useState<string>("");
  const [showGameOverDisplay, setShowGameOverDisplay] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalTypes | undefined>(undefined);
  const [playerData, setPlayerData] = React.useState<PlayerData>(InitialPlayerData);
  // also create function to update player data as a whole

  Modal.setAppElement('body');

  // TO DO:
  //
  // Opening animation?
  // Game over animation?

  const gameOver = React.useCallback((result: Result) => {
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

    updatePlayerData({...playerData, isGameOver: true, gameOverReason: result });
    setInput(solutionLetter.toUpperCase());
    setShowGameOverDisplay(true);
  }, [input, solutionExplanation, solutionLetter, solutionWord, playerData]);

  // Get/init local storage
  React.useEffect(() => {
    let playerData = localStorage.getItem('acronyx');

    if (playerData) {
      const data = JSON.parse(playerData) as PlayerData;

      updatePlayerData(data);

      if (data.isGameOver) {
        setInput(solutionLetter.toUpperCase());
        setShowGameOverDisplay(true);
      }
    } else {
      localStorage.setItem('acronyx', JSON.stringify(InitialPlayerData));
    }
  }, [solutionLetter]);

  // Update local storage
  const updatePlayerData = (data: PlayerData) => {
    setPlayerData(data);
    localStorage.setItem('acronyx', JSON.stringify(data));
  }

  const updatedRemovedLetters = (letter: string): string => {
    return playerData.removedLetters + " " + letter.toUpperCase() + " " + letter.toLowerCase();
  };

  const openModal = (modalType: ModalTypes) => {
    setShowModal(true);
    setModalType(modalType);
  }

  const getStars = () => {
    let stars = [];

    for (let i = 1; i <= playerData.guessesLeft; i++) {
      stars.push(
        <svg
          key={i}
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1.5em"
          width="1.5em"
        >
          <path
            fill="gold"
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"
          />
        </svg>
      );
    }

    for (let i = 1; i <= 3 - playerData.guessesLeft; i++) {
      stars.push(
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1.5em"
          width="1.5em"
        >
          <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
        </svg>
      );
    }
    return (
      <div className={showGameOverDisplay ? 'stars-game-over' : 'stars'}>
        {stars.map((star, i) => {
          return <div style={{ display:'flex' }} key={"star-" + i}>{star}</div>;
        })}
      </div>
    );
  };

  const makeGuess = () => {
    if (input.toUpperCase() === solutionLetter.toUpperCase()) {
      gameOver(Result.Win);
    } else {
      updatePlayerData({
        ...playerData,
        guessedLetters: [...playerData.guessedLetters, input.toUpperCase()],
        removedLetters: updatedRemovedLetters(input),
        guessesLeft: playerData.guessesLeft - 1
      });

      setInput("");

      if (playerData.guessesLeft === 1) {
        gameOver(Result.Lose);
      } else {
        window.alert("Incorrect! Not " + input.toUpperCase() + ". Try again.");
      }
    }
  };

  return (
    <div>
      <div className="header">
        {'ACRONYX'}
        <div className="help" onClick={() => { openModal(ModalTypes.Help); }}>?</div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel={modalType ?? undefined}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            inset: '30px',
          }
        }}
      >
        <ModalContent modalType={modalType} closeModal={() => { setShowModal(false); }}/>
      </Modal>
      <div className="flex-container">
        <div className="board">
          <span className="clue">{clue}</span>
          <input value={input.toUpperCase()} readOnly />
          {showGameOverDisplay &&
            <span className="solution-description">{solutionExplanationDescription}</span>
          }
        </div>
        {showGameOverDisplay
          ? <>
              <div className="game-over">
                <div className="game-over-score"><span className="your-score">Your score:</span>{getStars()}</div>
              </div>
              <Countdown
                date={new Date().setHours(24, 0, 0, 0)} 
                renderer={({ formatted }) => {
                  return <div className="countdown">Next clue in:<span className="time">{' ' + formatted.hours + ':' + formatted.minutes + ':' + formatted.seconds}</span></div>;
                }} 
              />
            </>
          : (
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
              <div>{getStars()}</div>
            </div>
            <div className="keyboard">
              <Keyboard
                inputName="input"
                onChange={(text, e: any) => {
                  const letter = text.charAt(text.length - 1);

                  if (
                    text === "" ||
                    !playerData.guessedLetters.includes(letter.toUpperCase())
                  ) {
                    if (e?.target?.dataset.skbtn === "{bksp}") {
                      setInput("");
                    } else {
                      setInput(letter);
                    }
                  }
                }}
                display={{
                  "{bksp}": " ⌫ ",
                }}
                layout={{
                  default: [
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "z x c v b n m {bksp}",
                  ],
                }}
                buttonTheme={
                  playerData.removedLetters
                    ? [
                        {
                          class: "removed",
                          buttons: playerData.removedLetters,
                        },
                      ]
                    : undefined
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
