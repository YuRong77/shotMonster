import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./views/home";
import Game from "./views/game";
import Scoreboard from "./views/scoreboard";
import "./assets/css/App.scss";

function App() {
  return (
    <div className="myApp">
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
