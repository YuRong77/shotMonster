import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import monster1 from "../assets/img/monster1.png";
import monster2 from "../assets/img/monster2.png";
import monster3 from "../assets/img/monster3.png";
import monster4 from "../assets/img/monster4.png";
import monster5 from "../assets/img/monster5.png";

const Game = (props) => {
  const navigate = useNavigate();
  const [monsterList, setMonsterList] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [pointList, setPointList] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [gameStart, setGameStart] = useState(false);
  // const [gamePause, setGamePause] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [failPunish, setFailPunish] = useState(false);

  const shotMonster = useCallback(
    (position) => {
      props.shot.current.currentTime = 0;
      props.shot.current.volume = 0.1;
      props.shot.current.play();
      if (!gameStart || failPunish || gameEnd) return;
      if (monsterList[0].position === position) {
        setMonsterList((val) => val.slice(1));
        setPointList((val) => [...val, ...[monsterList[0]]]);
      } else {
        setFailPunish(true);
      }
    },
    [monsterList, gameStart, failPunish, gameEnd, props.shot]
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
    props.jump.current.currentTime = 0;
    props.jump.current.volume = 0.2;
    props.jump.current.play();
    const timer = setTimeout(() => {
      setFailPunish(false);
    }, 450);
    return () => {
      clearTimeout(timer);
    };
  }, [failPunish, props.jump]);

  //遊戲結束至結算頁
  useEffect(() => {
    if (!gameEnd) return;
    setTimeout(() => {
      navigate("/scoreboard", { state: { pointList: pointList } });
    }, 2000);
  }, [gameEnd, navigate, pointList]);

  //bgm
  useEffect(() => {
    if (!props.isClickStart) return navigate("/home");
    if (gameEnd) return props.bgm.current.pause();
    props.bgm.current.currentTime = 0;
    props.bgm.current.volume = 0.04;
    props.bgm.current.play();
    return () => {
      props.bgm.current.pause();
    };
  }, [props.isClickStart, props.bgm, navigate, gameEnd]);

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
      <GameTime gameStart={gameStart} setGameEnd={setGameEnd} />
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
export default memo(Game);

const GameTime = memo((props) => {
  const [gameTime, setGameTime] = useState(30);
  const { gameStart, setGameEnd } = props;
  useEffect(() => {
    if (!gameStart) return;
    if (gameTime <= 0) return setGameEnd(true);
    const timer = setInterval(() => {
      setGameTime((val) => val - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStart, gameTime, setGameEnd]);
  return (
    <div className="gameTime">
      <div>{gameTime}</div>
    </div>
  );
});

const MonsterItem = memo((props) => {
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
});

const Footer = memo((props) => {
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
});
