import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";
import {
  isDrowning,
  getCollected,
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

  // Collected notes (correct)
  const collectedNotesState = atom({
    key: "collectedNotesState",
    default: [],
  });
  const [collectedNotes, setCollectedNotes] =
    useRecoilState(collectedNotesState);

  // Collected chord (correct)
  const collectedChordState = atom({
    key: "collectedChordState",
    default: [],
  });
  const [collectedChord, setCollectedChord] =
    useRecoilState(collectedChordState);

  // Correct notes
  const correctNotesState = atom({
    key: "correctNotesState",
    default: [],
  });
  const [correctNotes, setCorrectNotes] = useRecoilState(correctNotesState);

  // Correct chord
  const correctChordState = atom({
    key: "correctChordState",
    default: "",
  });
  const [correctChord, setCorrectChord] = useRecoilState(correctChordState);

  // Notes (incorrect)
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

    function handleNoteCollection(note) {
      if (collectedNotes.includes(note)) return;

      // console.log(note);
      setCollectedNotes((prevNotes) => [...prevNotes, note]);
    }

    const collectedNote = getCollected(player, notes);
    if (notes && collectedNote) {
      if (correctNotes && correctNotes.includes(collectedNote))
        handleNoteCollection();
      else resetPlayer();
    }

    function handleChordCollection(chord) {
      // TODO: Check this
      if (collectedChord) return;

      setCollectedChord(chord);
    }

    const collectedChord = getCollected(player, boats);
    if (correctChord === collectedChord) handleChordCollection(correctChord);

    if (boats && isRidingBoat(player, boats)) {
      const boat = getRiddenBoat(player, boats);
      if (!objectsIdentical(player, { ...player, x: boat.x, y: boat.y })) {
        setPlayer({ ...player, x: boat.x, y: boat.y });
      }
    } else if (boats && isDrowning(player, boats)) resetPlayer();
  }, [
    notes,
    boats,
    player,
    setPlayer,
    gameOver,
    setGameOver,
    correctNotes,
    correctChord,
    collectedNotes,
    setCollectedNotes,
    collectedChord,
    setCollectedChord,
  ]);

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
