import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../assets/css/transition.css";
import monster1 from "../assets/img/monster1.png";
import monster2 from "../assets/img/monster2.png";
import monster3 from "../assets/img/monster3.png";
import monster4 from "../assets/img/monster4.png";
import monster5 from "../assets/img/monster5.png";

const Scoreboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [point, setPoint] = useState(0);
  const [pointList, setPointList] = useState(state ? state.pointList : []);
  const [countStart, setCountStart] = useState(false);
  const [countEnd, setCountEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCountStart(true);
    }, 550);
  }, []);

  useEffect(() => {
    if (!countStart) return;
    if (pointList.length === 0) return setCountEnd(true);
    const timer = setInterval(() => {
      setPoint((val) => val + pointList[0].level * 20);
      setPointList((val) => val.slice(1));
    }, 150);
    return () => {
      clearInterval(timer);
    };
  }, [countStart, pointList]);

  return (
    <div className="scoreboardPage">
      <div className="scoreboard">
        <h1>總分結算</h1>
        <div>{point}</div>
      </div>
      <TransitionGroup className="pointList">
        {pointList.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="pointImg">
            <PointItem item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {countEnd && (
        <div className="pointRecord">
          <div className="pointRecordBox">
            <div className="comments">魔法師的手速!</div>
            <div className="menuBtn">
              <div onClick={() => navigate("/game")}>再次挑戰</div>
              <div onClick={() => navigate("/home")}>回到大廳</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Scoreboard;

const PointItem = (props) => {
  function getMonsterImg(level) {
    if (level === 1) return monster1;
    if (level === 2) return monster2;
    if (level === 3) return monster3;
    if (level === 4) return monster4;
    if (level === 5) return monster5;
  }
  return (
    <div className="pointItem">
      <img src={getMonsterImg(props.item.level)} alt="" />
    </div>
  );
};
