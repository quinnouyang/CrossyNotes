import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";
import {
  isDrowning,
  isTruckCollision,
  hasReachedGoal,
  getRiddenBoat,
  isRidingBoat,
  objectsIdentical,
} from "../gameHelpers";

function Frogger() {
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
  // Frog
  const frogState = atom({ key: "frogState", default: {} });
  const [frog, setFrog] = useRecoilState(frogState);

  // Trucks
  const trucks = useRecoilValue(atom({ key: "trucksState" }));
  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));

  useEffect(() => {
    /**
     * Temporarily sets game to over and frog to dead before respawning
     */
    function resetFrog() {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!frog.dead) {
        setFrog({ ...frog, dead: true });
      }

      setTimeout(() => {
        setGameOver(false);
        setFrog({ ...frog, x: 4, y: 8, dir: "up", dead: false });
      }, 1000);
    }

    // Check for drowning
    if (trucks && isTruckCollision(frog, trucks)) resetFrog();
    if (boats && isRidingBoat(frog, boats)) {
      const boat = getRiddenBoat(frog, boats);
      if (!objectsIdentical(frog, { ...frog, x: boat.x, y: boat.y })) {
        setFrog({ ...frog, x: boat.x, y: boat.y });
      }
    } else if (boats && isDrowning(frog, boats)) resetFrog();
  }, [trucks, boats, frog, setFrog, gameOver, setGameOver]);

  useEffect(() => {
    // Check for reaching goal
    if (hasReachedGoal(frog)) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      setFrog({ ...frog, x: 4, y: 8 });
    }
  }, [frog, setFrog, score, setScore, highScore, setHighScore]);

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}

export default Frogger;
