import * as React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export function Board() {
  //const [clue, setClue] = React.useState("AAADKTD");
  //const [solutionLetter, setSolutionLetter] = React.useState("A");
  //const [solutionWord, setSolutionWord] = React.useState("away");

  const [input, setInput] = React.useState("");
  const [showSubmit, setShowSubmit] = React.useState(false);

  return (
    <div>
      <div className="header">ACRONYMS</div>
      <div className="board">
        <span className="clue">{"AAADKTD"}</span>
        <input value={input.toUpperCase()} readOnly />
        {showSubmit && (
          <div className="buttonBar">
            <button className="submit">Submit</button>
          </div>
        )}
      </div>
      <div className="keyboard">
        <Keyboard
          onChange={(text) => {
            setInput(text);
            setShowSubmit(text.length > 0)
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
        />
      </div>
    </div>
  );
}
