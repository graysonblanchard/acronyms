import * as React from "react";

export enum Key {
  backspace = "backspace",
}

interface KeyboardProps {
  onInput(value: string): any;
}

export const Keyboard = (props: KeyboardProps) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", Key.backspace],
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((keyValue) => (
            <button key={keyValue} onClick={() => props.onInput(keyValue)}>
              {keyValue.toUpperCase() === Key.backspace.toUpperCase() ? '⌫' : keyValue.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
