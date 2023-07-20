import React from "react";
import { atom, useRecoilValue } from "recoil";

function Inventory() {
  const correctNotes = useRecoilValue(atom({ key: "correctNotesState" }));
  const collectedNotes = useRecoilValue(atom({ key: "collectedNotesState" }));
  const correctChord = useRecoilValue(atom({ key: "correctChordState" }));
  const collectedChord = useRecoilValue(atom({ key: "collectedChordState" }));

  const displayNotes = correctNotes ? correctNotes : ["F", "G", "A"];
  const displayChord = correctChord ? correctChord : "FGA";

  return (
    <div className="scorebar">
      <div className="inventory">
        <h2>Notes : </h2>
        <ul className="inventory">
          {displayNotes &&
            displayNotes.map((item, index) => (
              <li
                className={collectedNotes?.includes(item) ? "selected" : ""}
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
          <li className={displayChord === collectedChord ? "selected" : ""}>
            {displayChord}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
