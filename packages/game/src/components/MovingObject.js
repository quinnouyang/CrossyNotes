import React from "react";
import { chord1, note } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

export default function MovingObject({ x, y, type, dir }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;

  let src;
  if (type === "boat" && dir === "up") {
    src = chord1;
  } else if (type === "boat" && dir === "down") {
    src = chord1;
  } else if (type === "note" && dir === "up") {
    src = note;
  } else if (type === "note" && dir === "down") {
    src = note;
  }
  return (
    <img
      alt={type}
      className={`${type}`}
      style={{
        top: `${yAbs}%`,
        left: `${xAbs}%`,
        opacity: x < 0 || x > 8 ? 0 : 1,
      }}
      src={src}
    />
  );
}
