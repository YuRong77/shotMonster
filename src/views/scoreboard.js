import { useNavigate, useLocation } from "react-router-dom";

const Scoreboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <h1>board</h1>
      <button onClick={() => navigate("/game")}>start game</button>
    </div>
  );
};
export default Scoreboard;
