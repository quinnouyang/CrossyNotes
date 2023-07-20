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
  generateId,
} from "../gameHelpers";

export default function Game() {
  //level
  const levelState = atom({
    key: "levelState",
    default: 1,
  });
  const [level, setLevel] = useRecoilState(levelState);
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
    default: [
      { pc: "F", x: 1, y: 4, dir: "up", id: generateId() },
      { pc: "G", x: 2, y: 5, dir: "down", id: generateId() },
      { pc: "A", x: 3, y: 6, dir: "up", id: generateId() },
    ],
  });
  const [correctNotes, setCorrectNotes] = useRecoilState(correctNotesState);

  // Correct chord
  const correctChordState = atom({
    key: "correctChordState",
    default: "CEG",
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

    function handleNoteCollection(pc) {
      if (collectedNotes.includes(pc)) return;

      console.log(pc);
      setCollectedNotes((prevNotes) => [...prevNotes, pc]);
    }

    const collectedNote =
      getCollected(player, notes) ?? getCollected(player, correctNotes);
    if (collectedNote && correctNotes) {
      if (
        correctNotes.find((correctNote) => correctNote.pc === collectedNote.pc)
      )
        handleNoteCollection(collectedNote.pc);
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
      setLevel(level + 1);
      setPlayer({ ...player, x: 4, y: 8 });
    }
    if (level === 5) {
      setLevel(1);
    }
  }, [player, setPlayer, level, setLevel]);

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}
