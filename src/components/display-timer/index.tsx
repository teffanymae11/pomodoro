import React, { useCallback } from 'react';
import { DisplayTimerVars } from './types';
import { TimerDisplay, Btn, BreakBlock, Hr1, Header1, Header2, AddTodoBlock } from '../styles';
import Todo from '../todo';

const DisplayTimer: React.FC<DisplayTimerVars> = ({
  custom,
  startTimer,
  pauseTimer,
  resetTimer,
  handleClick,
  timerPomodoro,
  timerShort,
  timerLong,
  seconds,
  setSeconds,
  activeTimer,
  setAuto,
  autoButton,
  setAutoButton,
  count,
  setCount,
  skipStat,
  setSkipStat,
  cycleStat,
  setCycleStat,
  updating,
  todo,
  handleShow,
  handleClose,
  show
}) => {

  const hr1 = require('../../images/hr1.png');

  const pauseBtn = require('../../images/pause.png');
  const resetBtn = require('../../images/reset.png');

  const pomodoroBtn = require('../../images/pomodoro.png');
  const shortBtn = require('../../images/short.png');
  const longBtn = require('../../images/long.png');
  const autoBtn = require('../../images/auto.png');
  const skipBtn = require('../../images/skip.png');

  const skipTimer: () => void = useCallback(
    () => {
      if (activeTimer === "pomodoro") {
        setSeconds((s: number) => {
          if (s <= Number(custom.pomodoro) * 60) {
            document.title = `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")} - ${activeTimer}`
            pauseTimer();
            timerShort();
            startTimer();
            handleClick();
            setSkipStat(Number(skipStat) + 1);

            if (count >= custom.longTrigger) {
              pauseTimer();
              timerLong();
              startTimer();
              setCount(1);
              setCycleStat(Number(cycleStat) + 1);
            }
          }
          return s
        });

      } else if (activeTimer === "short") {
        setSeconds((s: number) => {
          document.title = `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")} - ${activeTimer}`
          if (s <= Number(custom.short) * 60) {
            pauseTimer();
            timerPomodoro();
            startTimer()
          }
          return s
        });

      } else if (activeTimer === "long") {
        setSeconds((s: number) => {
          document.title = `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")} - ${activeTimer}`
          if (s <= Number(custom.long) * 60) {
            pauseTimer();
            timerPomodoro();
            startTimer();
          }
          return s
        });
      }
    },
    [activeTimer, count, custom.long, custom.longTrigger,
      custom.pomodoro, custom.short, cycleStat, handleClick,
      pauseTimer, setCount, setCycleStat, setSeconds, setSkipStat,
      skipStat, startTimer, timerLong, timerPomodoro, timerShort],
  )

  const timerAuto = () => {
    setAuto(false);
    setAutoButton(true);
    timerPomodoro();
    startTimer();
  }

  return (
    <TimerDisplay>
      <Header2>{`${activeTimer}`}.</Header2>
      <Hr1 src={hr1} alt="" />
      <Btn title="Pause (Ctrl+Alt+P)" src={pauseBtn} onClick={pauseTimer} />
      <Btn title="Reset (Ctrl+Alt+R)" src={resetBtn} onClick={resetTimer} />

      <Header1>{`${Math.floor(Number(seconds) / 60)}:${(Number(seconds) % 60).toString().padStart(2, "0")}`}</Header1>

      <BreakBlock>
        <Btn title="Pomodoro" src={pomodoroBtn} onClick={timerPomodoro} />
        <Btn title="Short Break" src={shortBtn} onClick={timerShort} />
        <Btn title="Long Break" src={longBtn} onClick={timerLong} />
        <Btn title="Auto" src={autoBtn} onClick={timerAuto} />
        <Btn title="Skip" src={skipBtn} className={!autoButton ? "skip" : ""} onClick={skipTimer} />

      </BreakBlock>

      <AddTodoBlock>
        <Todo
          updating={updating}
          todo={todo}
          handleShow={handleShow}
          handleClose={handleClose}
          show={show}
        />
      </AddTodoBlock>
    </TimerDisplay >
  );
}

export default DisplayTimer;

