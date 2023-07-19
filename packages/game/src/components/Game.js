import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";
import {
  isDrowning,
  isNoteCollision,
  hasReachedGoal,
  getRiddenBoat,
  isRidingBoat,
  objectsIdentical,
} from "../gameHelpers";

export default function Game() {
  //Score
  const scoreState = atom({
    key: "scoreState",
    default: 0,
  });
  const [score, setScore] = useRecoilState(scoreState);
  // HighScore
  const highScoreState = atom({
    key: "highScoreState",
    default: 0,
  });
  const [highScore, setHighScore] = useRecoilState(highScoreState);
  // Gameover
  const [gameOver, setGameOver] = useRecoilState(
    atom({ key: "gameOverState", default: false })
  );
  // Player
  const playerState = atom({ key: "playerState", default: {} });
  const [player, setPlayer] = useRecoilState(playerState);

  // Notes
  const notes = useRecoilValue(atom({ key: "notesState" }));
  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));

  useEffect(() => {
    /**
     * Temporarily sets game to over and player to dead before respawning
     */
    function resetPlayer() {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!player.dead) {
        setPlayer({ ...player, dead: true });
      }

      setTimeout(() => {
        setGameOver(false);
        setPlayer({ ...player, x: 4, y: 8, dir: "up", dead: false });
      }, 1000);
    }

    // Check for drowning
    if (notes && isNoteCollision(player, notes)) resetPlayer();
    if (boats && isRidingBoat(player, boats)) {
      const boat = getRiddenBoat(player, boats);
      if (!objectsIdentical(player, { ...player, x: boat.x, y: boat.y })) {
        setPlayer({ ...player, x: boat.x, y: boat.y });
      }
    } else if (boats && isDrowning(player, boats)) resetPlayer();
  }, [notes, boats, player, setPlayer, gameOver, setGameOver]);

  useEffect(() => {
    // Check for reaching goal
    if (hasReachedGoal(player)) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      setPlayer({ ...player, x: 4, y: 8 });
    }
  }, [player, setPlayer, score, setScore, highScore, setHighScore]);

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}
