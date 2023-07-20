import { SYNTH } from "./constants";

function debounce(func, timeout) {
  let timer;
  console.log(timer);
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

function play(notes, duration) {
  if (notes instanceof Array)
    notes.forEach((note) => {
      SYNTH.triggerAttackRelease(note, duration);
    });
  else SYNTH.triggerAttackRelease(notes, duration);
}

export default function debouncedPlay(notes, duration) {
  debounce(play(notes, duration), 2000);
}
