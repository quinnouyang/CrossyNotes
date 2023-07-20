import { WATER_TILES_Y_INDEXES } from "./constants";

export const getCollected = (player, notesOrChords) => {
  if (!notesOrChords) return null;
  return notesOrChords.find((noc) => noc.x === player.x && noc.y === player.y);
};

export const isDrowning = (player, boats) => {
  const boatUnderPlayer = boats.some(
    (boat) => boat.y === player.y && Math.abs(boat.x - player.x) <= 1
  );
  if (WATER_TILES_Y_INDEXES.includes(player.y) && !boatUnderPlayer) {
    return true;
  } else {
    return false;
  }
};

export const getRiddenBoat = (player, boats) => {
  return boats.find((boat) => {
    return boat.y === player.y && Math.abs(boat.x - player.x) <= 1;
  });
};

export const isRidingBoat = (player, boats) => {
  return boats.find((boat) => {
    return boat.y === player.y && Math.abs(boat.x - player.x) <= 1;
  });
};

export const hasReachedGoal = (player) => {
  return player.y === -1;
};

export const objectsIdentical = (o1, o2) => {
  return JSON.stringify(o1) === JSON.stringify(o2);
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};
