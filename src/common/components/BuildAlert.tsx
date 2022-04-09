import React, { useState } from "react";

interface OptionProp{
    rate?:number,
    pitch?:number,
    lang:string
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
  const [text, setText] = useState("");
  const [selectedLang, setLang] = useState("");
  console.log(selectedLang);
  return (
    <div>
      <input
        type="text"
        className="w-[300px] h-[50px] border-2 border-black p-[10px] rounded-[3px] outline-blue-600"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          speak(text, { lang: selectedLang });
        }}
      >
        시작
      </button>
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
