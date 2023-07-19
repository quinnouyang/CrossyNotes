import React from "react";
import { atom, useRecoilValue } from "recoil";
import { playerDead, playerNE, playerNW, playerSE, playerSW } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

export default function Player() {
  const playerState = atom({
    key: "playerState",
    default: { x: 4, y: 8, dir: "up", dead: false },
  });
  const player = useRecoilValue(playerState);

  // Get corrrect image from direction
  let src;
  if (player.dead) {
    src = playerDead;
  } else if (player.dir === "up") {
    src = playerNE;
  } else if (player.dir === "down") {
    src = playerSW;
  } else if (player.dir === "left") {
    src = playerNW;
  } else if (player.dir === "right") {
    src = playerSE;
  }

  // Calc abs position
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * player.y + yOffset / 1.8;
  const xBase = 50 - (100 / 18) * player.y;
  const xAbs = xBase + (50 / 9) * player.x;
  const yAbs = yBase + yOffset * player.x;

  return (
    <img
      alt="player"
      className={`player ${player.dead && "dead"}`}
      style={{ top: `${yAbs}%`, left: `${xAbs}%` }}
      src={src}
    />
  );
}
