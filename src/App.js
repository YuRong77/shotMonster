import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./views/home";
import Game from "./views/game";
import Scoreboard from "./views/scoreboard";
import "./assets/css/App.scss";

function App() {
  const [isDesktop, setIsDesktop] = useState(true);
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
            <Route path="/home" element={<Home />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/scoreboard" element={<Scoreboard />}></Route>
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
