import React from "react";
import { atom, useRecoilState } from "recoil";
import FixedObject from "./FixedObject";
import { generateId } from "../gameHelpers";

export default function CorrectNotes() {
  const correctNotes = useRecoilState(atom({ key: "correctNotesState" }))[0];

  const displayNotes = correctNotes
    ? correctNotes
    : [
        { pc: "F", x: 1, y: 4, dir: "any", id: generateId() },
        { pc: "G", x: 2, y: 5, dir: "any", id: generateId() },
        { pc: "A", x: 3, y: 6, dir: "any", id: generateId() },
      ];

  return (
    <>
      {displayNotes?.map((note) => {
        return (
          <FixedObject
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
