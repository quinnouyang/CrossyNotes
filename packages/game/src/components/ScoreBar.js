import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import PlayerIcon from "./PlayerIcon";
import CrownIcon from "./CrownIcon";

function ScoreBar() {
  const [player, setPlayer] = useRecoilState(
    atom({ key: "playerState", default: {} })
  );
  const score = useRecoilValue(atom({ key: "scoreState" }));
  const highScore = useRecoilValue(atom({ key: "highScoreState" }));
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
            <span className="score">{score ? score : 0}</span>
            <CrownIcon />
            <span className="high-score">{highScore ? highScore : 0}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreBar;
