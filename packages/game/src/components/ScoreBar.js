import React, { useState } from "react";
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
  const inventoryState = atom({
    key: "inventoryState",
    default: ["C", "D", "E", "FGE"],
  });
  const [inventory, setInventory] = useRecoilState(inventoryState);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const level = useRecoilValue(atom({ key: "levelState" }));
  const setGameOver = useSetRecoilState(atom({ key: "gameOverState" }));

  const handleNoteClick = (note) => {
    console.log(note);
    if (selectedNotes.includes(note)) {
      // If the note is already selected, remove it from the array
    } else {
      // If the note is not selected, add it to the array
      console.log(note);
      setSelectedNotes((prevNotes) => [...prevNotes, note]);
    }
  };
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
