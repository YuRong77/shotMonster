import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="homePage">
      <div className="title">
        <h1>shotMonster</h1>
      </div>
      <div className="btnBox">
        {props.isDesktop && <span>請使用鍵盤方向鍵遊玩</span>}
        <div
          className="startBtn"
          onClick={() => {
            props.btnPlay();
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
