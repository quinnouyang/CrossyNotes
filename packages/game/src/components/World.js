import React from "react";
import Frog from "./Frog";
import Landscape from "./Landscape";
import Notes from "./Notes";
import Boats from "./Boats";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Notes />
      <Boats />
      <Frog />
    </div>
  );
}

export default World;
