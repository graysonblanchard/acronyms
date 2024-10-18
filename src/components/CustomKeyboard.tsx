import * as React from "react";
import Keyboard from "react-simple-keyboard";
import { GameData } from "./Game";

interface CustomKeyboardProps {
  gameData: GameData;
  setInput: any;
}

export const CustomKeyboard = (props: CustomKeyboardProps) => {
  const { gameData, setInput } = props;

  return (
    <Keyboard
      inputName="input"
      onChange={(text, e: any) => {
        const letter = text.charAt(text.length - 1);

        if (
          text === "" ||
          !gameData.guessedLetters.includes(letter.toUpperCase())
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
        gameData.removedLetters
          ? [
              {
                class: "removed",
                buttons: gameData.removedLetters,
              },
            ]
          : undefined
      }
    />
  );
};
