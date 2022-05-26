import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../assets/css/transition.css";
import monster1 from "../assets/img/monster1.png";
import monster2 from "../assets/img/monster2.png";
import monster3 from "../assets/img/monster3.png";
import monster4 from "../assets/img/monster4.png";
import monster5 from "../assets/img/monster5.png";

const Scoreboard = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [point, setPoint] = useState(0);
  const [bestRecord, setBestRecord] = useState(
    window.localStorage.getItem("monsterPoint") || 0
  );
  const [pointList, setPointList] = useState(state ? state.pointList : []);
  const [countStart, setCountStart] = useState(false);
  const [countEnd, setCountEnd] = useState(false);

  function getComments() {
    if (point <= 4200) return "加油好嗎，我阿嬤都比你強= =";
    if (point <= 7000) return "豪快的反應R~";
    return "魔法師的手速!";
  }

  useEffect(() => {
    if (!props.isClickStart) return navigate("/home");
    const timer = setTimeout(() => {
      setCountStart(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [props.isClickStart, navigate]);

  useEffect(() => {
    if (!countStart) return;
    if (pointList.length === 0) return setCountEnd(true);
    const timer = setInterval(() => {
      props.eat.current.currentTime = 0;
      props.eat.current.play();
      setPoint((val) => val + pointList[0].level * 20);
      setPointList((val) => val.slice(1));
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [countStart, pointList, props.eat]);

  //紀錄最佳得分
  useEffect(() => {
    if (!countEnd) return;
    if (point > bestRecord) {
      window.localStorage.setItem("monsterPoint", point);
      setBestRecord(point);
    }
  }, [countEnd, point, bestRecord]);

  return (
    <div className="scoreboardPage">
      <div className="scoreboard">
        <h1>總分結算</h1>
        <div className="scoreboardBox">
          <div>{point}</div>
        </div>
      </div>
      <TransitionGroup className="pointList">
        {pointList.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="pointImg">
            <PointItem item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {countEnd && (
        <div className="pointComments">
          <div className="pointCommentsBox">
            <div className="comments">{getComments()}</div>
            <div className="menuBtn">
              <div
                onClick={() => {
                  props.btn.current.play();
                  props.setIsClickStart(true);
                  navigate("/game");
                }}
              >
                再次挑戰
              </div>
              <div
                onClick={() => {
                  props.btn.current.play();
                  navigate("/home");
                }}
              >
                回到首頁
              </div>
            </div>
          </div>
        </div>
      )}
      {countEnd && <div className="bestRecord">最佳紀錄: {bestRecord}</div>}
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
