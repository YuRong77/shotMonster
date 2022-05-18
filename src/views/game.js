import { useState, useEffect, useCallback } from "react";
import monster1 from "../assets/img/monster1.png";
import monster2 from "../assets/img/monster2.png";
import monster3 from "../assets/img/monster3.png";
import monster4 from "../assets/img/monster4.png";
import monster5 from "../assets/img/monster5.png";

const Game = () => {
  const [monsterList, setMonsterList] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  // const [countdown, setCountdown] = useState(3);
  // const [gameStart, setGameStart] = useState(false);

  const shotMonster = useCallback(
    (position) => {
      if (monsterList[0].position === position) {
        setMonsterList((val) => val.slice(1));
      } else {
        console.log("fail!!!");
      }
    },
    [monsterList]
  );

  useEffect(() => {
    if (monsterList.length !== 0 && monsterList.length > 15) return;
    if (monsterList.length === 0) return setCurrentLevel(1);
    setCurrentLevel((val) => val + 1);
  }, [monsterList]);

  useEffect(() => {
    if (!currentLevel) return;
    const newMonsterList = [];
    for (let i = 1; i < 30; i++) {
      const randomNum = Math.floor(Math.random() * 3) + 1;
      newMonsterList.push({
        position: randomNum,
        level: currentLevel > 5 ? 5 : currentLevel,
      });
    }
    setMonsterList((val) => [...val, ...newMonsterList]);
  }, [currentLevel]);

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
      <div className="monsterList">
        {monsterList.map((item, index) => (
          <MonsterItem item={item} key={index} />
        ))}
      </div>
      <Footer shotMonster={shotMonster} />
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
    <div className={`monsterItem ${getMonsterClass(props.item.position)}`}>
      <div>
        <img src={getMonsterImg(props.item.level)} alt="" />
      </div>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="footerBtnGroup">
        <div className="footerBtn" onClick={() => props.shotMonster(1)}>
          1
        </div>
        <div className="footerBtn" onClick={() => props.shotMonster(2)}>
          2
        </div>
        <div className="footerBtn" onClick={() => props.shotMonster(3)}>
          3
        </div>
      </div>
    </div>
  );
};
