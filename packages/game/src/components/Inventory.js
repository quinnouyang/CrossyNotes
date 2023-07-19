import React, { useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function Inventory() {
  const inventoryState = atom({
    key: "inventoryState",
    default: ["C", "D", "E", "FGE"],
  });
  const [inventory, setInventory] = useRecoilState(inventoryState);
  const [selectedNotes, setSelectedNotes] = useState([]);

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
    <div className="scorebar">
      <div className="inventory">
        <h2>Notes : </h2>
        <ul className="inventory">
          {inventory.slice(0, 3).map((item, index) => (
            <li
              className={selectedNotes.includes(item) ? "selected" : ""}
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
          {inventory.slice(3).map((item, index) => (
            <li
              className={selectedNotes.includes(item) ? "selected" : ""}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
