import React, { useEffect, useCallback, useRef } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import ArrowsIcon from "./ArrowsIcon";

function Inputs() {
  const playerState = atom({
    key: "playerState",
    default: { x: 4, y: 8, dir: "up" },
  });
  const [player, setPlayer] = useRecoilState(playerState);
  const allowInputState = atom({
    key: "allowInputState",
    default: true,
  });
  const gameOver = useRecoilValue(atom({ key: "gameOverState" }));
  const [allowInput, setAllowInput] = useRecoilState(allowInputState);

  let timer = useRef(false);
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, [timer]);

  const keyPressHandler = useCallback(
    (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (gameOver) {
        return;
      }
      if (!allowInput) {
        return;
      }
      setAllowInput(false);
      timer.current = setTimeout(() => {
        setAllowInput(true);
      }, 350);
      if (e.keyCode === 37) {
        // left
        setPlayer({
          x: player.x > 0 ? player.x - 1 : 0,
          y: player.y,
          dir: "left",
        });
      } else if (e.keyCode === 39) {
        // right
        setPlayer({
          x: player.x < 8 ? player.x + 1 : 8,
          y: player.y,
          dir: "right",
        });
      } else if (e.keyCode === 38) {
        // up
        setPlayer({
          x: player.x,
          y: player.y > -1 ? player.y - 1 : 0,
          dir: "up",
        });
      } else if (e.keyCode === 40) {
        // down
        setPlayer({
          x: player.x,
          y: player.y < 8 ? player.y + 1 : 8,
          dir: "down",
        });
      }
    },
    [player, setPlayer, gameOver, allowInput, setAllowInput]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setInputBlocked(false);
  //   }, 250);
  //   return () => {
  //     setInputBlocked(false);
  //     clearInterval(timer);
  //   };
  // }, [inputBlockedState, setInputBlocked]);

  return (
    <div className="buttons w-100">
      <div className="arrows">
        <ArrowsIcon />
      </div>
      <div className="flex justify-between">
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 37 });
          }}
          className="button"
        >
          LEFT
        </div>
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 38 });
          }}
          className="button"
        >
          UP
        </div>
      </div>
      <div className="flex justify-between">
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 40 });
          }}
          className="button"
        >
          DOWN
        </div>
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 39 });
          }}
          className="button"
        >
          RIGHT
        </div>
      </div>
    </div>
  );
}

export default Inputs;
