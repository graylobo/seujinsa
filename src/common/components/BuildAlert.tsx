import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { timerComponentCount } from "../recoil/states";
import TimerComponent from "./TimerComponent";
interface OptionProp {
  rate?: number;
  pitch?: number;
  lang: string;
}

function speak(text: string, opt_prop: OptionProp) {
  if (
    typeof SpeechSynthesisUtterance === "undefined" ||
    typeof window.speechSynthesis === "undefined"
  ) {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

  const prop = opt_prop || {};
  const speechMsg = new SpeechSynthesisUtterance();
  speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
  speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
  speechMsg.lang = prop.lang || "ko-KR";
  speechMsg.text = text;

  // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
  window.speechSynthesis.speak(speechMsg);
}
export default function BuildAlert() {
  const [selectedLang, setLang] = useState("");
  const [state, setState] = useRecoilState(timerComponentCount);
  const nextId: number = state.length > 0 ? state[state.length - 1].id + 1 : 0;

  return (
    <div>
      <button
        onClick={() => {
          setState([...state, { id: nextId, content: "" }]);
        }}
      >
        타이머 추가
      </button>
      {state.map((e) => (
        <TimerComponent id={e.id}></TimerComponent>
      ))}
      <button onClick={() => {}}>시작</button>
      <select
        id="select-lang"
        onChange={(e) => {
          setLang(e.target.value);
        }}
      >
        <option value="ko-KR">한국어</option>
        <option value="en-US">영어</option>
      </select>
    </div>
  );
}
