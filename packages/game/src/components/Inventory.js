import React from "react";
import { atom, useRecoilValue } from "recoil";

function Inventory() {
  const correctNotes = useRecoilValue(atom({ key: "correctNotesState" }));
  const collectedNotes = useRecoilValue(atom({ key: "collectedNotesState" }));
  const correctChord = useRecoilValue(atom({ key: "correctChordState" }));
  const collectedChord = useRecoilValue(atom({ key: "collectedChordState" }));

  return (
    <div className="scorebar">
      <div className="inventory">
        <h2>Notes : </h2>
        <ul className="inventory">
          {correctNotes &&
            correctNotes.map((item, index) => (
              <li
                className={collectedNotes.includes(item) ? "selected" : ""}
                key={index}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className="inventory">
        <h2>Chord : </h2>
        <ul className="inventory">
          <li className={correctChord === collectedChord ? "selected" : ""}>
            {correctChord}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
