import * as React from "react";
import Keyboard from "react-simple-keyboard";

interface CustomKeyboardProps {
  playerData: any;
  setInput: any;
}

export const CustomKeyboard = (props: CustomKeyboardProps) => {
  const { playerData, setInput } = props;

  return (
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
  );
};
