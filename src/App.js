import React from "react";
import { RecoilRoot } from "recoil";
import ScoreBar from "./components/ScoreBar";
import Game from "./components/Game";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ScoreBar />
        <h1>
          <span role="img" aria-label="flag">
            🏁
          </span>
          GAME
          <span role="img" aria-label="flag">
            {" "}
            🏁
          </span>
        </h1>
        <Game />
      </div>
    </RecoilRoot>
  );
}

export default App;
