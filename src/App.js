import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import bgmMusic from "./assets/sound/bgm.mp3";
import btnSound from "./assets/sound/btnSound.mp3";
import shotSound from "./assets/sound/shot.mp3";
import jumpSound from "./assets/sound/jump.mp3";
import Home from "./views/home";
import Game from "./views/game";
import Scoreboard from "./views/scoreboard";
import "./assets/css/App.scss";

function App() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isClickStart, setIsClickStart] = useState(false);
  const btn = useRef(null);
  const bgm = useRef(null);
  const shot = useRef(null);
  const jump = useRef(null);

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
        <Router>
          <Routes>
            <Route
              path="/home"
              element={<Home btn={btn} setIsClickStart={setIsClickStart} />}
            ></Route>
            <Route
              path="/game"
              element={
                <Game
                  bgm={bgm}
                  shot={shot}
                  jump={jump}
                  isClickStart={isClickStart}
                />
              }
            ></Route>
            <Route
              path="/scoreboard"
              element={
                <Scoreboard btn={btn} setIsClickStart={setIsClickStart} />
              }
            ></Route>
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
        </Router>
      </div>
      <audio src={btnSound} ref={btn}></audio>
      <audio src={shotSound} ref={shot}></audio>
      <audio src={bgmMusic} ref={bgm}></audio>
      <audio src={jumpSound} ref={jump}></audio>
    </div>
  );
}

export default App;
