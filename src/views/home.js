import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <div className="title">
        <h1>shotMonster</h1>
      </div>
      <div className="btnBox">
        <div
          className="startBtn"
          onClick={() => {
            props.btn.current.play();
            props.setIsClickStart(true);
            navigate("/game");
          }}
        >
          開始遊戲
        </div>
      </div>
    </div>
  );
};
export default Home;
