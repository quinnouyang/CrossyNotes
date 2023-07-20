import React from "react";
import Player from "./Player";
import Landscape from "./Landscape";
import Notes from "./Notes";
import Boats from "./Boats";
import CorrectNotes from "./CorrectNotes";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Notes />
      <CorrectNotes />
      <Boats />
      <Player />
    </div>
  );
}

export default World;
