import React from "react";
import {
  chord,
  chord1,
  chord15,
  chord2,
  chord25,
  chord3,
  chord35,
  note,
  note1,
  note15,
  note2,
  note25,
  note3,
  note35,
} from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

import { atom, useRecoilValue } from "recoil";

export default function MovingObject({ x, y, type, dir }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;

  const level = useRecoilValue(atom({ key: "levelState" }));

  const actualLevel = level ? level : 1;

  let src;
  if (type === "boat") {
    if (actualLevel == 1) {
      src = chord;
    } else if (actualLevel == 2) {
      src = Math.random() < 0.5 ? chord : chord15;
    } else if (actualLevel == 3) {
      src = Math.random() < 0.5 ? chord2 : chord25;
    } else if (actualLevel == 4) {
      src = Math.random() < 0.5 ? chord3 : chord35;
    }
  } else if (type === "note") {
    if (actualLevel == 1) {
      src = note;
    } else if (actualLevel == 2) {
      src = Math.random() < 0.5 ? note : note15;
    } else if (actualLevel == 3) {
      src = Math.random() < 0.5 ? note2 : note25;
    } else if (actualLevel == 4) {
      src = Math.random() < 0.5 ? note3 : note35;
    }
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
