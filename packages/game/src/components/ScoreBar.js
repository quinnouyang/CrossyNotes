import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import PlayerIcon from "./PlayerIcon";
import CrownIcon from "./CrownIcon";
import Inventory from "./Inventory";

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
            <PlayerIcon />
            <span className="score">{level ? level : 1}</span>
            <Inventory />
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreBar;
