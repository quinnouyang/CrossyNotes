import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Inventory from "./Inventory";
import { playerFace } from "../images";

function ScoreBar() {
  const [player, setPlayer] = useRecoilState(
    atom({ key: "playerState", default: {} })
  );
  const level = useRecoilValue(atom({ key: "levelState" }));
  const setGameOver = useSetRecoilState(atom({ key: "gameOverState" }));

  return (
    <div className="score-bar">
      <div className="score-wrapper">
        <img
          alt="ur face"
          style={{ width: 100, height: 100 }}
          src={playerFace}
        />
        <span className="score">lvl. {level ? level : 1}</span>
        <Inventory />
      </div>
    </div>
  );
}

export default ScoreBar;
