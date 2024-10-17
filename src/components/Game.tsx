import * as React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export function Game() {
  const clue = "JFMAMJJ";
  const solutionLetter = "A";
  //const solutionWord = "august";
  const solutionExplanation = "the months of the year";

  //const [clue, setClue] = React.useState("AAADKTD");
  //const [solutionLetter, setSolutionLetter] = React.useState("A");
  //const [solutionWord, setSolutionWord] = React.useState("away");

  const [input, setInput] = React.useState<string>("");
  const [livesLeft, setLivesLeft] = React.useState<number>(3);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const [removedLetters, setRemovedLetters] = React.useState<string>("");

  const updateRemovedLetters = (letter: string) => {
    setRemovedLetters(removedLetters + ' ' + letter.toUpperCase() + ' ' + letter.toLowerCase());
  }

  const gameOver = () => {
    window.alert(
      "Game over! The correct answer is " +
        solutionLetter +
        ". These letters represent " +
        solutionExplanation +
        "."
    );

    setInput('');
    setGuessedLetters([]);
    setRemovedLetters('');
    setLivesLeft(3);
  };

  const getStars = () => {
    let stars = [];

    for (let i = 1; i <= livesLeft; i++) {
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

    for (let i = 1; i <= 3 - livesLeft; i++) {
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
      <div>
        {stars.map((star, i) => {
          return <span key={'star-' + i}>{star}</span>;
        })}
      </div>
    );
  };

  const makeGuess = () => {
    if (input.toUpperCase() === solutionLetter.toUpperCase()) {
      window.alert(
        "Correct! These letters represent " + solutionExplanation + "."
      );
    } else {
      setGuessedLetters([...guessedLetters, input.toUpperCase()]);
      updateRemovedLetters(input);
      setInput('');

      if (livesLeft === 1) {
        setLivesLeft(livesLeft - 1);
        gameOver();
      } else {
        setLivesLeft(livesLeft - 1);
        //window.alert("Incorrect! Try again.");
      }
    }
  };

  return (
    <div>
      <div className="header">ACRONYMS</div>
      <div className="flex-container">
        <div className="board">
          <span className="clue">{clue}</span>
          <input value={input.toUpperCase()} readOnly />
        </div>
        <div className="flex-container-2">
          <div className="buttonBar">
            <button
              className="submit"
              onClick={makeGuess}
              disabled={input.length === 0}
            >
              Submit
            </button>
          </div>
          <div>{getStars()}</div>
        </div>
        <div className="keyboard">
          <Keyboard
            inputName="input"
            onChange={(text) => {
              console.log('text', text);
              console.log('guessedLetters', guessedLetters);
              console.log('removedLetters', removedLetters);

              if(text === '' || !guessedLetters.includes(text.toUpperCase())) {
                setInput(text);
              }
            }}
            maxLength={1}
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
            buttonTheme={removedLetters ? [
              {
                class: "removed",
                buttons: removedLetters,
              },
            ] : undefined}
          />
        </div>
      </div>
    </div>
  );
}
