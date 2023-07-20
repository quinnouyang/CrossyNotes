import React, { useCallback } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useInterval } from "../hooks/useInterval";
import MovingObject from "./MovingObject";

export default function Notes() {
  const notesState = atom({
    key: "notesState",
    default: [
      { x: -1, y: 5, dir: "down", id: Math.random().toString(36).substr(2, 9) },
      { x: 9, y: 6, dir: "up", id: Math.random().toString(36).substr(2, 9) },
    ],
  });
  const [notes, setNotes] = useRecoilState(notesState);
  const level = useRecoilValue(atom({ key: "levelState" }));
  const multiplier = level ? level : 1;
  const moveNotes = useCallback(() => {
    let notesCopy = [...notes];
    notesCopy = notesCopy.map((note) => {
      if (note.dir === "up") {
        return {
          ...note,
          x: parseInt(note.x) - 1,
        };
      } else {
        return {
          ...note,
          x: parseInt(note.x) + 1,
        };
      }
    });

    const newNotes = [];
    if (!notesCopy.filter((note) => note.x === 7 || note.x === 1).length) {
      newNotes.push({
        id: Math.random().toString(36).substr(2, 9),
        x: 9,
        y: 6,
        dir: "up",
      });
      newNotes.push({
        id: Math.random().toString(36).substr(2, 9),
        x: -1,
        y: 5,
        dir: "down",
      });
    }
    setNotes(
      notesCopy
        .filter((note) => {
          return note.x >= -1 && note.x <= 9;
        })
        .concat(newNotes)
    );
  }, [notes, setNotes]);

  useInterval(
    () => {
      moveNotes();
    },
    550 - multiplier * 50
  );
  return (
    <>
      {notes.map((note) => {
        return (
          <MovingObject
            key={note.id}
            x={note.x}
            y={note.y}
            dir={note.dir}
            type="note"
          />
        );
      })}
    </>
  );
}
