import { Synth } from "tone";
import "./App.css";
import { Note, Time } from "tone/build/esm/core/type/Units";

function play(synth: Synth, notes: Note | Note[], duration: Time) {
  if (notes instanceof Array)
    notes.forEach((note) => {
      synth.triggerAttackRelease(note, duration);
    });
  else synth.triggerAttackRelease(notes, duration);
}

function handleClick() {
  // void (async () => {
  //   const audio = new Audio(
  //     "https://www.myinstants.com/media/sounds/air-horn-club-sample_1.mp3"
  //   );
  //   await audio.play();
  // })();
  play(new Synth().toDestination(), "D3", "8n");
}

export default function App() {
  return (
    <div>
      <button onClick={handleClick}>I play a note!</button>
    </div>
  );
}
