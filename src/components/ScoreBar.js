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
        {player && player.dead ? (
          <div
            className="button"
            onClick={() => {
              setGameOver(false);
              setPlayer({ x: 4, y: 8, dir: "up", dead: false });
            }}
          >
            RESTART
          </div>
        ) : (
          <>
            <img
              alt="ur face"
              style={{ width: 400, height: 400 }}
              src={playerFace}
            />
            <span className="score">{level ? level : 1}</span>
            <Inventory />
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreBar;
