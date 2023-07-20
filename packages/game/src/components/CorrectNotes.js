import React from "react";
import { atom, useRecoilState } from "recoil";
import MovingObject from "./MovingObject";

export default function CorrectNotes() {
  const correctNotesState = atom({
    key: "correctNotesState",
    default: [
      { x: 4, y: 6.5, dir: "up", id: Math.random().toString(36).substr(2, 9) },
    ],
  });
  const [notes] = useRecoilState(correctNotesState);

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
