import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  timerState,
  timerRunningState,
  buildAlertLanguage,
} from "../recoil/states";
import TimerComponent from "./TimerComponent";

export default function BuildAlert() {
  const [timer, setTimer] = useRecoilState(timerState);
  const [timerRunning, setTimerRunning] = useRecoilState(timerRunningState);
  const [lang, setLang] = useRecoilState(buildAlertLanguage);
  const nextId: number = timer.length > 0 ? timer[timer.length - 1].id + 1 : 0;

  return (
    <div className="flex flex-col mt-[50px]">
      <div className=" self-center">
        <button
          onClick={() => {
            setTimer([...timer, { id: nextId, content: "" }]);
          }}
        >
          타이머 추가
        </button>
        {timer.map((e, i) => (
          <div className="mb-[10px]" key={i}>
            <TimerComponent id={e.id}></TimerComponent>
          </div>
        ))}
        <button
          onClick={() => {
            setTimerRunning(!timerRunning);
          }}
        >
          {timerRunning ? "중지" : "시작"}
        </button>
        <select
          id="select-lang"
          onChange={(e) => {
            setLang({ lang: e.target.value });
          }}
        >
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
        </select>
      </div>
    </div>
  );
}
