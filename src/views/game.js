import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import monster1 from "../assets/img/monster1.png";
import monster2 from "../assets/img/monster2.png";
import monster3 from "../assets/img/monster3.png";
import monster4 from "../assets/img/monster4.png";
import monster5 from "../assets/img/monster5.png";

const Game = () => {
  const navigate = useNavigate();
  const [monsterList, setMonsterList] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [pointList, setPointList] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [gameTime, setGameTime] = useState(30);
  const [gameStart, setGameStart] = useState(false);
  // const [gamePause, setGamePause] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [failPunish, setFailPunish] = useState(false);

  const shotMonster = useCallback(
    (position) => {
      if (!gameStart || failPunish || gameEnd) return;
      if (monsterList[0].position === position) {
        setMonsterList((val) => val.slice(1));
        setPointList((val) => [...val, ...[monsterList[0]]]);
      } else {
        setFailPunish(true);
      }
    },
    [monsterList, gameStart, failPunish, gameEnd]
  );

  //開始前倒數
  useEffect(() => {
    if (countdown < 1) return setGameStart(true);
    const timer = setInterval(() => {
      setCountdown((val) => val - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  //遊戲時間倒數
  useEffect(() => {
    if (!gameStart) return;
    if (gameTime <= 0) return setGameEnd(true);
    const timer = setInterval(() => {
      setGameTime((val) => val - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStart, gameTime]);

  //當前等級怪物<15隻，增加一級難度
  useEffect(() => {
    if (monsterList.length !== 0 && monsterList.length > 15) return;
    if (monsterList.length === 0) return setCurrentLevel(1);
    setCurrentLevel((val) => val + 1);
  }, [monsterList]);

  //每升一級難度加入新怪獸
  useEffect(() => {
    if (!currentLevel) return;
    const newMonsterList = [];
    for (let i = 1; i <= 35; i++) {
      const randomNum = Math.floor(Math.random() * 3) + 1;
      newMonsterList.push({
        position: randomNum,
        level: currentLevel > 5 ? 5 : currentLevel,
        id: uuidv4(),
      });
    }
    setMonsterList((val) => [...val, ...newMonsterList]);
  }, [currentLevel]);

  //失敗懲罰時間一秒
  useEffect(() => {
    if (!failPunish) return;
    const timer = setTimeout(() => {
      setFailPunish(false);
    }, 450);
    return () => {
      clearTimeout(timer);
    };
  }, [failPunish]);

  //遊戲結束至結算頁
  useEffect(() => {
    if (!gameEnd) return;
    setTimeout(() => {
      navigate("/scoreboard", { state: { pointList: pointList } });
    }, 2000);
  }, [gameEnd, navigate, pointList]);

  //電腦版按鍵事件
  useEffect(() => {
    function keyDown(e) {
      if (e.key === "ArrowLeft") return shotMonster(1);
      if (e.key === "ArrowDown") return shotMonster(2);
      if (e.key === "ArrowRight") return shotMonster(3);
    }
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [shotMonster]);

  return (
    <div className="gamePage">
      <div className="gameTime">
        <div>{gameTime}</div>
      </div>
      <div className="monsterList">
        {monsterList.map((item, index) => (
          <MonsterItem
            item={item}
            isFail={index === 0 && failPunish}
            key={item.id}
          />
        ))}
      </div>
      <Footer shotMonster={shotMonster} />
      {countdown > 0 && <div className="countdown">{countdown}</div>}
      {gameEnd && <div className="timeUp">time up</div>}
    </div>
  );
};
export default Game;

const MonsterItem = (props) => {
  function getMonsterImg(level) {
    if (level === 1) return monster1;
    if (level === 2) return monster2;
    if (level === 3) return monster3;
    if (level === 4) return monster4;
    if (level === 5) return monster5;
  }
  function getMonsterClass(position) {
    if (position === 1) return "left";
    if (position === 2) return "middle";
    if (position === 3) return "right";
  }
  return (
    <div className={`monsterItem ${props.isFail ? "failJump" : ""}`}>
      <img
        className={getMonsterClass(props.item.position)}
        src={getMonsterImg(props.item.level)}
        alt=""
      />
    </div>
  );
};

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footerBtnGroup">
        <div className="footerBtn" onTouchStart={() => props.shotMonster(1)}>
          <div></div>
        </div>
        <div className="footerBtn" onTouchStart={() => props.shotMonster(2)}>
          <div></div>
        </div>
        <div className="footerBtn" onTouchStart={() => props.shotMonster(3)}>
          <div></div>
        </div>
      </div>
    </div>
  );
};
