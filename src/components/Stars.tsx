import * as React from "react";
import { GameData } from "./Game";

interface StarsProps {
    gameData: GameData;
    showGameOverDisplay: boolean;
}

export const Stars = (props: StarsProps) => {
    const { gameData, showGameOverDisplay } = props;
    
    let stars = [];

    for (let i = 1; i <= gameData.currentScore; i++) {
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

    for (let i = 1; i <= 3 - gameData.currentScore; i++) {
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
      <div className={showGameOverDisplay ? "stars-game-over" : "stars"}>
        {stars.map((star, i) => {
          return (
            <div style={{ display: "flex" }} key={"star-" + i}>
              {star}
            </div>
          );
        })}
      </div>
    );
  };