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
  const buttonCss =
    "border-2  h-[50px] min-w-[100px]  border-blue-700 rounded-[10px] inline-block absolute";

  return (
    <div className="mt-[50px]">
      <div className="mx-auto">
        <div className="mx-auto mb-[30px] w-full max-w-[580px]  relative h-[50px]">
          <button
            className={`${buttonCss} `}
            onClick={() => {
              setTimer([...timer, { id: nextId, content: "" }]);
            }}
          >
            타이머 추가
          </button>
          <button
            className={`${buttonCss} left-[120px]`}
            onClick={() => {
              if (timer.length <= 0) {
                alert("타이머를 추가해주세요.");
              } else {
                let checkContentEmpty = false;
                let checkTimerEmpty = false;
                let timeCheck = 0;
                timer.map((e) => {
                  if (!e.content) {
                    checkContentEmpty = true;
                  }
                  timeCheck =
                    Number(e.hour || "0") +
                    Number(e.minute || "0") +
                    Number(e.second || "0");
                  if (timeCheck <= 0 || !timeCheck) {
                    checkTimerEmpty = true;
                  }
                });
                if (checkContentEmpty || checkTimerEmpty) {
                  checkContentEmpty &&
                    alert("알림내용이 설정되지 않은 타이머가 존재합니다.");
                  checkTimerEmpty &&
                    alert("시간이 설정되지 않은 타이머가 존재합니다.");
                } else {
                  setTimerRunning(!timerRunning);
                }
              }
            }}
          >
            {timerRunning ? "중지" : "시작"}
          </button>
          <select
            className="w-[70px] absolute right-0 top-[12px]"
            id="select-lang"
            onChange={(e) => {
              setLang({ lang: e.target.value });
            }}
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
          </select>
        </div>

        {timer.map((e, i) => (
          <div className="timer-component mb-[10px] w-full h-[70px] " key={i}>
            <TimerComponent id={e.id}></TimerComponent>
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 500px) {
          .timer-component {
            height: 130px;
          }
        }
      `}</style>
    </div>
  );
}
