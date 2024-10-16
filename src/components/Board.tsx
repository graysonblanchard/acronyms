import * as React from "react";
import { Key, Keyboard } from "./Keyboard";

export function Board() {
  const [clue, setClue] = React.useState("AAADKTD");
  const [solutionLetter, setSolutionLetter] = React.useState("A");
  const [solutionWord, setSolutionWord] = React.useState("away");

  const [input, setInput] = React.useState("");
  const [showSubmit, setShowSubmit] = React.useState(false);

  const handleKeyPress = (keyValue: string) => {
    if (keyValue === Key.backspace) {
      setInput((prevInput) => prevInput.slice(0, -1));
      setShowSubmit(false);
    } else if (input.length < 1) {
      setInput((prevInput) => prevInput + keyValue);
      setShowSubmit(true);
    }
  };

  return (
    <div>
      <div className="header">ACRONYMS</div>
      <div className="board">
        <span className="clue">{clue}</span>
        <input value={input.toUpperCase()} readOnly />
        {showSubmit && (
          <div className="buttonBar">
            <button className="submit">Submit</button>
          </div>
        )}
      </div>
      <Keyboard
        onInput={(value) => {
          handleKeyPress(value);
        }}
      />
    </div>
  );
}
