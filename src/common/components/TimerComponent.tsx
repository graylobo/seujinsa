import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ITimerProps,
  timerRunningState,
  buildAlertLanguage,
  timerSelector,
} from "../recoil/states";
import speak from "../utils/tts";

interface Props {
  id: number;
}
const padNumber = (num: number, length: number) => {
  return String(num).padStart(length, "0");
};

export default function TimerComponent({ id }: Props) {
  const [timer, setTimer] = useRecoilState<ITimerProps[]>(timerSelector);
  const [timerRunning, setTimerRunning] = useRecoilState(timerRunningState);
  const lang = useRecoilValue(buildAlertLanguage);
  const currentTimerInfo = timer.filter((e) => e.id === id)[0];
  const tempHour = currentTimerInfo.hour ? parseInt(currentTimerInfo.hour) : 0;
  const tempMin = currentTimerInfo.minute
    ? parseInt(currentTimerInfo.minute)
    : 0;
  const tempSec = currentTimerInfo.second
    ? parseInt(currentTimerInfo.second)
    : 0;
  const initialTime = useRef<number>(tempHour);
  const interval = useRef<any>(null);
  const [hour, setHour] = useState(padNumber(tempHour, 2));
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [sec, setSec] = useState(padNumber(tempSec, 2));
  const timerInputCSS = `w-[50px] mr-[5px] border-2 border-gray-500 p-[10px] rounded-[3px] outline-blue-600 box-border inline-block
  ${timerRunning ? "bg-gray-300" : ""}`;
  useEffect(() => {
    initialTime.current = tempHour * 60 * 60 + tempMin * 60 + tempSec;
    // 시작버튼 눌렀을때 input에 설정한 값을 표시하기 위해
    setSec(padNumber(initialTime.current % 60, 2));
    setMin(padNumber(Math.floor((initialTime.current / 60) % 60), 2));
    setHour(padNumber(Math.floor(initialTime.current / 60 / 60), 2));
    interval.current = setInterval(() => {
      if (initialTime.current > 0) {
        // 매초마다 잔여시간 input 값 갱신
        initialTime.current -= 1;
        setSec(padNumber(initialTime.current % 60, 2));
        setMin(padNumber(Math.floor((initialTime.current / 60) % 60), 2));
        setHour(padNumber(Math.floor(initialTime.current / 60 / 60), 2));
      }
    }, 1000);
    return () => clearInterval(interval.current);
  }, [timerRunning]);

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);
      let wholeTime = 0;
      timer.map((e) => {
        wholeTime +=
          Number(e.hour || "0") +
          Number(e.minute || "0") +
          Number(e.second || "0");
      });

      if (wholeTime <= 0) {
        setTimerRunning(false);
      }
      if (timerRunning) {
        speak(currentTimerInfo.content, lang);
      }
    }
    if (!timerRunning) {
      clearInterval(interval.current);
    }
  }, [sec]);
  return (
    <div className="h-[50px] text-center ">
      {!timerRunning ? (
        <span className="mr-[10px] mb-[10px] inline-block">
          <input
            type="number"
            className={timerInputCSS}
            placeholder="H"
            value={currentTimerInfo.hour || ""}
            onChange={(e) => {
              setTimer(
                timer.map((t: ITimerProps) =>
                  t.id === id ? { ...t, hour: e.target.value } : t
                )
              );
            }}
          />
          <input
            type="number"
            className={timerInputCSS}
            placeholder="M"
            value={currentTimerInfo.minute || ""}
            onChange={(e) => {
              setTimer(
                timer.map((t: ITimerProps) =>
                  t.id === id ? { ...t, minute: e.target.value } : t
                )
              );
            }}
          />
          <input
            type="number"
            pattern="[0-9]+"
            className={timerInputCSS}
            placeholder="S"
            value={currentTimerInfo.second || ""}
            onChange={(e) => {
              setTimer(
                timer.map((t: ITimerProps) =>
                  t.id === id ? { ...t, second: e.target.value } : t
                )
              );
            }}
          />
        </span>
      ) : (
        <span className="mr-[10px] mb-[10px] inline-block">
          <span className={timerInputCSS}>{hour}</span>
          <span className={timerInputCSS}>{min}</span>
          <span className={timerInputCSS}>{sec}</span>
        </span>
      )}

      <input
        type="text"
        className={`w-full max-w-[300px] h-[50px] mr-[10px] border-2 border-gray-500 p-[10px] rounded-[3px] outline-blue-600 ${
          timerRunning ? "bg-gray-300" : ""
        }`}
        value={currentTimerInfo.content}
        readOnly={timerRunning}
        onChange={(e) => {
          setTimer(
            timer.map((t: ITimerProps) =>
              t.id === id ? { ...t, content: e.target.value } : t
            )
          );
        }}
      />
      <button
        disabled={timerRunning}
        className="dark:text-white"
        onClick={() => {
          setTimer(timer.filter((e: ITimerProps) => e.id !== id));
        }}
      >
        삭제
      </button>
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
