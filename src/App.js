import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import bgmMusic from "./assets/sound/bgm.mp3";
import btnSound from "./assets/sound/btnSound.mp3";
import shotSound from "./assets/sound/shot.mp3";
import jumpSound from "./assets/sound/jump.mp3";
import eatSound from "./assets/sound/eating.mp3";
import Home from "./views/home";
import Game from "./views/game";
import Scoreboard from "./views/scoreboard";
import "./assets/css/App.scss";
// import { FpsView } from "react-fps";

function App() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isClickStart, setIsClickStart] = useState(false);
  const [bgm, { stop }] = useSound(bgmMusic, { volume: 0.05 });
  const [btnPlay] = useSound(btnSound, { volume: 0.5 });
  const [shotPlay] = useSound(shotSound, { volume: 0.1 });
  const [jumpPlay] = useSound(jumpSound, { volume: 0.2 });
  const [eatPlay] = useSound(eatSound, { volume: 0.1 });

  useEffect(() => {
    if (window.screen.width < 850) return setIsDesktop(false);
    //太空背景 https://github.com/adolfintel/warpspeed
    new window.WarpSpeed("starBg", {
      targetSpeed: 1,
      backgroundColor: "rgb(0,0,0)",
    });
  }, []);

  return (
    <div className="myApp">
      {isDesktop && (
        <canvas
          id="starBg"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        ></canvas>
      )}
      <div className="gameArea">
        {/* <FpsView width={80} height={50} /> */}
        <Router>
          <Routes>
            <Route
              path="/home"
              element={
                <Home
                  btnPlay={btnPlay}
                  isDesktop={isDesktop}
                  setIsClickStart={setIsClickStart}
                />
              }
            ></Route>
            <Route
              path="/game"
              element={
                <Game
                  bgm={bgm}
                  stop={stop}
                  shotPlay={shotPlay}
                  jumpPlay={jumpPlay}
                  isClickStart={isClickStart}
                />
              }
            ></Route>
            <Route
              path="/scoreboard"
              element={
                <Scoreboard
                  btnPlay={btnPlay}
                  eatPlay={eatPlay}
                  isClickStart={isClickStart}
                  setIsClickStart={setIsClickStart}
                />
              }
            ></Route>
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
